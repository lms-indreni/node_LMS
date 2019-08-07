var UserRepository = require("../repositories/UsersRepository");
var userRepository = new UserRepository();
var Users = require('../models/Users');

var userController ={
    index:async (req,res)=>{
        var userList =await userRepository.getUsers();
        res.json(userList);
    },
    save:async(req,res)=>{
        var data = req.body;
        var users = new Users();
        console.log('Before',users);
        users.code = data.code,
        users.first_name = data.first_name,
        users.middle_name = data.middle_name || null,
        users.last_name = data.last_name,
        users.phone_no = data.phone_no,
        users.username = data.username,
        users.password = data.password,
        users.confirm_password = data.confirm_password,
        users.email = data.email,
        users.batch = data.batch,
        users.status = data.status || 1,
        users.created_by = data.created_by ,
        users.updated_by = data.updated_by || null ,
        users.deleted_by = data.deleted_by || null ,
        users.created_at = new Date(),
        users.updated_at = new Date()

        var user = await userRepository.saveUsers(users);
        res.status(201);
        res.send();
    },
    show: async (req,res) => {
       var code = req.params.code;
       var users = await userRepository.getUsersByCode(code);
       res.send(users);
    },
    updateOrInsert: async (req,res) => {
        var data = req.body;
        var code = data.code;

        var users = await userRepository.getUsersByCode(code);
        console.log(users);
        if(users){
            await userRepository.updateUsersByCode(data,code);

        } else {
            let users = new Users();
            users = Object.assign(users,data);
            await userRepository.saveUsers(data);
        }
        res.status(200).json();
    },
    update: async (req,res)=>{
        var code = req.params.code;
        var data = req.body;
        var users = await userRepository.updateUsersByCode(data,code);
        res.send(users);
    },

    delete:async(req,res)=>{
        var code= req.params.code;
        var result = userRepository.deleteUsers(code);
        res.send(result);
    }
}
module.exports = userController;