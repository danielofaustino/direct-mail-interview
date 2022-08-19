import 'dotenv/config'
import nodemailer from 'nodemailer';
import ejs from 'ejs';

const filePath = new URL('../views/index.ejs', import.meta.url).pathname;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_ADRESS,
    pass: process.env.MAIL_PASSWORD 
  }
});



async function sendEmail(candidate) {

  try {

    ejs.renderFile(filePath, { name: candidate.firstName, urlSheet: candidate.urlSheet }, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        const mailOptions = {
          from: process.env.MAIL_ADRESS,
          to: candidate.email,
          subject: 'Entrevista - Clínica F.Care',
          html: data
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

  } catch (error) {
    console.error(error.message)

    
  }

};


export { sendEmail }