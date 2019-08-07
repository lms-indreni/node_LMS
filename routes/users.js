var express = require('express');
var router = express.Router();

var usersController = require('../controllers/UsersController');

router.get('/', usersController.index);
router.get('/:code',usersController.show);
router.post('/', usersController.save);
router.put('/', usersController.updateOrInsert);
router.patch('/:code',usersController.update);
router.delete('/:code',usersController.delete);
/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

module.exports = router;
