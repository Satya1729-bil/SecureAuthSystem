const nodemailer = require('nodemailer');

const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT) || 587,
    secure: process.env.EMAIL_PORT === '465',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

/**
 * Send password reset email
 */
const sendPasswordResetEmail = async ({ email, name, resetURL }) => {
  const transporter = createTransporter();

  const mailOptions = {
    from: `"Auth System" <${process.env.EMAIL_FROM}>`,
    to: email,
    subject: 'Password Reset Request (valid for 10 minutes)',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Password Reset Request</h2>
        <p>Hi ${name},</p>
        <p>You requested to reset your password. Click the button below to set a new password:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetURL}" 
             style="background-color: #4CAF50; color: white; padding: 14px 28px; 
                    text-decoration: none; border-radius: 4px; font-size: 16px;">
            Reset Password
          </a>
        </div>
        <p style="color: #666; font-size: 14px;">
          This link expires in <strong>10 minutes</strong>.
        </p>
        <p style="color: #666; font-size: 14px;">
          If you didn't request a password reset, please ignore this email and your password will remain unchanged.
        </p>
        <hr style="border: 1px solid #eee; margin: 20px 0;">
        <p style="color: #999; font-size: 12px;">
          For security, never share this link with anyone.
        </p>
      </div>
    `
  };

  await transporter.sendMail(mailOptions);
};

/**
 * Send email verification email
 */
const sendVerificationEmail = async ({ email, name, verifyURL }) => {
  const transporter = createTransporter();

  const mailOptions = {
    from: `"Auth System" <${process.env.EMAIL_FROM}>`,
    to: email,
    subject: 'Verify Your Email Address',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Verify Your Email</h2>
        <p>Hi ${name},</p>
        <p>Thanks for registering! Please verify your email address:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${verifyURL}" 
             style="background-color: #2196F3; color: white; padding: 14px 28px; 
                    text-decoration: none; border-radius: 4px; font-size: 16px;">
            Verify Email
          </a>
        </div>
        <p style="color: #666; font-size: 14px;">
          This link expires in <strong>24 hours</strong>.
        </p>
      </div>
    `
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendPasswordResetEmail, sendVerificationEmail };
