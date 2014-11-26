import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.resource('refs');
  this.resource('ref', {path: '/refs/:id'});
  this.resource('user');
});

export default Router;
