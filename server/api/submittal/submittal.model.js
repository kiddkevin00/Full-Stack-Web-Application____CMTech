'use strict';

var mongoose = require('mongoose'), Schema = mongoose.Schema;

var SubmittalSchema = new Schema({
    submittal_title: String,
    submittal_spec_section: String,
    submittal_number: Number,
    submittal_revision: Number,
    submittal_type: String,
    submittal_issue_date: Date,
    submittal_due_date: Date,
    submittal_response_date: Date,
    submittal_tag: String,
    submittal_description: String,
    submittal_attachments: [
        {
            pdf_file_name: String,
            pdf_url: String
        }
    ],
    link_issuer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    link_approver: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    link_distributers: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
});

module.exports = mongoose.model('Submittal', SubmittalSchema);