var connection = require('../database/connection');
var Users = require('../models/Users');

module.exports = class UsersRepository {
    getUsers() {
        return new Promise ((resolve, reject)=> {
            connection.query("select * from users where deleted_at is null", (err,results)=>{
                console.log('results:',results);
                if(err){
                    console.log(err);
                    reject(null);
                }
                let users = [];
                results.forEach(result => {
                    let user= new Users();
                    user = Object.assign(user,result)
                    users.push(user);
                });
                resolve(users);
            });
        });
    }
    saveUsers(users){
        return new Promise((resolve,reject)=>{
            connection.query("insert into users set ?",users,(err,results)=>{
                if(err){
                    console.log(err);
                    reject(null);
                
                }
                resolve(results);
            });
        });
    }
}