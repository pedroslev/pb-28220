import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()

//INGRESAR SU MAIL PARA PROBAR.
const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: process.env.MAIL,
        pass: process.env.MAILPWD
    }
 });

 let sendMail = async (user, subject, text) => {
    await transporter.sendMail({
        from: `no-reply@pb28820`,
        to: user,
        subject: subject,
        text: text
    })
 }

 export {
    sendMail,
 }