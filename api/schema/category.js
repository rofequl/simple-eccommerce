const mongoose = require('mongoose')

const category = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  name_n: {
    type: String
  },
  banner: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  serial: {
    type: Number,
  },
  slug: {
    type: String,
    required: true
  },
  disabled: {
    type: String,
    enum: ["active", "inactive"],
    default: "inactive"
  }
})

module.exports = mongoose.model('Category', category)
