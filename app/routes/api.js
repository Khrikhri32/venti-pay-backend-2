const express = require('express');
const router = express.Router();
const usersRoutes = require('./users');

router.use('/users', usersRoutes);

router.get('/ping', (req, res) => {
    res.status(200).json({ message: 'Server is up and running!' });
  });

module.exports = router;