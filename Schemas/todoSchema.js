const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,

  },
  description: String,
  status: {
    tyre: String,
    enum: ['active', 'inactive']
  },
  date: {
    type: Date,
    default: Date.now,
  }
})

todoSchema.methods = {
  findActive: function() {
    return mongoose.model('Todo').find({ title: "Learn CSS Grid" });
  }
}

module.exports = todoSchema