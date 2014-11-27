import Ember from 'ember';

export default Ember.Route.extend({
	model: function(){
		if(!this.container.lookup('controller:application').get('loggedin'))
		{
			this.transitionTo('/');
		}
		return this.store.find('ref');
	}
});
