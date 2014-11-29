import Ember from 'ember';

export default Ember.View.extend({
	didInsertElement: function(){
		var model = this.get('controller.model');
		Ember.$(".progress .shared")[0].style.width = model.get('shared_percentage') + "%";
		Ember.$(".progress .private")[0].style.width = model.get('private_percentage') + "%";
	}
});
