import { useDispatch, useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"
import { GetUserProfile } from "../Redux/Slices/AuthSlices.js"
import { useEffect, useState } from "react"


// THIS COMPONENT IS REQUIRED US TO AUTHANTICATE THE USER IS ADMIN OR OTHER IF ADMIN THAN WE EXICUTE THE OUTLATE COMPONENT WHICH EXICUTE THE COMPONET WHICH IS PASSED BY US IN ROUTING 



function RequireAuth({allowedRoles}) {
  const {role,isLoggedIn}=useSelector( state => state.auth)
  const dispatch=useDispatch()
  const [checking, setChecking] = useState(true)

 useEffect(()=>{
  let active = true
  async function setData() {
     await dispatch(GetUserProfile())
     if (active) {
      setChecking(false)
     }
  }
  setData()
  return () => {
    active = false
  }
 },[dispatch])

 if (checking) {
  return null
 }

  return  isLoggedIn && allowedRoles.find((ele)=>ele==role) ?(
     <Outlet/>
  ):isLoggedIn ?( <Navigate to={"/dinied"}/> ):(<Navigate to={"/login"}/>)
}
export default RequireAuth
