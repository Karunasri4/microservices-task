import dotenv from "dotenv";
import nodemailer from "nodemailer";
dotenv.config();

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    auth: { 
        user: process.env.SMTP_USER, 
        pass: process.env.SMTP_PASS 
    },
});

export const sendWelcomeEmail = async (to: string, name: string) => {

  const info = await transporter.sendMail({
    from: process.env.MAIL_FROM,
    to,
    subject: "Welcome to Todo App",
    html: `
      <h2>Hi ${name},</h2>
      <p>Your account has been created successfully. Welcome aboard!</p>
    `,
  });
  console.log("Preview URL:", nodemailer.getTestMessageUrl(info));
};
