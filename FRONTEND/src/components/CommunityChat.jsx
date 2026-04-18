import React, { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import EmojiPicker from "emoji-picker-react";
import toast from "react-hot-toast";
import { FiEdit2 } from "react-icons/fi";
import { GrEmoji } from "react-icons/gr";
import { MdAttachFile } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { VscSend } from "react-icons/vsc";
import axiosInstance from "../Hellers/axiosinstance.js";
import { GetAllChat } from "../Redux/Slices/ChatSlices.js";

const SOCKET_URL =
  import.meta.env.VITE_SOCKET_URL ||
  (import.meta.env.VITE_API_BASE_URL
    ? import.meta.env.VITE_API_BASE_URL.replace(/\/api\/v1$/, "")
    : "http://localhost:5000");

const socket = io(SOCKET_URL, {
  path: "/socket.io",
  withCredentials: true,
  transports: ["websocket", "polling"],
});

const safeParse = (value) => {
  try {
    return JSON.parse(value);
  } catch {
    return {};
  }
};

const CommunityChat = () => {
  const [message, setMessage] = useState("");
  const [imageMessage, setImageMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [emojiPickerState, setEmojiPickerState] = useState(false);
  const [image, setImage] = useState("");
  const [editingChatId, setEditingChatId] = useState("");
  const [loading, setLoading] = useState(true);
  const userData = useSelector((state) => state?.auth?.data) || safeParse(localStorage.getItem("data"));
  const dispatch = useDispatch();
  const messagesEndRef = useRef(null);
  const currentUserName = userData?.fullName || "";

  const canEditMessage = useMemo(() => {
    return (chatItem) => chatItem?.senderName === currentUserName;
  }, [currentUserName]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const handleReceiveMessage = (data) => {
      if (data?.success === false || !data?.data) {
        return;
      }

      setChat((currentChat) => [...currentChat, data.data]);
    };

    socket.on("receive_message", handleReceiveMessage);

    return () => {
      socket.off("receive_message", handleReceiveMessage);
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [chat]);

  const loadChats = async () => {
    try {
      const response = await dispatch(GetAllChat());
      if (response?.payload?.success === false) {
        setChat([]);
        return;
      }

      setChat(response?.payload?.data || []);
    } catch (error) {
      console.error("Failed to get chat", error);
      setChat([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadChats();
  }, []);

  const getTimeLabel = (time) => {
    const parsed = new Date(time);
    return Number.isNaN(parsed.getTime()) ? "" : parsed.toLocaleTimeString();
  };

  const resetAttachment = () => {
    setImage("");
    setImageMessage("");
    setEmojiPickerState(false);
  };

  const handleImagePick = (event) => {
    const uploadedImage = event.target.files?.[0];
    if (!uploadedImage) {
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setImage(String(fileReader.result || ""));
    };
    fileReader.readAsDataURL(uploadedImage);
    setEmojiPickerState(false);
  };

  const sendMessage = () => {
    const trimmedMessage = message.trim();

    if (!trimmedMessage && !image) {
      return;
    }

    if (!currentUserName || !userData?._id) {
      toast.error("Please log in again to send messages.");
      return;
    }

    const time = new Date().toISOString();
    const chatMessage = {
      image,
      senderId: userData._id,
      senderName: currentUserName,
      message: trimmedMessage,
      time,
    };

    socket.emit("send_message", chatMessage);
    setEmojiPickerState(false);
    setMessage("");
    resetAttachment();
  };

  const sendImage = () => {
    if (!image && !imageMessage.trim()) {
      return;
    }

    if (!currentUserName || !userData?._id) {
      toast.error("Please log in again to send messages.");
      return;
    }

    const time = new Date().toISOString();
    socket.emit("send_message", {
      image,
      senderId: userData._id,
      senderName: currentUserName,
      message: imageMessage.trim(),
      time,
    });

    resetAttachment();
  };

  const startEditMessage = (chatItem) => {
    setEditingChatId(chatItem.id);
    setMessage(chatItem.message || "");
    setEmojiPickerState(false);
    setImage("");
    setImageMessage("");
  };

  const cancelEdit = () => {
    setEditingChatId("");
    setMessage("");
  };

  const saveEditedMessage = async () => {
    const trimmedMessage = message.trim();
    if (!editingChatId || !trimmedMessage) {
      return;
    }

    try {
      const request = axiosInstance.put("/chat", {
        chatId: editingChatId,
        message: trimmedMessage,
      });
      toast.promise(request, {
        loading: "Updating message...",
        success: "Message updated",
        error: (error) => error?.response?.data?.message || "Failed to update message",
      });
      const response = await request;
      const updatedChat = response?.data?.data;

      setChat((currentChat) =>
        currentChat.map((chatItem) => (chatItem.id === updatedChat.id ? updatedChat : chatItem)),
      );
      cancelEdit();
    } catch (error) {
      console.error(error);
    }
  };

  const removeChat = async (chatId) => {
    const shouldDelete = window.confirm("Delete this message?");
    if (!shouldDelete) {
      return;
    }

    try {
      const request = axiosInstance.delete("/chat", {
        data: { chatId },
      });
      toast.promise(request, {
        loading: "Deleting message...",
        success: "Message deleted",
        error: (error) => error?.response?.data?.message || "Failed to delete message",
      });
      await request;
      setChat((currentChat) => currentChat.filter((chatItem) => chatItem.id !== chatId));
      if (editingChatId === chatId) {
        cancelEdit();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex min-h-screen w-screen items-center justify-center bg-gradient-to-b from-black via-slate-950 to-slate-900 px-3 py-6">
      <div className="relative flex h-[90vh] w-full max-w-6xl flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-slate-400 shadow-[0_30px_80px_rgba(15,23,42,0.35)]">
        <div className="border-b border-white/20 px-6 py-4 text-center">
          <h1 className="text-2xl font-black text-white">Chat App</h1>
          <p className="mt-1 text-sm text-slate-100/80">
            Share text or images, and edit your own messages anytime.
          </p>
        </div>

        <div className="flex-1 overflow-hidden px-4 pb-4 pt-3 sm:px-6">
          <div className="h-full overflow-y-auto rounded-[1.5rem] border border-white/40 bg-slate-200/80 p-3 shadow-inner">
            {loading ? (
              <div className="flex h-full items-center justify-center text-slate-600">Loading messages...</div>
            ) : chat.length === 0 ? (
              <div className="flex h-full items-center justify-center">
                <div className="max-w-sm rounded-3xl border border-slate-300 bg-white/80 px-6 py-8 text-center text-slate-700 shadow-sm">
                  <p className="text-lg font-bold text-slate-900">No messages yet</p>
                  <p className="mt-2 text-sm leading-6">
                    Start the conversation with a message or image. Your edits and deletes will show here too.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {chat.map((msg) => {
                  const isMine = canEditMessage(msg);
                  return (
                    <div key={msg.id} className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`relative max-w-[82%] rounded-3xl px-4 py-3 shadow-sm ${
                          isMine ? "bg-teal-100 text-slate-900" : "bg-white text-slate-900"
                        }`}
                      >
                        <div className="mb-2 flex items-start justify-between gap-3">
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
                              {isMine ? "You" : msg.senderName}
                            </p>
                          </div>

                          {isMine && (
                            <div className="flex gap-2">
                              <button
                                type="button"
                                onClick={() => startEditMessage(msg)}
                                className="rounded-full bg-white/70 p-2 text-slate-700 transition hover:bg-teal-500 hover:text-white"
                                aria-label="Edit message"
                              >
                                <FiEdit2 />
                              </button>
                              <button
                                type="button"
                                onClick={() => removeChat(msg.id)}
                                className="rounded-full bg-white/70 p-2 text-slate-700 transition hover:bg-rose-500 hover:text-white"
                                aria-label="Delete message"
                              >
                                <RiDeleteBin6Line />
                              </button>
                            </div>
                          )}
                        </div>

                        {msg.image && (
                          <img
                            src={msg.image}
                            alt={msg.message || "shared attachment"}
                            className="mb-3 max-h-72 w-full rounded-2xl object-cover"
                          />
                        )}

                        {msg.message && <p className="whitespace-pre-wrap text-sm leading-6">{msg.message}</p>}

                        <p className="mt-2 text-right text-[11px] font-medium text-slate-500">
                          {getTimeLabel(msg.time)}
                        </p>
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>
        </div>

        <div className="border-t border-white/20 bg-slate-400 px-4 py-4 sm:px-6">
          {editingChatId && (
            <div className="mb-3 flex items-center justify-between rounded-2xl bg-white/80 px-4 py-3 text-slate-700">
              <div>
                <p className="text-sm font-bold text-slate-900">Editing message</p>
                <p className="text-xs">Update the text and save, or cancel to stop editing.</p>
              </div>
              <button
                type="button"
                onClick={cancelEdit}
                className="rounded-full bg-slate-900 px-3 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
              >
                Cancel edit
              </button>
            </div>
          )}

          <div className="flex items-center gap-3">
            <GrEmoji
              className="cursor-pointer text-3xl text-black transition hover:scale-110"
              onClick={() => setEmojiPickerState((current) => !current)}
            />
            <label className="cursor-pointer transition hover:scale-110" htmlFor="upload_image">
              <MdAttachFile className="rotate-45 text-2xl text-black" />
            </label>
            <input
              type="file"
              className="hidden"
              name="upload_image"
              id="upload_image"
              accept=".jpeg,.jpg,.png,.svg,.webp"
              onChange={handleImagePick}
            />
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={editingChatId ? "Edit your message" : "Type your message"}
              className="input w-full border border-slate-300 bg-white text-slate-900 outline-none"
            />
            <button
              onClick={editingChatId ? saveEditedMessage : sendMessage}
              className="btn border-transparent bg-green-600 px-6 text-white hover:bg-green-500"
            >
              <VscSend />
            </button>
          </div>

          <div className="relative">
            <EmojiPicker
              className="absolute bottom-3 left-0 z-50"
              onEmojiClick={(emojiObject) => {
                setMessage((current) => current + emojiObject.emoji);
              }}
              open={emojiPickerState && !image}
            />
          </div>

          {image && (
            <div className="absolute bottom-24 left-6 w-96 overflow-hidden rounded-3xl bg-slate-700 shadow-xl">
              <div className="flex items-center justify-between px-4 py-3 text-white">
                <p className="text-sm font-semibold">Image preview</p>
                <RiDeleteBin6Line className="cursor-pointer text-2xl" onClick={resetAttachment} />
              </div>
              <img src={image} className="h-56 w-full object-cover" alt="attachment preview" />
              <div className="flex gap-3 border-t border-white/10 px-4 py-4">
                <input
                  type="text"
                  value={imageMessage}
                  onChange={(e) => setImageMessage(e.target.value)}
                  placeholder="Add a caption"
                  className="input h-12 w-full border border-slate-300 bg-white text-slate-900"
                />
                <button
                  onClick={sendImage}
                  className="btn border-transparent bg-green-600 px-6 text-white hover:bg-green-500"
                >
                  <VscSend />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommunityChat;
