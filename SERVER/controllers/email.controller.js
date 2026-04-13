import ApiError from "../utills/error.utills.js";
import sendMail from "../utills/sendMail.utills.js";
import generateSendOtpHTML from "../utills/sendOtpMessage.js";

const sendEmailController=async function(req,res,next){
  const {email,otp}=req.body;
  
  
  if (!email || !otp ) {
      return next(new ApiError(500,"email or otp is required"));
  }
  
  const messageHTML=generateSendOtpHTML(otp);
  const mailConfigured =
    process.env.GMAIL_USERNAME &&
    process.env.GMAIL_APP_PASSWORD;

  try {
      if (mailConfigured) {
        await sendMail({
            email:email,
            subject:"Verify Email",
            messageHTML
        });
      } else {
        throw new Error("Gmail credentials are not configured");
      }
  } catch (error) {
      return next(new ApiError(500,error?.message));
  }
  
  return res.status(201).json({
      success:true,
      message:"Email sended succesfully",
  });
}

export default sendEmailController;
