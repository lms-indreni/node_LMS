var BookRepository = require("../repositories/BooksRepository");
var bookRepository = new BookRepository();
var Books = require('../models/Books');

var bookController ={
    index:async (req,res)=>{
        var bookList =await bookRepository.getBooks();
        res.json(bookList);
    },
    save:async(req,res)=>{
        var data = req.body;
        var books = new Books();
        console.log('Before',books);
        books.code = data.code,
        books.student_code = data.student_code,
        books.title = data.title
        books.author_name = data.author_name,
        books.publication = data.publication,
        books.semester = data.semester,
        books.status = data.status || 1,
        books.created_by = data.created_by ,
        books.updated_by = data.updated_by || null ,
        books.deleted_by = data.deleted_by || null ,
        books.created_at = new Date(),
        books.updated_at = new Date()

        var book = await bookRepository.saveBooks(books);
        res.status(201);
        res.send();
    },
    show: async (req,res) => {
       var code = req.params.code;
       var books = await bookRepository.getBooksByCode(code);
       res.send(books);
    },
    updateOrInsert: async (req,res) => {
        var data = req.body;
        var code = data.code;

        var books = await bookRepository.getBooksByCode(code);
        console.log(books);
        if(books){
            await bookRepository.updateBooksByCode(data,code);

        } else {
            let books= new Books();
            books = Object.assign(books,data);
            await bookRepository.saveBooks(data);
        }
        res.status(200).json();
    },
    update: async (req,res)=>{
        var code = req.params.code;
        var data = req.body;
        var books = await bookRepository.updateBooksByCode(data,code);
        res.send(books);
    },

    delete:async(req,res)=>{
        var code= req.params.code;
        var result = bookRepository.deleteBooks(code);
        res.send(result);
    }
}
module.exports = bookController;