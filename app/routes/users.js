const express = require('express');
const router = express.Router();
require('dotenv').config();
const usersController = require('../controllers/users.controller');
//const checkApiKey = require('../middleware/checkApiKey');
const auth = require('../middleware/authMiddleware');

//router.use(checkApiKey);

router.post('/create', usersController.createUser);
router.get('/getAll', auth, usersController.getUsers);
router.post('/getData', auth, usersController.getUserData);
router.post('/login', usersController.loginUser);

router.get('/ping', (req, res) => {
    res.status(200).json({ message: 'User Ping' });
  });

module.exports = router;