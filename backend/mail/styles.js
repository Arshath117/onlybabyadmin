export const baseStyles = `
  body { 
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    line-height: 1.6;
    color: #2d3748;
    margin: 0;
    padding: 0;
    background-color: #f7fafc;
  }
  .container { 
    max-width: 600px;
    margin: 0 auto;
    padding: 24px;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  .header { 
    text-align: center;
    padding: 24px;
    background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
    color: white;
    border-radius: 8px 8px 0 0;
    margin: -24px -24px 24px -24px;
  }
  .header h1 {
    margin: 0;
    font-size: 24px;
    font-weight: 600;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  }
  .content { 
    padding: 24px;
    background-color: #ffffff;
    border-radius: 4px;
    line-height: 1.8;
  }
  .content h2 {
    color: #2d3748;
    font-size: 20px;
    margin-bottom: 16px;
    font-weight: 600;
  }
  .content p {
    color: #4a5568;
    margin-bottom: 16px;
  }
  .footer { 
    text-align: center;
    padding: 24px;
    font-size: 14px;
    color: #718096;
    border-top: 1px solid #e2e8f0;
    margin-top: 24px;
  }
  .button {
    display: inline-block;
    padding: 12px 32px;
    background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
    color: white;
    text-decoration: none;
    border-radius: 6px;
    font-weight: 600;
    margin: 24px 0;
    text-align: center;
    transition: all 0.2s ease;
    box-shadow: 0 2px 4px rgba(76, 175, 80, 0.2);
  }
  .button:hover {
    background: linear-gradient(135deg, #45a049 0%, #409444 100%);
    box-shadow: 0 4px 6px rgba(76, 175, 80, 0.3);
    transform: translateY(-1px);
  }
  .otp {
    font-size: 32px;
    font-weight: 700;
    letter-spacing: 4px;
    color: #4CAF50;
    padding: 16px;
    background-color: #f0fff4;
    border: 2px dashed #9ae6b4;
    border-radius: 8px;
    margin: 24px auto;
    max-width: 240px;
    text-align: center;
    font-family: 'Courier New', monospace;
  }
  .highlight {
    background-color: #f0fff4;
    border-left: 4px solid #4CAF50;
    padding: 16px;
    margin: 24px 0;
    border-radius: 0 8px 8px 0;
  }
  .divider {
    height: 1px;
    background: linear-gradient(to right, transparent, #e2e8f0, transparent);
    margin: 24px 0;
  }
  .social-links {
    text-align: center;
    margin-top: 24px;
  }
  .social-links a {
    color: #718096;
    text-decoration: none;
    margin: 0 8px;
  }
  .social-links a:hover {
    color: #4CAF50;
  }
  .logo {
    width: 64px;
    height: 64px;
    margin: 0 auto 16px auto;
    display: block;
  }
  @media (max-width: 600px) {
    .container {
      padding: 16px;
    }
    .header {
      margin: -16px -16px 16px -16px;
      padding: 16px;
    }
    .content {
      padding: 16px;
    }
    .otp {
      font-size: 24px;
      letter-spacing: 3px;
      padding: 12px;
    }
  }
`;