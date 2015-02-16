'use strict';

var mongoose = require('mongoose'), Schema = mongoose.Schema;

var CompanySchema = new Schema({
    company_name: String,
    company_address: String,
    company_contact: String,
    company_state: String,
    company_zip: String,
    company_city: String,
    company_phone: String,
    company_role: {type: String, enum: ['Contruction Manager', 'Contructor', 'Engineer', 'Owner']}
});

module.exports = mongoose.model('Company', CompanySchema);