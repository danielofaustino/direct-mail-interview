import nodemailer from 'nodemailer';
import ejs from 'ejs';

const filePath = new URL('../views/index.ejs', import.meta.url).pathname;



const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'entrevistas.clinica.f.care@gmail.com',
    pass: 'jzwyrjqbmtxekgjv' // naturally, replace both with your real credentials or an application-specific password
  }
});



async function sendEmail(mailPayload, content) {
  ejs.renderFile(filePath, { name: content.name, sheetsUrl: content.sheetsUrl }, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      const mailOptions = {
        from: 'clinicafcare@proton.me',
        to: mailPayload.to,
        subject: 'Entrevista - Clínica F.Care',
        html: data
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("============>", filePath)
          console.log('Email sent: ' + info.response);
        }
      });
    }
  });
};


export { sendEmail }