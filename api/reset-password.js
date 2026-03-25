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

        const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Reset Password</title>
</head>
<body style="background-color: #f4f5f7; margin: 0; padding: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
  
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f5f7; padding: 40px 0;">
    <tr>
      <td align="center">
        
        <table width="100%" max-width="600px" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.05); max-width: 600px; margin: 0 auto;">
          
          <tr>
            <td style="background-color: #000000; padding: 35px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 28px; letter-spacing: 2px;">ECOGRID</h1>
            </td>
          </tr>
          
          <tr>
            <td style="padding: 40px 35px; color: #333333;">
              <h2 style="margin-top: 0; font-size: 22px; color: #111111;">Hello,</h2>
              <p style="font-size: 16px; line-height: 1.6; color: #555555;">
                We received a request to reset the password for your <strong>EcoGrid</strong> account. No worries, it happens to the best of us!
              </p>
              <p style="font-size: 16px; line-height: 1.6; color: #555555; margin-bottom: 35px;">
                Please click the button below to set up a new password and get back to your limitless journey.
              </p>
              
              <div style="text-align: center;">
                <a href="${resetLink}" style="display: inline-block; background-color: #000000; color: #ffffff; text-decoration: none; padding: 16px 36px; font-size: 16px; font-weight: bold; border-radius: 6px; text-transform: uppercase; letter-spacing: 1px;">
                  Reset Password
                </a>
              </div>
              
              <p style="font-size: 14px; line-height: 1.6; color: #888888; margin-top: 35px; border-top: 1px solid #eeeeee; padding-top: 20px;">
                If you didn't request a password reset, you can safely ignore this email. Your account is secure.
              </p>
            </td>
          </tr>
          
          <tr>
            <td style="background-color: #f9fafb; padding: 25px 35px; text-align: center; border-top: 1px solid #eeeeee;">
              <p style="margin: 0; font-size: 15px; color: #444444; font-weight: bold;">Stay Green 🌱</p>
              <p style="margin: 5px 0 0 0; font-size: 14px; color: #666666;">The EcoGrid Team</p>
              
              <p style="margin: 20px 0 0 0; font-size: 12px; color: #aaaaaa; text-transform: uppercase; letter-spacing: 1px;">
                Powered by <strong style="color: #888888;">Nexcentauri</strong>
              </p>
            </td>
          </tr>
          
        </table>
        
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