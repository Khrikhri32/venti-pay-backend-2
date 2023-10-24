const bcrypt = require('bcrypt');

function encrypt(pass) {
    const saltRounds = 10;
    
    return new Promise((resolve, reject) => {
      bcrypt.hash(pass, saltRounds, (err, hash) => {
        if (err) {
          reject(err);
        } else {
          resolve(hash);
        }
      });
    });
  }

  function decrypt(pass,hash) {
    
    return new Promise((resolve, reject) => {
        bcrypt.compare(pass, hash, (err, result) => {
            if (err) {
                reject(err)
            } else if (result) {
                resolve(true)
            } else {
              resolve(false)
            }
          });
    });
  }

  module.exports = {
    encrypt,
    decrypt
}