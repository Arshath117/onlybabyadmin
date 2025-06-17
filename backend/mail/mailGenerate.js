import nodemailer from "nodemailer";
import dotenv from "dotenv";


dotenv.config();


export const transporter = nodemailer.createTransport({
    service:"gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: 'onlybaby7999@gmail.com',
      pass: process.env.APP_PASSWORD,
    },
  });


  export const sendMail = async (transporter, mailOptions) => {
    try{
        console.log("Attempting to send email with options:", mailOptions); 
        const info = await transporter.sendMail(mailOptions);
        console.log("Email has been sent successfully. Info:", info);
        console.log("Email has been sent"); 
    } catch(error){
        console.error("Error sending email:", error);
    }
}

// sendMail(transporter,mailOptions);