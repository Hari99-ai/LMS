import toast from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import Homelayout from "../../Layouts/Homelayout.jsx"
import { useState } from "react"
import { BsPersonCircle } from "react-icons/bs"
import { AiOutlineArrowLeft } from "react-icons/ai";
import { GetUserProfile, updateProfile } from "../../Redux/Slices/AuthSlices.js"



function EditProfile() {

  const dispatch=useDispatch()
  const navigate=useNavigate()
  
  const [data, setData] = useState({
      previewImage:"",
      fullName:"",
      avatar:undefined,
  })
  

 function handelImage(e) {
   e.preventDefault()
   const uploadImage=e.target.files[0]

   if (uploadImage) {
      const filerider=new FileReader()
      filerider.readAsDataURL(uploadImage)
      filerider.addEventListener("load",function(){
           setData({
              ...data,
              previewImage:this.result,
              avatar:uploadImage
           })
      })
   }
  
 }

 function handleFormData(e) {
    const{name,value}=e.target
    setData({
       ...data,
       [name]:value
    })
 }

 async function onFormSubmit(e) {
    e.preventDefault()
   if (  !data.fullName ) {
      toast.error("Every field is required")
      return
   }
   if (data.fullName.length<5) {
      toast.error("fullName must be atlist 5 charactors")
      return
   }
  await dispatch(updateProfile(data))
  await dispatch(GetUserProfile())
  navigate("/user/profile")
}

  return (
    <Homelayout>
      <div className="min-h-[calc(100vh-3rem)] px-4 py-16 sm:py-20 bg-[radial-gradient(circle_at_top,_rgba(45,212,191,0.16),_transparent_35%),linear-gradient(180deg,_#f8fafc_0%,_#eef7f6_100%)]">
        <div className="mx-auto max-w-2xl">
          <form
            onSubmit={onFormSubmit}
            className="overflow-hidden rounded-3xl border border-teal-200/70 bg-white shadow-[0_20px_60px_rgba(13,148,136,0.18)]"
          >
            <div className="bg-gradient-to-r from-teal-400 to-cyan-300 px-8 py-8 text-slate-900">
              <h1 className="text-3xl font-extrabold">Edit Profile</h1>
              <p className="mt-2 text-sm font-medium text-slate-700">
                Update your public name and avatar.
              </p>
            </div>

            <div className="flex flex-col items-center gap-6 px-8 py-10">
              <label className="cursor-pointer" htmlFor="upload_image">
                {data.previewImage ? (
                  <img
                    className="h-28 w-28 rounded-full border-4 border-teal-200 object-cover shadow-md transition hover:scale-105"
                    src={data.previewImage}
                    alt="preview"
                  />
                ) : (
                  <BsPersonCircle className="h-28 w-28 rounded-full text-teal-400 transition hover:scale-105" />
                )}
              </label>
              <input
                type="file"
                className="hidden"
                id="upload_image"
                onChange={handelImage}
                name="upload_image"
                accept=".jpg,.svg,.png,.jpeg"
              />

              <div className="w-full">
                <label htmlFor="fullName" className="mb-2 block text-sm font-semibold text-slate-700">
                  Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-teal-400 focus:ring-2 focus:ring-teal-100"
                  placeholder="Enter your name...."
                  required
                  onChange={handleFormData}
                  value={data.fullName}
                  name="fullName"
                />
              </div>

              <div className="flex w-full flex-col gap-3 sm:flex-row">
                <button className="flex-1 rounded-full bg-teal-500 px-4 py-3 font-semibold text-white transition hover:bg-teal-600">
                  Submit
                </button>
                <Link className="flex-1" to={"/user/profile"}>
                  <p className="flex h-full items-center justify-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-3 font-semibold text-slate-700 transition hover:border-teal-300 hover:bg-teal-50">
                    <AiOutlineArrowLeft /> Go back to profile
                  </p>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Homelayout>
  )

}
export default EditProfile
