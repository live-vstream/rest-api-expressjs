const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var Token = {}

const StreamSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  filename: {
    type: String
  },
  tokens: [{
    value: {
      type: String
    },
    expiresAt: {
      type: Date
    }
  }]
},
  {
    timestamps: true // Saves createdAt and updatedAt as dates. createdAt will be our timestamp.
  });

module.exports = mongoose.model('Stream', StreamSchema);