'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MessageSchema = new Schema({
  //name: String,
  message_content: String,
  message_deleted: Boolean,
  message_from_user :{ type: Schema.Types.ObjectId,
        ref: 'User'},
  message_to_user : {
  	 type: Schema.Types.ObjectId,
        ref: 'User'
  },
  message_project : {
  	type: Schema.Types.ObjectId,
  	ref: 'Project'
  },
  message_create_date : {
  	type : Date,
    default: Date.now
  },
  message_expire_date : {
  	type: Date,
  	expires: 0
  }
});

module.exports = mongoose.model('Message', MessageSchema);