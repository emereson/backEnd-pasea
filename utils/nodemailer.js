import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.HOSTEMAIL,
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

export { transporter };
