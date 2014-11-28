import Ember from 'ember';

export default Ember.View.extend({
	didInsertElement: function(){
		console.log("here")
		Ember.$('#content_panel').position({my: "left top", at:"left bottom", of: Ember.$(".navbar")});
		Ember.$('#content_panel').height(window.innerHeight - Ember.$(".navbar").height() - 1);
		Ember.$(window).resize(function(){
			Ember.$('#content_panel').height(window.innerHeight - Ember.$(".navbar").height() - 1);
		})
	}
});
