const express = require('express');
const {
  deleteUser,
  updateUser,
  getAllUsers,
  getByID,
  createUser
} = require('../controllers/firebase');

const router = express.Router();

router
  .route('/')
  .get(getAllUsers)
  .post(createUser);
router
  .route('/:id')
  .get(getByID)
  .put(updateUser)
  .delete(deleteUser);

module.exports = router;
