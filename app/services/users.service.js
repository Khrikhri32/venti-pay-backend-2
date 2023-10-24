const pool = require("../config/database");

const { encrypt,decrypt } = require('../helpers/hashPass');
const { encode,decode } = require('../helpers/jwtEncoder');

module.exports = {
    create: async (data, callBack) => {

        pool.query(
        `insert into users(name,email,phone,address,password) 
            values(?,?,?,?,?)`,
            [
                data.name,
                data.email,
                data.phone,
                data.address,
                await encrypt(data.pass)
            ],
            (error,results,fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getAll: (callBack) => {
        pool.query(
            `select name,email,phone,address from users`,
                (error,results,fields) => {
                    if(error){
                        return callBack(error);
                    }
                    return callBack(null, results);
                }
            )
    },
    getUserData: (data, callBack) =>{
        pool.query(
            `select name,email,phone,address from users where name = ?`,
                [data.user],
                async (error,results,fields) => {
                    if(error){
                        return callBack(error);
                    }
                    return callBack(null,results);
                }
            )
    },
    checkLogin: (data,callBack) => {
        
        pool.query(
            `select * from users where name = ?`,
                [data.user],
                async (error,results,fields) => {
                    if(error){
                        return callBack(error);
                    }
                    let res = await decrypt(data.pass,results[0].password);
                    if(res){
                        let token = encode(data.user, results[0].usersID );                        
                        return callBack(null,{ message: 'Login successful', token, status:200 });
                    }
                    return callBack(null,{ message: 'Invalid credentials',status:401 });
                }
            )
    },
}