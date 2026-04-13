import { SqlDocument } from "./sql.utils.js";

class Chat extends SqlDocument {
  static get tableName() {
    return "chats";
  }

  static get columns() {
    return ["id", "senderName", "senderId", "message", "time", "image"];
  }

  static fromRow(row) {
    if (!row) {
      return null;
    }

    return new this({
      id: row.id,
      _id: row.id,
      senderName: row.senderName,
      senderId: row.senderId,
      message: row.message,
      time: row.time,
      image: row.image,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    });
  }

  static toRow(doc, existingRow = null) {
    const existing = existingRow || {};
    return {
      id: doc.id,
      senderName: doc.senderName ?? existing.senderName ?? "",
      senderId: doc.senderId ?? existing.senderId ?? null,
      message: doc.message ?? existing.message ?? "",
      time: doc.time ?? existing.time ?? "",
      image: doc.image ?? existing.image ?? "",
    };
  }
}

export default Chat;
