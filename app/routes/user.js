import Ember from 'ember';

export default Ember.Route.extend({
	model: function(){
		var client = Ember.Application.client;
		client.getAccountInfo(function(error, account,data){
          console.log(data);
          return data;
        });
	}
});
