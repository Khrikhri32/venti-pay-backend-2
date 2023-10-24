const express = require('express');
const bodyParser = require('body-parser');
const apiRoutes = require('./app/routes/api');
const cors = require('cors');

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use('/api', apiRoutes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

module.exports = app;
