import Ember from 'ember';

export default Ember.View.extend({
	didInsertElement: function(){
		Ember.Application.make_resizable("#reference_panel");
	}
});
