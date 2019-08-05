var UserRepository = require("../repositories/UsersRepository");
var userRepository = new UserRepository();
var User = require('../models/Users');

var userController ={
    index:async (req,res)=>{
        var userList =await userRepository.getUsers();
        res.json(userList);
    }
}
module.exports = userController;