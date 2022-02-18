const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const hightlightSchema = new Schema({
  username: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: Number, required: true },
  date: { type: Date, required: true },
}, {
  timestamps: true,
});

const Hightlight = mongoose.model('Hightlight', hightlightSchema)

module.exports = Hightlight;
