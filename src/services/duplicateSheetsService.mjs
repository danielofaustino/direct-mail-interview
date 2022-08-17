import { google } from 'googleapis';
import credentials from '../data/credentials.json' assert {type: 'json'}


// POST /drive/v3/files/10cmd91hyu7RYKI7yMfE-d31rfINsQhLsoBETGzucVLc/copy HTTP/1.1
// Host: www.googleapis.com
// Content-length: 17
// Content-type: application/json
// Authorization: Bearer ya29.A0AVA9y1tRWdwQhaXhViNnh9ccp9mDg24KVtdTkSPO_KSlv-XKP4wWR46QIyM5LGlxBvAA_ZYIS8iDo5Lv9MkP7tXlNtFBB-v5TQ9iKgPp4n0hXSYlWyP5DUNGxtMjHb8JyFYUs467VijVd1ae7GbziPQTS-YfaCgYKATASATASFQE65dr8LBAhVue2kfQ-4uCG_ITU-A0163
// {
// "name":"test"
// }

const client_id = credentials.web.client_id;
const client_secret = credentials.web.client_secret;
const redirect_uris = credentials.web.redirect_uris;
const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

const SCOPE = [
  "https://www.googleapis.com/auth/drive",
  "https://www.googleapis.com/auth/drive.file",
  "https://www.googleapis.com/auth/drive.appdata",
  "https://www.googleapis.com/auth/drive.photos.readonly"
]


const getAuthURL = () => {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPE,
  });

  return authUrl;
};

const getToken = (code) => {

  oAuth2Client.getToken('4/0AdQt8qiMn9XzIcO4IQgyeDf069gIf3_EoZFY1A0b9Xmp-ycfqPjD2LHUwDl_3rz6geOSdg', (err, token) => {
    if (err) {
      console.error('Error retrieving access token', err);

    }
    return token;
  });
}

const getUserInfo = (token) => {

  oAuth2Client.setCredentials(token);
  const oauth2 = google.oauth2({ version: 'v2', auth: oAuth2Client });

  oauth2.userinfo.get((err, response) => {

    console.log(response.data);
    return response.data;
  })
}

console.log(getToken())