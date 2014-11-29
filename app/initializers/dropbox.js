/* global Dropbox, Ember */
import config from '../config/environment';

export default {
  name: 'dropbox',
  after: 'store',

  initialize: function(/* container, app */) {
    //var controller = container.lookup('controller:application');

    var client = Ember.Application.client = new Dropbox.Client({ key: "dfzpvdfyqakmnfi" });
    client.authDriver(new Dropbox.AuthDriver.Popup({
      receiverUrl: config.APP.dropboxRecieverUrl + "oauth_receiver.html",
      rememberUser: true
    }));

    //alert(client.isAuthenticated());
    //controller.set('loggedin', client.isAuthenticated());
    // app.register('route', 'foo', 'service:foo');
  }
};
