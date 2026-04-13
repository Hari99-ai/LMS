import nodemailer from "nodemailer";

const sendMail = async function ({email, subject, messageHTML}) {
    
  try {
    const gmailUser = process.env.GMAIL_USERNAME;
    const gmailPass = process.env.GMAIL_APP_PASSWORD;
    const fromMail = process.env.SMTP_FROM_MAIL || gmailUser;
    const smtpHost = process.env.GMAIL_HOST_NAME || "gmail";
    const smtpPort = Number(process.env.GMAIL_PORT || 465);

    // Create the transporter
    const auth = nodemailer.createTransport({
      service: smtpHost,
      secure: smtpPort === 465,
      port: smtpPort,
      auth: {
        user: gmailUser,
        pass: gmailPass,
      },
    });

    // Email details
    const receiver = {
      from: fromMail,
      to: email,
      subject: subject,
      html: messageHTML, // Use the HTML content here
    };

    // Send the email
    const emailResponse = await auth.sendMail(receiver);
    console.log("Email sent successfully:", emailResponse.messageId);
  } catch (error) {
    console.error("Error sending email:", error.message);
    throw error;
  }
};

export default sendMail;
