'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SubmittalSchema = new Schema({
  name: String,
  info: String,
  title: String,
  spec_section: String,
  number: Number,
  revision: Number,
  type: String,
  issue_date: Date,
  due_date: Date,
  response_date: Date,
  tag: String,
  issued_by: {
  	type: Schema.Types.ObjectId, ref: 'User' 
  },
  aprrover : {
  	type: Schema.Types.ObjectId, ref: 'User' 
  },
  distribution : [{
  	type: Schema.Types.ObjectId, ref: 'User' 
  }],
  description : String,
  attachments : [String]
});

module.exports = mongoose.model('Submittal', SubmittalSchema);