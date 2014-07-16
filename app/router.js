import Ember from 'ember';

var Router = Ember.Router.extend({
  location: FireRefENV.locationType
});

Router.map(function() {
  this.resource('refs');
  this.resource('ref', {path: '/refs/:id'});
  this.resource('user');
});

export default Router;
