import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'entrevistas.clinica.f.care@gmail.com',
    pass: 'jzwyrjqbmtxekgjv' // naturally, replace both with your real credentials or an application-specific password
  }
});

const mailOptions = {
  from: 'entrevistas.clinica.f.care@gmail.com',
  to: 'danieloliveirafaustino@gmail.com',
  subject: 'Teste NodeMailer',
  text: 'Dudes, we really need your money.'
};

transporter.sendMail(mailOptions, function (error, info) {
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
