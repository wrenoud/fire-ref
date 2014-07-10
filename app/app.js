import Ember from 'ember';
import Resolver from 'ember/resolver';
import loadInitializers from 'ember/load-initializers';

Ember.MODEL_FACTORY_INJECTIONS = true;

var App = Ember.Application.extend({
  modulePrefix: 'fire-ref', // TODO: loaded via config
  Resolver: Resolver
});

loadInitializers(App, 'fire-ref');

Ember.client = new Dropbox.Client({ key: "dfzpvdfyqakmnfi" });
Ember.client.authDriver(new Dropbox.AuthDriver.Popup({
    receiverUrl: "http://localhost:4200/oauth_receiver.html"}));

export default App;
