import express from 'express'
import candidates from './data/index.js'
import { sendEmail } from './services/nodemailerService.mjs';
sendEmail

const app = express();


app.post("/mail", (req, res) => {
  console.log("Sending Mail")
  candidates.map((candidate) => {
    sendEmail({ to: candidate.mail }, { name: candidate.name, sheetsUrl: candidate.sheetsUrl })
    console.log(`Mail sended to ${candidate.name}`)
  })
  res.json({ "msg": "Mails Sended" })
});


app.listen(5005, () => {
  console.log(`Server Running on port 5005`);
})
