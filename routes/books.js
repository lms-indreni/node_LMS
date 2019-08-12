var express = require('express');
var router = express.Router();

var booksController = require('../controllers/BooksController');

router.get('/', booksController.index);
router.get('/:code',booksController.show);
router.post('/', booksController.save);
router.put('/', booksController.updateOrInsert);
router.patch('/:code',booksController.update);
router.delete('/:code',booksController.delete);
/* GET books listing. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

module.exports = router;
