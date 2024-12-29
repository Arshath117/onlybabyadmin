import Handlebars from 'handlebars';
import { baseStyles } from './styles.js';


export const emailTemplate = {
    verifyEmail: Handlebars.compile(`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>${baseStyles}</style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <img src="cid:logo" alt="Toy Store Logo" class="logo" />
            <h1>🧸 Toy Store - Email Verification</h1>
          </div>
          <div class="content">
            <h2>Hello {{name}}!</h2>
            <div class="highlight">
              <p>Welcome to Toy Store! Please use the following OTP to verify your email address:</p>
            </div>
            <div class="otp">{{otp}}</div>
            <p>This OTP will expire in 10 minutes.</p>
            <div class="divider"></div>
            <p>If you didn't request this verification, please ignore this email.</p>
          </div>
          <div class="footer">
            <div class="social-links">
              <a href="#">Facebook</a> • <a href="#">Twitter</a> • <a href="#">Instagram</a>
            </div>
            <p>© 2023 Toy Store. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `),
}  