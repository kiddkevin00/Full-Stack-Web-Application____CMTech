'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CompanySchema = new Schema({
  name: String,
  info: String,
  address: String,
  contact: String,
  phone: String
});

module.exports = mongoose.model('Company', CompanySchema);