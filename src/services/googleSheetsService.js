import 'dotenv/config'
import { google } from 'googleapis'


const credentialPath = new URL('../keys/sheetCredential.json', import.meta.url).pathname;


async function getAuthSheets() {

  const auth = new google.auth.GoogleAuth({
    keyFile: credentialPath,
    scopes: 'https://www.googleapis.com/auth/spreadsheets'
  })
  const client = await auth.getClient();

  const googleSheets = google.sheets({
    version: "v4",
    auth: client
  })

  const spreadsheetId = process.env.SPREAD_SHEET_ID;

  return {
    auth,
    client,
    googleSheets,
    spreadsheetId
  }
}


async function getSpreadSheetData(mode) {

  try {
    const { googleSheets, auth, spreadsheetId } = await getAuthSheets();

    const candidates = await googleSheets.spreadsheets.values.get({
      auth,
      spreadsheetId,
      range: mode
    });

    return candidates.data.values
  } catch (error) {
    console.error(error.message)
  }



}



export { getAuthSheets, getSpreadSheetData }