const functions = require('firebase-functions')
const admin = require('firebase-admin')
const app = require('express')()
const serviceAccount = require('./keyinfo.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://fir-react-a3e72.firebaseio.com"
})

const firebaseConfig = {
    apiKey: "AIzaSyBO4nRhbCbqznNPFPFNcSIMK4gV87_oz7o",
    authDomain: "fir-react-a3e72.firebaseapp.com",
    databaseURL: "https://fir-react-a3e72.firebaseio.com",
    projectId: "fir-react-a3e72",
    storageBucket: "fir-react-a3e72.appspot.com",
    messagingSenderId: "837655335183",
    appId: "1:837655335183:web:2e77b6b9ceb4b4ea2bee7a",
    measurementId: "G-7Q3PR0Q2DZ"
}

const firebase = require('firebase')
firebase.initializeApp(firebaseConfig)

const db = admin.firestore()

app.get('/screams', ((req, res) => {
    db.collection('screams').orderBy('createdAt', 'desc').get()
    .then(data => {
        const screams = data.docs.map(doc => ({
            screamId: doc.id,
            body: doc.data().body,
            userHandle: doc.data().userHandle,
            createdAt: doc.data().createdAt
        }))
        return res.json(screams)
    })
    .catch(err => console.error(err))
}))

app.post('/scream', ((req, res) => {
    const newScream = {
        body: req.body.body,
        userHandle: req.body.userHandle,
        createdAt: new Date().toISOString()
    }

    db.collection('screams').add(newScream)
        .then(doc => res.json({ message: `document ${doc.id} created successfully`}))
        .catch(err => {
            res.status(500).json({ error: 'something went wrong'})
            console.error(err)
        })
}))

let token, userID

app.post('/signup', ((req, res) => {
    const newUser = {
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        handle: req.body.handle,
    }

    db.doc(`/users/${newUser.handle}`).get()
        .then(doc => {
            if (doc.exists){
                return res.status(400).json({ handle: 'this handle is already taken' })
            }
            else {
                return firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password)
            }
        })
        .then(data => {
            userId = data.user.uid
            return data.user.getIdToken()
        })
        .then(idToken => {
            token = idToken
            const userCredentials = {
                handle: newUser.handle,
                email: newUser.email,
                createdAt: new Date().toISOString(),
                userId
            }
            return db.doc(`/users/${newUser.handle}`).set(userCredentials)
        })
        .then(() => res.status(201).json({ token }))
        .catch(err => {
            console.error(err)
            if (err.code === 'auth/email-already-in-use')
                return res.status(400).json({ email: 'Email is already in use' })
            else 
                return res.status(500).json({ error: err.code })
        })
}))

exports.api = functions.https.onRequest(app)