import Ember from 'ember';

export default Ember.Component.extend({
	isCurrent: function(){
		return this.get('filter') === this.get('current').get('controller').get('filter');
	}.property('filter','current.controller.filter'),
	click: function() {
    	this.sendAction('action', this.get('filter'));
  	}
});
