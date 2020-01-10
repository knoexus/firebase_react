const admin = require('firebase-admin')

const serviceAccount = require('../keyinfo.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://fir-react-a3e72.firebaseio.com"
})

const db = admin.firestore()


module.exports = { admin, db } 
