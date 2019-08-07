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
    getUsersByCode(code) {
       return new Promise ((resolve,reject) =>{
           connection.query("select * from users where code = ? and deleted_at is null", code , (err, results)=>{
               if(err){
                   console.log(err);
                   reject(null);
               }
               let result = results[0];
               let users = new Users();
               users = Object.assign(users,result );
               resolve(users);
           })
       })
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
    updateUsersByCode(users,code){
        return new Promise((resolve,reject)=>{
           console.log( connection.query("update users set ? where code = ?", [users,code],(err, results)=>{
                if (err){
                    console.log(err)
                    reject(null);
                }
                resolve(results);
            }));
        });
    }

    deleteUsers(code){
        return new Promise((resolve,reject)=>{
            connection.query("update users set deleted_at = current_timestamp where code = ?", code,(err,results)=>{
                if(err){
                    console.log(err)
                    reject(null);
                }
                resolve(results);
            })
        })
        
    }


    
}