const functions = require('firebase-functions')
const app = require('express')()

const { db } = require('./util/admin')

const { getAllScreams, postOneScream, getScream, 
        commentOnScream, likeScream, unlikeScream, deleteScream } = require('./handlers/screams')
const { signUp, login, uploadImage, addUserDetails, getAuthenticatedUser, 
        getUserDetails, markNotificationsRead} = require('./handlers/users')
const FBAuth = require('./util/fbAuth')

//scream routes
app.get('/screams', getAllScreams)
app.post('/scream', FBAuth, postOneScream)
app.get('/scream/:screamId', getScream)
app.delete('/scream/:screamId', FBAuth, deleteScream)
app.post('/scream/:screamId/comment', FBAuth, commentOnScream)
app.get('/scream/:screamId/like', FBAuth, likeScream)
app.get('/scream/:screamId/unlike', FBAuth, unlikeScream)

//auth routes
app.post('/signup', signUp)
app.post('/login', login)
app.post('/user/image', FBAuth, uploadImage)
app.post('/user', FBAuth, addUserDetails)
app.get('/user', FBAuth, getAuthenticatedUser)
app.get('/user/:handle', getUserDetails)

app.post('/notifications', FBAuth, markNotificationsRead)

exports.api = functions.https.onRequest(app)

exports.createNotificationOnLike = functions.firestore.document('likes/{id}')
    .onCreate(snapshot => {
        db.doc(`/screams/${snapshot.data().screamId}`).get()
            .then(doc => {
                if (doc.exists){
                    return db.doc(`/notifications/${snapshot.id}`).set({
                        createdAt: new Date().toISOString(),
                        recipient: doc.data().userHandle,
                        sender: snapshot.data().userHandle,
                        type: 'like',
                        read: false,
                        screamId: doc.id,
                    })
                }
            })
            .catch(err => console.error(err))
    })


exports.deleteNotificationOnUnlike = functions.firestore.document('likes/{id}')
    .onDelete(snapshot => {
        db.doc(`/notifications/${snapshot.id}`)
            .delete()
            .catch(err => console.error(err))
    })


exports.createNotificationOnComment = functions.firestore.document('comments/{id}')
    .onCreate(snapshot => {
        db.doc(`/screams/${snapshot.data().screamId}`).get()
            .then(doc => {
                if (doc.exists){
                    return db.doc(`/notifications/${snapshot.id}`).set({
                        createdAt: new Date().toISOString(),
                        recipient: doc.data().userHandle,
                        sender: snapshot.data().userHandle,
                        type: 'comment',
                        read: false,
                        screamId: doc.id,
                    })
                }
            })
            .catch(err => console.error(err))
    })