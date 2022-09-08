const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  name: { type: String },
  number: { type: String },
  address: { type: String },
  content: { type: String  }
});

module.exports = mongoose.model('Post', postSchema);
