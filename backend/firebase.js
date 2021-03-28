var admin = require("firebase-admin");
require('dotenv').config()

var config = {
  "type": "service_account",
  "project_id": "pipermonit",
  "private_key_id": process.env.FIREBASE_PRIVATE_ID,
  "private_key": process.env.FIREBASE_PRIVATE.replace(/\\n/g, '\n'),
  "client_email": "firebase-adminsdk-wu9yj@pipermonit.iam.gserviceaccount.com",
  "client_id": process.env.FIREBASE_CLIENT_ID,
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-wu9yj%40pipermonit.iam.gserviceaccount.com"
}

var serviceAccount = config;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;