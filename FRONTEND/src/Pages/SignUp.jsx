import { useState } from "react";
import Homelayout from "../Layouts/Homelayout.jsx";
import { BsPersonCircle } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { createAccount } from "../Redux/Slices/AuthSlices.js";
import gif2 from "../assets/Images/gif2.gif"; // Adjust the path as needed.

function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [image, setImage] = useState("");
  const signUpDataLocal = JSON.parse(localStorage.getItem("signUpData"));
  const [signUpData, setSignUpData] = useState({
    fullName: signUpDataLocal?.fullName || "",
    email: signUpDataLocal?.email || "",
    password: signUpDataLocal?.password || "",
    avatar: signUpDataLocal?.avatar || "",
  });
  

  function handelformdata(e) {
    const { name, value } = e.target;
    setSignUpData({
      ...signUpData,
      [name]: value,
    });
    let signUpDatalocal = { ...signUpData, [name]: value };
    localStorage.setItem('signUpData', JSON.stringify(signUpDatalocal));
  }

  function GetImage(e) {
    e.preventDefault();
    const uploadedImage = e.target.files[0];

    if (uploadedImage) {
      setSignUpData({
        ...signUpData,
        avatar: uploadedImage,
      });
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedImage);
      fileReader.addEventListener("load", function () {
        setImage(this.result);
      });
    }
  }

  async function createNewAccount(e) {
    e.preventDefault();
    if (!signUpData.fullName || !signUpData.email || !signUpData.password) {
      toast.error("Every field is required");
      return;
    }
    if (signUpData.fullName.length < 5) {
      toast.error("Name should be at least 5 characters");
      return;
    }
    
    if (!signUpData.password.match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)) {
      toast.error(
        "Password should be 6-16 characters and have at least 1 number and 1 special character"
      );
      return;
    }

    const formData = new FormData();
    formData.append("fullName", signUpData.fullName);
    formData.append("email", signUpData.email);
    formData.append("password", signUpData.password);
    if (signUpData.avatar) {
      formData.append("avatar", signUpData.avatar);
    }

    const response = await dispatch(createAccount(formData));

    if (response?.payload?.success) {
      navigate("/");
    }

    setSignUpData({
      fullName: "",
      email: "",
      password: "",
      avatar: "",
    });
    setImage("");
  }

  // Ensure the return is properly indented and inside the SignUp function.
  return (
    <Homelayout>
      <div className="flex min-h-[calc(100vh-3rem)] flex-col lg:flex-row items-stretch bg-gradient-to-r from-black via-gray-900 to-gray-900 overflow-x-hidden justify-evenly pl-0">
        <div className="flex w-full lg:w-1/3 items-center justify-center px-6 lg:ml-10 gap-8 py-10">
          {/* Signup Form */}
          <form
            noValidate
            //onSubmit={createNewAccount}
            className="flex bg-gray-800 border w-full max-w-[520px] items-center rounded-xl p-5 pt-10 gap-4 flex-col shadow-[0_0_10px_10px_teal]"
          >
            <h1 className="text-4xl font-semibold text-teal-500">
              Registration Page
            </h1>
            <label
              className="cursor-pointer hover:scale-125 transition duration-1000 ease-in-out mx-auto"
              htmlFor="uoload_image"
            >
              {image ? (
                <img
                  src={image}
                  className="h-24 w-24 border rounded-full"
                  alt="image"
                />
              ) : (
                <BsPersonCircle className="h-24 w-24 text-white" />
              )}
            </label>
            <input
              type="file"
              required
              className="hidden"
              name="uoload_image"
              id="uoload_image"
              accept=".jpeg,.jpg,.png,.svg"
              onChange={GetImage}
            />
            <div className="flex flex-col w-[80%] gap-2">
              <label htmlFor="fullName">Name :</label>
              <input
                type="text"
                id="fullName"
                required
                placeholder="Enter your name...."
                name="fullName"
                className="px-3 border rounded-md border-black text-black bg-slate-300"
                onChange={handelformdata}
                value={signUpData.fullName}
              />
            </div>
            <div className="flex flex-col w-[80%] gap-2">
              <label htmlFor="email">Email :</label>
              <input
                type="email"
                id="email"
                required
              placeholder="Enter your email...."
                name="email"
                className="px-3 border rounded-md border-black bg-slate-300"
                onChange={handelformdata}
                value={signUpData.email}
              />
            </div>
            <div className="flex flex-col w-[80%] gap-2">
              <label htmlFor="password">Password :</label>
              <input
                type="password"
                required
                placeholder="Enter your password....."
                name="password"
                className="px-3 border rounded-md border-black bg-slate-300"
                onChange={handelformdata}
                value={signUpData.password}
              />
            </div>
            <p className="w-[80%] text-sm text-teal-300 -mt-2">
              Avatar is optional. You can register without uploading one.
            </p>
            <button 
               type="button"
               className="relative bg-teal-400 p-10 pl-20 pr-20 mt-3 py-2 text-black font-bold text-lg rounded-md overflow-hidden group hover:bg-black hover:border-solid-white hover:text-white transition-transform duration-1000 ease-in-out"
                 onClick={createNewAccount}
               >
                {/* Horizontal Curtain */}
                <span className="absolute inset-0 bg-teal-300 opacity-80 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-1000 ease-in-out"></span>
                Sign-Up
            </button>
            <p>
              If already have an account?{" "}
              <Link
                className="text-teal-500 text-lg font-semibold"
                to={"/login"}
              >
                Login
              </Link>
            </p>
          </form>
        </div>
        <div className="hidden lg:block lg:w-2/3 pl-5 relative min-h-[calc(100vh-3rem)]">
          {/* GIF Section */}
          <div className="h-full w-full relative">
            <img
              src={gif2}
              alt="decorative gif"
              className="h-full w-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-teal-800 via-teal-900 to-black opacity-60"></div>
          </div>
        </div>
      </div>
    </Homelayout>
  );
}

export default SignUp;
