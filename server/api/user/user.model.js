'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');

var UserSchema = new Schema({
  user_first_name: String,
  user_last_name: String,
  user_title: String,
  user_email:  { type : String , lowercase : true , trim : true},
  user_office_phone: String,
  user_mobile_phone: String,
  user_profile_url: String,
  user_is_admin: Boolean,
  user_view_home: Boolean,
  user_view_daily_report: Boolean,
  user_view_change_order: Boolean,
  user_view_rfi: Boolean,
  user_view_submittal: Boolean,
  user_view_transmittal: Boolean,
  user_view_punchlist: Boolean,
  user_view_schedule: Boolean,
  user_role: {
    type: String,
    enum: ['Construction Manager', 'Contractor', 'Engineer', 'Owner']
  },
  link_company: {
    type: Schema.Types.ObjectId,
    ref: 'Company'
  },
  link_projects: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Project'
    }
  ],
  role: {
    type: String,
    default: 'user'
  },
  hashedPassword: String,
  provider: String,
  salt: String
});

/**
 * Virtuals
 */
UserSchema.virtual('password').set(function(password) {
  this._password = password;
  this.salt = this.makeSalt();
  this.hashedPassword = this.encryptPassword(password);
}).get(function() {
  return this._password;
});

// Public profile information
UserSchema.virtual('profile').get(function() {
  return {
    'user_first_name': this.user_first_name,
    'user_last_name': this.user_last_name,
    'user_title': this.user_title,
    'user_email': this.user_email,
    'user_office_phone': this.user_office_phone,
    'user_mobile_phone': this.user_mobile_phone,
    'user_profile_url': this.user_profile_url,
    'user_is_admin': this.user_is_admin,
    'user_view_home': this.user_view_home,
    'user_view_daily_report': this.user_view_daily_report,
    'user_view_change_order': this.user_view_change_order,
    'user_view_rfi': this.user_view_rfi,
    'user_view_submittal': this.user_view_submittal,
    'user_view_transmittal': this.user_view_transmittal,
    'user_view_punchlist': this.user_view_punchlist,
    'user_view_schedule': this.user_view_schedule,
    'user_role': this.user_role,
    'link_company': this.link_company,
    'link_projects': this.link_projects
  };
});

// Non-sensitive info we'll be putting in the token
UserSchema.virtual('token').get(function() {
  return {
    '_id': this._id,
    'role': this.role
  };
});

/**
 * Validations
 */

  // Validate empty email
UserSchema.path('user_email').validate(function(email) {
  return email.length;
}, 'Email cannot be blank');

// Validate empty password
UserSchema.path('hashedPassword').validate(function(hashedPassword) {
  return hashedPassword.length;
}, 'Password cannot be blank');

// Validate email is not taken
UserSchema.path('user_email').validate(function(value, respond) {
  var self = this;
  this.constructor.findOne({user_email: value}, function(err, user) {
    console.log(user)
    if (err) throw err;
    if (user) {
      console.log(self.id, user.id)
      if (self.id === user.id) return respond(true);
      return respond(false);
    }
    respond(true);
  });
}, 'The specified email address is already in use.');

var validatePresenceOf = function(value) {
  return value && value.length;
};

/**
 * Pre-save hook
 */
UserSchema.pre('save', function(next) {
  if (!this.isNew) return next();

  if (!validatePresenceOf(this.hashedPassword)) {
    next(new Error('Invalid password'));
  } else {
    next();
  }
});

/**
 * Methods
 */
UserSchema.methods = {
  /**
   * Authenticate - check if the passwords are the same
   *
   * @param {String} plainText
   * @return {Boolean}
   * @api public
   */
  authenticate: function(plainText) {
    return this.encryptPassword(plainText) === this.hashedPassword;
  },

  /**
   * Make salt
   *
   * @return {String}
   * @api public
   */
  makeSalt: function() {
    return crypto.randomBytes(16).toString('base64');
  },

  /**
   * Encrypt password
   *
   * @param {String} password
   * @return {String}
   * @api public
   */
  encryptPassword: function(password) {
    if (!password || !this.salt) return '';
    var salt = new Buffer(this.salt, 'base64');
    return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
  }
};

module.exports = mongoose.model('User', UserSchema);
