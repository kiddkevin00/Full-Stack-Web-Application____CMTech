'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var nodemailer = require('nodemailer');
var _ = require("lodash");
var transporter = nodemailer.createTransport({
    service: 'yahoo',
    auth: {
        user: 'cmtech46@yahoo.com',
        pass: 'cmtech123'
    }
});

var MessageSchema = new Schema({
  //name: String,
  message_first_name : String,
  message_last_name : String,
  message_title : String,
  message_company : String,
  message_office_phone : String,
  message_mobile_phone : String,
  message_email : { type : String , lowercase : true , trim : true},
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
  }
});


MessageSchema.methods = {
  sendEmail : function(recipient_email, callback){
    var mailOptions = {
        from: 'cmtech<cmtech46@yahoo.com>', // sender address
        to: recipient_email, // list of receivers
        subject: 'CMTECH sign up ', // Subject line
        text: 'CMTECH sign up2', // plaintext body
        html: '<a href="http://obscure-mesa-6940.herokuapp.com/signup/' + this._id + '">' + "click here to sign up" + '</a>'// html body
    };
    transporter.sendMail(mailOptions, function(error, info){
       if(error) return callback(error);
       return callback(null,info)
    });
  }
}

module.exports = mongoose.model('Message', MessageSchema);