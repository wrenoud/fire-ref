/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'fire-ref',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development') {
      ENV.contentSecurityPolicy = {
        'default-src': "'none'",
        'script-src': "'self' 'unsafe-eval'",
        'font-src': "'self'",
        'connect-src': "'self' *.dropbox.com",
        'img-src': "'self'",
        'style-src': "'self'"
      }
    // ENV.APP.LOG_RESOLVER = true;
    ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    ENV.APP.LOG_VIEW_LOOKUPS = true;

    ENV.APP.DROPBOX_FOLDER = "/Apps/FireRef";
    ENV.APP.dropboxRecieverUrl = "http://localhost:4200/";
    ENV.APP.FORCE_SSL = false;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'auto';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'gh-pages') {
    ENV.baseURL = '/fire-ref/';
    ENV.APP.dropboxRecieverUrl = "https://wrenoud.github.io/fire-ref/";
    ENV.APP.FORCE_SSL = true;
  }

  return ENV;
};
