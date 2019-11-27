const express = require('express');
const { helloworld} = require('../controllers/hello');
const router = express.Router();

router
  .route('/')
  .get(helloworld);

  module.exports = router;
