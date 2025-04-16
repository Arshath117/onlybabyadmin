import { emailTemplate } from "./emailTemplate.js";
import { sendMail, transporter } from "./mailGenerate.js";

export const sendVerificationEmail = async (email, name, otp) => {
    try {
      const mailOptions = {
        from: { 
          name: 'Only Baby',
          address: process.env.USER,
        },
        to: email,
        subject: 'Verify your email address',
        html: `<p>Hello ${name},</p><p>Your OTP is <strong>${otp}</strong>.</p><p>Please use this OTP to verify your account.</p>`,
      };
  
      await sendMail(transporter, mailOptions);
      console.log('Verification email sent successfully');
    } catch (error) {
      console.log('Error sending verification email:', error.message);
      throw new Error(error.message);
    }
  };
  
