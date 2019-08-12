var connection = require('../database/connection');
var Books = require('../models/Books');

module.exports = class BooksRepository {
    getBooks() {
        return new Promise ((resolve, reject)=> {
            connection.query("select * from books where deleted_at is null", (err,results)=>{
                console.log('results:',results);
                if(err){
                    console.log(err);
                    reject(null);
                }
                let books = [];
                results.forEach(result => {
                    let book= new Books();
                    book = Object.assign(book,result)
                    books.push(book);
                });
                resolve(books);
            });
        });
    }
    getBooksByCode(code) {
       return new Promise ((resolve,reject) =>{
           connection.query("select * from books where code = ? and deleted_at is null", code , (err, results)=>{
               if(err){
                   console.log(err);
                   reject(null);
               }
               let result = results[0];
               let books = new Books();
               books = Object.assign(books,result );
               resolve(books);
           })
       })
    }
    saveBooks(books){
        return new Promise((resolve,reject)=>{
            connection.query("insert into books set ?",books,(err,results)=>{
                if(err){
                    console.log(err);
                    reject(null);
                
                }
                resolve(results);
            });
        });
    }
    updateBooksByCode(books,code){
        return new Promise((resolve,reject)=>{
           console.log( connection.query("update books set ? where code = ?", [books,code],(err, results)=>{
                if (err){
                    console.log(err)
                    reject(null);
                }
                resolve(results);
            }));
        });
    }

    deleteBooks(code){
        return new Promise((resolve,reject)=>{
            connection.query("update books set deleted_at = current_timestamp where code = ?", code,(err,results)=>{
                if(err){
                    console.log(err)
                    reject(null);
                }
                resolve(results);
            })
        })
        
    }


    
}