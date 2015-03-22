'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ReportSchema = new Schema({
  link_user : {
  	type: Schema.Types.ObjectId,
  	ref: 'User'
  },
  link_project : {
  	type: Schema.Types.ObjectId,
  	ref: 'Project'
  },
  report_create_date : {
  	type: Date,
  	default: Date.now()
  },
  report_number:Number,
  report_weather: String,
  report_temperature : String,
  report_tide : String,
  report_concrete :{
  	description : String,
  	detail : [{
  		   person : String,
  		   numer : String,
  		   hours : String
     	}
  	],
  	concrete_photo_url : {type : String, default : 'http://www.ucarecdn.com/0f6afb90-31bf-46cb-a14b-cdf7af172339/'}
  },
  report_steel : {
  	description : String,
	detail : [{
  		   person : String,
  		   numer : String,
  		   hours : String
     	}
  	],
  	steel_photo_url : {type : String, default : 'http://www.ucarecdn.com/0f6afb90-31bf-46cb-a14b-cdf7af172339/'}
  },
  report_issues: String,
  report_other_issues : String
  
});

module.exports = mongoose.model('Report', ReportSchema);