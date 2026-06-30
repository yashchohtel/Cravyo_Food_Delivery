import nodemailer from "nodemailer"; // Import Nodemailer for sending emails
import dotenv from "dotenv";
dotenv.config();

// create a transporter instance for SMPT server
const transporter = nodemailer.createTransport({

    host: process.env.BREVO_SMTP_HOST, // SMPT server
    port: Number(process.env.BREVO_SMTP_PORT), // SMPT port
    secure: false, // true only for port 465 
    auth: {
        user: process.env.BREVO_SMTP_LOGIN, // SMPT login 
        pass: process.env.BREVO_SMTP_PASSWORD, // SMPT password
    },

});

// 👇 Yaha lagao
console.log("send email file ↓");
console.log(process.env.BREVO_SMTP_HOST);
console.log(process.env.BREVO_SMTP_PORT);
console.log(process.env.BREVO_SMTP_LOGIN);
console.log(transporter.options);
console.log("send email file ↑");


// send mail utility function to send email to the user
const sendEmail = async ({ to, subject, text, html }) => {

    // send mail
    await transporter.sendMail({

        from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.EMAIL_FROM_ADDRESS}>`,
        to,
        subject,
        text,
        html,

    })

};

export default sendEmail;