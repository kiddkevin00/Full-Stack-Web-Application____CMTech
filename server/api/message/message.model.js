'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'yahoo',
    auth: {
        user: 'cmtech46@yahoo.com',
        pass: 'cmtech123'
    }
});

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


MessageSchema.methods = {
  sendEmail : function(recipient_email, callback){
    var mailOptions = {
        from: 'qi tang<cmtech46@yahoo.com>', // sender address
        to: recipient_email, // list of receivers
        subject: 'Hello ✔', // Subject line
        text: 'Hello world ✔', // plaintext body
        html: 'dsdsdddddddd<a href="http://localhost:9000/signup/' + this._id + '">' + "click here to sign up" + '</a>'// html body
    };
    transporter.sendMail(mailOptions, function(error, info){
       if(error) return callback(error);
       return callback(null,info)
    });
  }
}

module.exports = mongoose.model('Message', MessageSchema);