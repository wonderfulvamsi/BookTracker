const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const hightlightSchema = new Schema({
  bookname: { type: String, required: true },
  insight: { type: String, required: true },
  chapter: { type: Number, required: true },
  date: { type: Date, required: true },
}, {
  timestamps: true,
});

const Hightlight = mongoose.model('Hightlight', hightlightSchema)

module.exports = Hightlight;
