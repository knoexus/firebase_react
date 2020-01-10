const functions = require('firebase-functions')
const app = require('express')()

const { getAllScreams, postOneScream, getScream, commentOnScream } = require('./handlers/screams')
const { signUp, login, uploadImage, addUserDetails, getAuthenticatedUser } = require('./handlers/users')
const FBAuth = require('./util/fbAuth')

//scream routes
app.get('/screams', getAllScreams)
app.post('/scream', FBAuth, postOneScream)
app.get('/scream/:screamId', getScream)
app.post('/scream/:screamId/comment', FBAuth, commentOnScream)

//auth routes
app.post('/signup', signUp)
app.post('/login', login)
app.post('/user/image', FBAuth, uploadImage)
app.post('/user', FBAuth, addUserDetails)
app.get('/user', FBAuth, getAuthenticatedUser)


exports.api = functions.https.onRequest(app)