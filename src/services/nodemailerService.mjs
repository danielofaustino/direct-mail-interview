import nodemailer from 'nodemailer';
import ejs from 'ejs';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'entrevistas.clinica.f.care@gmail.com',
    pass: 'jzwyrjqbmtxekgjv' // naturally, replace both with your real credentials or an application-specific password
  }
});



const sendEmail = (mailPayload, { name, sheetsUrl }) => {
  ejs.renderFile(__dirname + '../views/index.ejs', { name, sheetsUrl }, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      const mailOptions = {
        from: 'clinicafcare@proton.me',
        to: mailPayload.to,
        subject: 'Entrevista - Clínica F.Care',
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
    }
  });
};


export { sendEmail }