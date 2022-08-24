import 'dotenv/config'
import nodemailer from 'nodemailer';
import ejs from 'ejs';

const filePath = (mode) => new URL(`../views/${mode}.ejs`, import.meta.url).pathname;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_ADRESS,
    pass: process.env.MAIL_PASSWORD
  }
});



async function sendEmail(candidate, mode) {

  try {

    if (mode === 'interview') {
      ejs.renderFile(filePath(mode), { name: candidate.firstName, urlSheet: candidate.urlSheet }, (err, data) => {
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

              console.log(`Email ${mode} sent: ` + info.response);
            }
          });
        }
      });
    } else if (mode === 'passed' || mode === 'not-passed') {
      ejs.renderFile(filePath(mode), { name: candidate.firstName }, (err, data) => {
        if (err) {
          console.log(err);
        } else {
          const mailOptions = {
            from: process.env.MAIL_ADRESS,
            to: candidate.email,
            subject: 'Resposta Entrevista - Clínica F.Care',
            html: data
          };

          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error);
            } else {

              console.log(`Email ${mode} sent: ` + info.response);
            }
          });
        }
      });
    }


  } catch (error) {
    console.error(error.message)


  }

};


export { sendEmail }