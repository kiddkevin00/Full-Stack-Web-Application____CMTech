'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ProjectSchema = new Schema({
  number: Number,
  address: String,
  city: String,
  state: String,
  zip: String,
  name: String,
  files: [String],
  project_url : String,
  submittals :[{
  	type: Schema.Types.ObjectId, ref: 'Submittal' 
  }]
});

module.exports = mongoose.model('Project', ProjectSchema);