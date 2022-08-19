import { google } from 'googleapis';
import { authenticate } from '@google-cloud/local-auth'

const drive = google.drive('v3')
var credentials = new URL('../data/driveCredential.json', import.meta.url).pathname;
var scopes = [
  "https://www.googleapis.com/auth/drive",
  "https://www.googleapis.com/auth/drive.file",
  "https://www.googleapis.com/auth/drive.appdata",
  "https://www.googleapis.com/auth/drive.photos.readonly"
]

var auth

async function authentication() {
  auth = await authenticate({ keyfilePath: credentials, scopes: scopes })

  // console.log("AUTH ==>", auth.credentials)

  google.options({ auth });
}

async function duplicateSheet(candidate) {

  let urlSheet

  await drive.files.copy({
    fileId: "1XAYqW1nOPdklr54bGHfa34El9_PvQkP-Behin6iycAI",
    requestBody: {
      "name": candidate.completeName,
    },

  }).then(async (sheet) => {

    await drive.permissions.create({
      //emailMessage: 'Teste Técnico- Clínica F.Care, abra o proximo email para ter mais informações.',
      fileId: sheet.data.id,
      //sendNotificationEmail: true,
      // Request body metadata
      requestBody: {
        //"emailAddress": candidate.email,
        "role": "writer",
        "type": "anyone",
      }

    }).then((permission) => {
      console.log("SHEET CREATED -", permission.data)

    })

    urlSheet = sheet.data.id

  })

  return urlSheet
}

export { authentication, duplicateSheet }