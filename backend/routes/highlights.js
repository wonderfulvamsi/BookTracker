const router = require('express').Router();
let Highlight = require('../models/highlight.model');

router.route('/').get((req, res) => {
  Highlight.find()
    .then(highlights => res.json(highlights))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const bookname = req.body.bookname;
  const insight = req.body.insight;
  const chapter = Number(req.body.chapter);
  const date = Date.parse(req.body.date);

  const newHighlight = new Highlight({
    bookname,
    insight,
    chapter,
    date,
  });

  newHighlight.save()
  .then(() => res.json('Highlight added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Highlight.findById(req.params.id)
    .then(highlight => res.json(highlight))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Highlight.findByIdAndDelete(req.params.id)
    .then(() => res.json('Highlight deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Highlight.findById(req.params.id)
    .then(highlight => {
      highlight.bookname = req.body.bookname;
      highlight.insight = req.body.insight;
      highlight.chapter = Number(req.body.chapter);
      highlight.date = Date.parse(req.body.date);

      highlight.save()
        .then(() => res.json('Highlight updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
