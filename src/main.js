
import { authentication, duplicateSheet } from "./services/duplicateSheetsService.js";
import { getSpreadSheetData } from "./services/googleSheetsService.js";
import { normalizer } from './utils/normalizer.js'
import { sendEmail } from './services/nodemailerService.js'

const MODE = process.argv[2]

async function main(mode) {

  if (!mode) {
    console.log("mode is not defined, please revie")
  }

  // get users from google sheet
  const candidates = await getSpreadSheetData(mode)

  // normalizing from  [[],[]] to [{},{}]
  const candidatesNormalized = await normalizer(candidates)

  // auth on GoogleDrive Api
  await authentication()


  if (mode == 'interview') {

    // Copy and generate new Sheet
    // Give Permission to the user
    candidatesNormalized.map(async (candidate) => {

      candidate.urlSheet = await duplicateSheet(candidate)
      console.log("candidate ==>", candidate)

      // Send Email with html template
      await sendEmail(candidate, mode)
    })

  } else if (mode === 'passed' || 'not-passed') {
    // Copy and generate new Sheet
    // Give Permission to the user
    candidatesNormalized.map(async (candidate) => {

      console.log("candidate ==>", candidate)

      // Send Email with html template
      await sendEmail(candidate, mode)
    })


  }


}

main(MODE)





