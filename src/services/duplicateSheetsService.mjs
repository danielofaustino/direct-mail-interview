import 'dotenv/config'
import { google } from 'googleapis';
import { authenticate } from '@google-cloud/local-auth'

const drive = google.drive('v3')

const credentials = new URL('../keys/driveCredential.json', import.meta.url).pathname;

const scopes = [
  "https://www.googleapis.com/auth/drive",
  "https://www.googleapis.com/auth/drive.file",
  "https://www.googleapis.com/auth/drive.appdata",
  "https://www.googleapis.com/auth/drive.photos.readonly"
]


async function authentication() {

  try {
    const auth = await authenticate({ keyfilePath: credentials, scopes: scopes })
    google.options({ auth });

  } catch (error) {
    console.error(error.message)
  }
}

async function duplicateSheet(candidate) {
  let urlSheet

  try {

    await drive.files.copy({
      fileId: process.env.DRIVE_FILE_ID,
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

        console.log("-- SHEET CREATED --")
      })

      urlSheet = sheet.data.id

    })

    return urlSheet
  } catch (error) {

    console.error(error.message)

  }


}

export { authentication, duplicateSheet }