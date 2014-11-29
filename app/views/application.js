import Ember from 'ember';

export default Ember.View.extend({
	didInsertElement: function(){
		Ember.$('#content_panel').position({my: "left top", at:"left bottom", of: Ember.$(".navbar")});
		Ember.$('#content_panel').height(window.innerHeight - Ember.$(".navbar").height());
		Ember.$(window).resize(function(){
			Ember.$('#content_panel').height(window.innerHeight - Ember.$(".navbar").height());
		});

		Ember.$(function() {
		    Ember.$( "#preview_dialog" ).dialog({
		      autoOpen: false,
		      closeOnEscape: true,
		      draggable: true,
		      resizable: true,
		      title: "Preview",
		      width: "800px",
		      height: "500px",
		      minHeight: "500px"
		    });
		});

	}
});
