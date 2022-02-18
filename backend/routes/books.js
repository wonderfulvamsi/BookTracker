const router = require('express').Router();
let Book = require('../models/book.model');

router.route('/').get((req, res) => {
  Book.find()
    .then(books => res.json(books))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const bookname = req.body.bookname;

  const newBook = new Book({bookname});

  newBook.save()
    .then(() => res.json('book added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
