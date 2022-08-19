import 'dotenv/config'
import express from 'express'
import { candidates } from './data/index.mjs'
import { sendEmail } from './services/nodemailerService.mjs';
import { getSpreadSheetData } from './services/googleSheetsService.mjs';


const app = express();


app.post("/mail", (req, res) => {
  console.log("Sending Mail")
  try {
    candidates.map(async (candidate) => {
      await sendEmail({ to: candidate.mail }, { name: candidate.name, sheetsUrl: candidate.sheetsUrl })
      console.log(`Mail sended to ${candidate.name}`)
    })
    res.json({ "msg": "Mails Sended" })

  } catch (error) {
    console.error(error)
    res.status(500).json("Server Error")

  }
});


app.get('/spreadsheet', async (req, res) => {
  try {
    const candidates = await getSpreadSheetData()
    res.send(candidates)
  } catch (error) {
    console.error(error.message)
  }


})


app.listen(5005, () => {
  console.log(`Server Running on port 5005`);
})
