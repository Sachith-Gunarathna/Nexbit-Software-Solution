const admin = require('firebase-admin');
const nodemailer = require('nodemailer');

if (!admin.apps.length) {
    const privateKey = process.env.FIREBASE_PRIVATE_KEY
        ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
        : undefined;

    admin.initializeApp({
        credential: admin.credential.cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: privateKey,
        })
    });
}

const transporter = nodemailer.createTransport({
    host: 'smtp.resend.com',
    port: 465,
    secure: true,
    auth: {
        user: 'resend',
        pass: process.env.RESEND_API_KEY
    }
});

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    try {
        const resetLink = await admin.auth().generatePasswordResetLink(email);
        const userRecord = await admin.auth().getUserByEmail(email);
        const userName = userRecord.displayName || "User";

        const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Password</title>
</head>
<body style="background-color: #f4f5f7; margin: 0; padding: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;-webkit-font-smoothing: antialiased;">
  
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f5f7; padding: 20px 0;">
    <tr>
      <td align="center">
        
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.08); max-width: 600px; margin: 20px auto;">
          
          <tr>
            <td style="background-color: #ffffff; padding: 40px 35px 20px 35px; text-align: center;">
              <img src="https://i.ibb.co/93g64mDF/Echo-Grid.png" alt="Echo Grid" width="180" style="display: block; margin: 0 auto; height: auto; max-width: 100%;">
            </td>
          </tr>
          
          <tr>
            <td style="padding: 30px 40px; color: #333333;">
              <h2 style="margin-top: 0; font-size: 24px; color: #111111; font-weight: 700;">Hello ${userName},</h2>
              <p style="font-size: 16px; line-height: 1.6; color: #555555;">
                We received a request to reset the password for your <strong>EcoGrid</strong> account. No worries, it happens to the best of us!
              </p>
              <p style="font-size: 16px; line-height: 1.6; color: #555555; margin-bottom: 40px;">
                Please click the button below to set up a new password and get back to your limitless journey.
              </p>
              
              <div style="text-align: center;">
                <a href="${resetLink}" style="display: inline-block; background-color: #000000; color: #ffffff; text-decoration: none; padding: 18px 40px; font-size: 15px; font-weight: bold; border-radius: 8px; text-transform: uppercase; letter-spacing: 1.5px; box-shadow: 0 4px 6px rgba(0,0,0,0.2);">
                  Reset Password
                </a>
              </div>
              
              <p style="font-size: 13px; line-height: 1.6; color: #999999; margin-top: 45px; border-top: 1px solid #f0f0f0; padding-top: 25px; text-align: center;">
                If you didn't request a password reset, you can safely ignore this email. Your account is secure.
              </p>
            </td>
          </tr>
          
          <tr>
            <td style="background-color: #fdfdfd; padding: 35px; text-align: center; border-top: 1px solid #f0f0f0;">
              <p style="margin: 0; font-size: 14px; color: #444444; font-weight: bold; letter-spacing: 1px;">Stay Green 🌱</p>
              <p style="margin: 4px 0 0 0; font-size: 13px; color: #777777;">The EcoGrid Team</p>
              
              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px dashed #e0e0e0;">
                 <p style="margin: 0 0 10px 0; font-size: 10px; color: #bbbbbb; text-transform: uppercase; letter-spacing: 2px; font-weight: bold;">
                  Powered by
                </p>
                <img src="https://i.ibb.co/VpHWDjgX/Nexcentauri01.png" alt="Nexcentauri" width="140" style="display: block; margin: 0 auto; height: auto;">
              </div>
            </td>
          </tr>
          
        </table>
        
        <p style="font-size: 11px; color: #aaaaaa; text-align: center; margin-top: 20px;">
          &copy; 2026 Nexcentauri Software Solutions. All rights reserved.
        </p>
        
      </td>
    </tr>
  </table>
  
</body>
</html>
`;

        await transporter.sendMail({
            from: '"EcoGrid Team" <noreply@nexcentauri.com>',
            to: email,
            subject: 'Reset Your EcoGrid Password',
            html: htmlContent
        });

        res.status(200).json({ success: true, message: 'Custom email sent via Resend!' });

    } catch (error) {
        console.error('API Error:', error);
        res.status(500).json({ error: error.message });
    }
}