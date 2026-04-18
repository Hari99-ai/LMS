
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Hellers/axiosinstance.js"
import toast from "react-hot-toast";

const parseStoredData = () => {
  try {
    const stored = localStorage.getItem("data");
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
};

const persistAuth = (user) => {
  localStorage.setItem("isLoggedIn", "true");
  localStorage.setItem("role", user?.role || "");
  localStorage.setItem("data", JSON.stringify(user || {}));
};

const clearAuth = () => {
  localStorage.setItem("isLoggedIn", "false");
  localStorage.setItem("role", "");
  localStorage.removeItem("data");
};

const getErrorMessage = (error) =>
  error?.response?.data?.message || error?.message || "Request failed";

const getErrorPayload = (error) => ({
  success: false,
  message: getErrorMessage(error),
  status: error?.response?.status || 500,
});

const initialState={
  isLoggedIn: localStorage.getItem("isLoggedIn") === "true",
  role: localStorage.getItem("role") || "",
  data: parseStoredData(),
}

export const createAccount=createAsyncThunk("/auth/sigup", async (data, { rejectWithValue })=>{
   try {
       const res= axiosInstance.post("/user/register",data);
       toast.promise(res,{
         loading:"wait! creating your account",
         success:((data)=>{
             return data?.data?.message;
         }),
         error:((error)=>getErrorMessage(error))
       });
       return (await res).data;

   } catch (error) {
      return rejectWithValue(getErrorPayload(error));
   }
})
export const Loginmethod=createAsyncThunk("/auth/login", async (data, { rejectWithValue })=>{
       
   try {
       const res=axiosInstance.post("/user/login",data);
       toast.promise(res,{
         loading:"wait! login in process",
         success:((data)=>{
             return data?.data?.message;
         }),
         error:((error)=>getErrorMessage(error))
       });
       return (await res).data;
   } catch (error) {
      return rejectWithValue(getErrorPayload(error));
   }
})
export const logoutmethod=createAsyncThunk("auth/logout",async(_, { rejectWithValue })=>{

     try {
       const res= axiosInstance.get("/user/logout")
       toast.promise(res,{
          loading:"wait! logout in process",
          success:((d)=>{
            return d?.data?.message;
          }),
          error:((error)=>getErrorMessage(error))
       }
       )
       return (await res).data;
     } catch (error) {
        return rejectWithValue(getErrorPayload(error));
     }
})
export const GetUserProfile=createAsyncThunk("get/user/profile",async (_, { rejectWithValue })=>{
  
  try {
    const response=axiosInstance.get("/user/profile",{
      withCredentials:true,
      headers:{"Content-Type":"application/json"}
    })
    console.log(response);
    return (await response).data
  } catch (error) {
     console.log(error.message)
     return rejectWithValue(getErrorPayload(error));
  }
  
})
export const updateProfile=createAsyncThunk("user/updateProfile" ,async (data, { rejectWithValue })=>{
     try {
      const formData=new FormData()
      formData.append("fullName",data.fullName)
      if (data.avatar) {
        formData.append("avatar",data.avatar)
      }

        const response =axiosInstance.put("/user/update/profile",formData)
        
        toast.promise(response,{
         loading:"wait! profile update in process",
         success:((d)=>{
           return d?.data?.message;
         }),
         error:((error)=>getErrorMessage(error))
      }
      )
      return (await response).data
     } catch (error) {
         return rejectWithValue(getErrorPayload(error));
     } 
})
const authSlice=createSlice({
  name:"authSlice",
  initialState,
  reducers:{},
  extraReducers:(builder)=>{

    builder.addCase(GetUserProfile.fulfilled,(state,action)=>{
      persistAuth(action?.payload?.data)
      state.data=action?.payload?.data
      state.role=action?.payload?.data?.role
      state.isLoggedIn=true;
    })

    builder.addCase(GetUserProfile.rejected,(state,action)=>{
      const status = action?.payload?.status || action?.error?.status;
      if (status === 401 || status === 403 || status === 404) {
        clearAuth();
        state.data={};
        state.role="";
        state.isLoggedIn=false;
      }
    })
   
    builder.addCase(createAccount.fulfilled,(state,action)=>{
        persistAuth(action?.payload?.data)
        state.data=action?.payload?.data
        state.role=action?.payload?.data?.role
        state.isLoggedIn=true;
    })
    builder.addCase(Loginmethod.fulfilled,(state,action)=>{
        persistAuth(action?.payload?.data)
        state.data=action?.payload?.data
        state.role=action?.payload?.data?.role
        state.isLoggedIn=true;
    })

    builder.addCase(logoutmethod.fulfilled,(state,action)=>{
        clearAuth();
        state.data={}
        state.role=""
        state.isLoggedIn=false;
      })
  }
})

export const {} = authSlice.actions
export default authSlice.reducer
