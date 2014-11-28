import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.resource('refs', function () {
    this.resource('ref', { path: '/:ref_id' });
  });

  this.resource('user');
});

export default Router;
