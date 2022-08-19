import { google } from 'googleapis'


const credentialPath = new URL('../data/direct-mail-interview-dce212d9445c.json', import.meta.url).pathname;


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

  const spreadsheetId = '1fhdnMi6WhuCMcGvn3VIEqrwQFMc0z9sS1oRIhJ44Whc';

  return {
    auth,
    client,
    googleSheets,
    spreadsheetId
  }
}


async function getSpreadSheetData() {

  const { googleSheets, auth, spreadsheetId } = await getAuthSheets();

  const candidates = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: 'candidates'
  });

  return candidates.data.values

}



export { getAuthSheets, getSpreadSheetData }