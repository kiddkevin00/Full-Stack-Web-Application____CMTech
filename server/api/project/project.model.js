'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ProjectSchema = new Schema({
  project_number: Number,
  project_address: String,
  project_city: String,
  project_state: String,
  project_zip: String,
  project_name: String,
  project_files: [String],
  project_image_url : String,
  link_submittal: {
  	type: Schema.Types.ObjectId, ref: 'Submittal' 
  }
});

module.exports = mongoose.model('Project', ProjectSchema);