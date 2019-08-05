var express = require('express');
var router = express.Router();

var usersController = require('../controllers/UsersController');

router.get('/', usersController.index);
/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

module.exports = router;
