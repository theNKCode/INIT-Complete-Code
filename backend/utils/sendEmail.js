import nodeMailer from "nodemailer";

// export const sendEmail = async ({ email, subject, message }) => {
//   const transporter = nodeMailer.createTransport({
//     host: process.env.SMTP_HOST,
//     service: process.env.SMTP_SERVICE,
//     port: process.env.SMTP_PORT,
//     auth: {
//       user: process.env.SMTP_MAIL,
//       pass: process.env.SMTP_PASSWORD,
//     },
//   });

//   const options = {
//     // from: process.env.SMTP_MAIL,
//     from:`${process.env.SMTP_MAIL}`,
//     to: email,
//     subject: subject,
//     text: message,
//   };

//   await transporter.sendMail(options);
// };

export const sendEmail = async (email, subject, message) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USERNAME,
      to: email,
      subject,
      text: message,
    });
  } catch (error) {
    console.error(error);
  }
};