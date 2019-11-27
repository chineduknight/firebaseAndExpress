const HttpStatus = require('http-status-codes');
const admin = require('firebase-admin');
const serviceAccount = require('../config/yomi.json');

// initalize SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://yomicasual-738ec.firebaseio.com'
});

const db = admin.firestore();

const usersCollection = db.collection('users');

exports.getAllUsers = (req, res, next) => {
  const allUsers = [];
  usersCollection
    .get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        allUsers.push({
          userData: doc.data(),
          userID: doc.id
        });
      });
     return res.status(HttpStatus.OK).json({
        data: { allUsers },
        status: 'success'
      }); 
    })
    .catch(err => {
       console.log('error getting document',err);
    });
};

exports.getByID = async (req, res, next) => {
  console.log('i am hit my id is');

  const userID = req.params.id;
  usersCollection
    .doc(userID)
    .get()
    .then(doc => {
      if (doc.exists) {
        return  res.status(HttpStatus.OK).json({
          status: 'success',
          data: doc.data()
        });
      } else {
        return res.status(HttpStatus.NOT_FOUND).json({
          status: 'failed',
          message: 'User not found'
        });
      }
    })
    .catch(error => {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: 'error',
        message: 'there was an error fetching the data'
      });
    });
};

exports.createUser = (req, res, next) => {
  console.log('i was hit crated use');

  if (
    (req.body.name !== null && req.body.email !== null) ||
    (req.body.name !== undefined && req.body.email !== undefined)
  ) {
    const docId = Math.floor(Math.random() * (99999 - 11111));
    const newUser = {
      name: req.body.name,
      email: req.body.email,
      createAt: new Date()
    };
    const setNewUser = usersCollection.doc(String(docId)).set(newUser);
    res.json({
      message: 'User was successfully created',
      data: setNewUser
    });
  } else {
    res.json({
      message: 'req.body params are undefined'
    });
  }
};

exports.updateUser = (req, res, next) => {
  const userId = req.params.id;
  console.log('userid from updated', userId);

  let transaction = db.runTransaction(transaction => {
    return transaction
      .get(usersCollection)
      .then(doc => {
        if (req.body.name !== undefined && req.body.email !== undefined) {
          transaction.update(usersCollection.doc(userId), {
            name: req.body.name,
            email: req.body.email
          });
        } else {
          res
            .status(HttpStatus.NOT_MODIFIED)
            .json({ message: 'There is no data to parse' });
            
          }return null
      })
      .then(result => {
        res.status(HttpStatus.OK).json({
          status: 'success',
          data: { msg: 'user was updated'}
        }); return null
      })
      .catch(error => {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          status: 'error',
          data: error
        });
      });
  });
};

exports.deleteUser = (req, res, next) => {
  let deleteDoc = usersCollection.doc(req.params.id).delete();
  res.json({ message: 'User was deleted successfully' });
};
