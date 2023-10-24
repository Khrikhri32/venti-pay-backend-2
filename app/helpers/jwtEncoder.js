const jwt = require('jsonwebtoken');
const { SECRET_KEY } = process.env;

function encode(user, id) {
    return jwt.sign(
        { 
            username: user, 
            id: id 
        }, SECRET_KEY, { expiresIn: '1h' });
  }

  function decode(token) {
    return jwt.decode(token);
  }

  module.exports = {
    encode,
    decode
}