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


async function quickstart() {
  const localAuth = await authenticate({
    scopes: scopes,
    keyfilePath: credentials,
  });
  console.log('Tokens:', localAuth.credentials);
}

async function duplicateSheet() {

  const auth = await authenticate({ keyfilePath: credentials, scopes: scopes })

  console.log("AUTH ==>", auth.credentials)

  google.options({ auth });

  const copy = await drive.files.copy({
    fileId: "1XAYqW1nOPdklr54bGHfa34El9_PvQkP-Behin6iycAI",
    requestBody: {
      "name": "Daniel Faustino-protonTeste",
    },


  }).then(async (result) => {
    console.log("drive", result)
    await drive.permissions.create({
      emailMessage: 'teste de enviar permissão',
      fileId: result.data.id,
      sendNotificationEmail: true,
      // Request body metadata
      requestBody: {
        "emailAddress": "danielofaustino@proton.me",
        "role": "writer",
        "type": "user",
      }
    }).then((result) => {
      console.log("FILE PERMISSION", result.data)
    })


  })
}

console.log(duplicateSheet())