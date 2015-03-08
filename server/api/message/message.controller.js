'use strict';

var _ = require('lodash');
var Message = require('./message.model');
var moment = require('moment');
var nodemailer = require('nodemailer');
var async = require('async');
var User = require('../user/user.model');

var transporter = nodemailer.createTransport({
    service: 'yahoo',
    auth: {
        user: 'cmtech46@yahoo.com',
        pass: 'cmtech123'
    }
});

// Get list of messages
exports.index = function(req, res) {
  Message.find(function (err, messages) {
    if(err) { return handleError(res, err); }
    return res.json(200, messages);
  });
};

// Get a single message
exports.show = function(req, res) {
  Message.findById(req.params.id, function (err, message) {
    if(err) { return res.json(401, err); }
    if(!message) { return res.send(406); }
    return res.json(message);
  });
};

// Creates a new message in the DB.
exports.create = function(req, res) {

  // var mailOptions = {
  //     from: 'qi tang<cmtech46@yahoo.com>', // sender address
  //     to: 'stealop@gmail.com', // list of receivers
  //     subject: 'Hello ✔', // Subject line
  //     text: 'Hello world ✔', // plaintext body
  //     html: '<b>Hello world ✔</b>' // html body
  // };

  var userId = req.body.userId;
  var projectId = req.body.projectId;
  var recipients = req.body.recipients;
  async.each(recipients, function(r,callback) {
    User.findOne({user_email : r}, function(err, u){
      if(err) callback(err);
      if(!u) {
        var message = new Message();
        message.message_email = r,
        message.message_deleted = false,
        message.message_from_user = userId,
        message.message_project = projectId,
        message.message_expire_date = moment().add(10, 'd').utc().format();
        message.save(function(err, m){
          if(err) callback(err);
          m.sendEmail(r,function(err,info){
            if(err) callback(err);
            console.log(info)
            callback();
          })
        });
      }
    })
  },function(err){
    if(err) return res.send(err);
    return res.json(205,'ok')
  })
  // var message = {
  //   message_content: "this is a test",
  //   message_deleted: false,
  //   message_from_user : userId,
  //   message_project : projectId,
  //   message_expire_date : moment().add(10, 'd').utc().format()
  // }
  
  // Message.create(message, function(err,message){
  //   var mailOptions = {
  //       from: 'qi tang<cmtech46@yahoo.com>', // sender address
  //       to: recipients, // list of receivers
  //       subject: 'Hello ✔', // Subject line
  //       text: 'Hello world ✔', // plaintext body
  //       html: 'dsdsdddddddd<a href="http://localhost:9000/signup/' + message._id + '">' + "click here to sign up" + '</a>'// html body
  //   };
  //   transporter.sendMail(mailOptions, function(error, info){
  //       if(error){
  //           console.log(error);
  //       }else{
  //           console.log('Message sent: ' + info.response);
  //           return res.send(info.response)
  //       }
  //   });
  // })
};

// Updates an existing message in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Message.findById(req.params.id, function (err, message) {
    if (err) { return handleError(res, err); }
    if(!message) { return res.send(404); }
    var updated = _.merge(message, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, message);
    });
  });
};

// Deletes a message from the DB.
exports.destroy = function(req, res) {
  Message.findById(req.params.id, function (err, message) {
    if(err) { return handleError(res, err); }
    if(!message) { return res.send(404); }
    message.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}