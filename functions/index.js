const functions = require('firebase-functions');
const dotenv = require('dotenv');
const express = require('express');

//Route Files
const firebase = require('./routes/firebase');
const hello = require('./routes/hello');
const bootcamp = require('./routes/bootcamps');

dotenv.config({ path: './config/config.env' });


const app = express();

app.use(express.json());

//Mount routers
app.use('/api/v1/firebase', firebase);
app.use('/api/v1/hello', hello);
app.use('/api/v1/bootcamp', bootcamp);

exports.app = functions.https.onRequest(app);

//--------------------------------------------------------

// const functions = require('firebase-functions');
// const admin = require('firebase-admin');

// const serviceAccount = require('../config/yomi.json');

// // initalize SDK
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: 'https://yomicasual-738ec.firebaseio.com'
// });

// exports.helloWorld = functions.https.onRequest((request, response) => {
//   response.send('Hello from Firebase!');
// });
// exports.getUsers = functions.https.onRequest((req, res) => {
//   admin
//     .firestore()
//     .collection('users')
//     .get()
//     .then(data => {
//       const users = [];
//       data.forEach(doc => {
//         users.push({
//           userID: doc.id,
//           userData: doc.data()
//         });
//       });
//       return res.status(200).json({ data: users, status: 200 });
//     })
//     .catch(err => res.json({ error: err }));
// });
