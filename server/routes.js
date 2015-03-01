/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');

module.exports = function(app) {

  // Insert routes below
  app.use('/api/messages', require('./api/message'));
  app.use('/api/tbl_user_company_projects', require('./api/tbl_user_company_project'));
  app.use('/api/companies', require('./api/company'));
  app.use('/api/submittals', require('./api/submittal'));
  app.use('/api/projects', require('./api/project'));
  app.use('/api/things', require('./api/thing'));
  app.use('/api/users', require('./api/user'));

  app.use('/auth', require('./auth'));
  
  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });
};
