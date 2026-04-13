import {config} from "dotenv"
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import cloudinary from "cloudinary"
import Razorpay from "razorpay";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

config({ path: resolve(__dirname, ".env") });

const razorpayKeyId = process.env.RAZORPAY_KEY_ID ?? process.env.RAYZORPAY_KEY_ID;
const razorpaySecret = process.env.RAZORPAY_SECRET ?? process.env.RAYZORPAY_SECRET;

export const razorpay = razorpayKeyId && razorpaySecret
  ? new Razorpay({
      key_id: razorpayKeyId,
      key_secret: razorpaySecret,
    })
  : null;

if (!razorpay) {
  console.warn(
    "Razorpay is not configured. Payment routes will be unavailable until RAZORPAY_KEY_ID and RAZORPAY_SECRET are set."
  );
}


cloudinary.v2.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key:process.env.CLOUDINARY_API_KEY,
      api_secret:process.env.CLOUDINARY_API_SECRET
})
