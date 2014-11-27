import Ember from 'ember';

export default Ember.Controller.extend({
	currentUser: null,
	loggedin: false,

	actions: {
		dropbox_login: function(){
			var controller = this;
			Ember.Application.client.authenticate(function(error, client) {
			  if (error) {
			    // Replace with a call to your own error-handling code.
			    //
			    // Don't forget to return from the callback, so you don't execute the code
			    // that assumes everything went well.
			    return alert(error);
			  }

			  // Replace with a call to your own application code.
			  //
			  // The user authorized your app, and everything went well.
			  // client is a Dropbox.Client instance that you can use to make API calls.
			  controller.set('loggedin', true);
			  client.getAccountInfo({},function(err, account){
			  	if(!err)
			  	{
			  		account.id = account.uid;
			  		controller.set('currentUser', account.id);
					controller.get('store').createRecord('user', account);
		  		}
			  });
			});
		}
	}
});
