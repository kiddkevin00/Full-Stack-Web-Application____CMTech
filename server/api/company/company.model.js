'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CompanySchema = new Schema({
  company_name: String,
  company_info: String,
  company_address: String,
  company_contact: String,
  company_phone: String,
  role:{type: String, enum: ['Contruction Manager', 'Contructor', 'Engineer', 'Owner']}
});

module.exports = mongoose.model('Company', CompanySchema);