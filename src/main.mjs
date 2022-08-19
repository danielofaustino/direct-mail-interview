import { authentication, duplicateSheet } from "./services/duplicateSheetsService.mjs";
import { getSpreadSheetData } from "./services/googleSheetsService.mjs";
import { normalizer } from './utils/normalizer.mjs'
import { sendEmail } from './services/nodemailerService.mjs'


async function main() {

  // get users from google sheet
  const candidates = await getSpreadSheetData()

  //const candidatesNormalized = await normalizer(candidates)
  const candidatesNormalized = [{
    completeName: 'Daniel Faustino',
    email: 'danielofaustino@proton.me',
    firstName: 'Daniel',
    urlSheet: ''
  },]

  // auth on GoogleDrive Api
  await authentication()

  // Copy and generate new Sheet
  // Give Permission to the user
  candidatesNormalized.map(async (candidate) => {

    candidate.urlSheet = await duplicateSheet(candidate)
    console.log("candidate ==>", candidate)

    // Send Email with html template
    await sendEmail(candidate)
  })


}

main()




