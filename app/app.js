import Ember from 'ember';
import Resolver from 'ember/resolver';
import loadInitializers from 'ember/load-initializers';
import config from './config/environment';

Ember.MODEL_FACTORY_INJECTIONS = true;

var App = Ember.Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver: Resolver
});

loadInitializers(App, config.modulePrefix);

if (config.APP.FORCE_SSL && window.location.protocol !== "https:"){
    window.location.href = "https:" + window.location.href.substring(window.location.protocol.length);
}

Ember.Application.make_resizable = function(parent_id, min_width){
	/**
	// in the template
	<div id="resizable_panel">
		<div class="left subpanel scrollable">
		</div>

		<div class="dragger">
		</div>

		<div class="right subpanel scrollable">
		</div>
	</div>

	// in the view
	export default Ember.View.extend({
		didInsertElement: function(){
			Ember.Application.make_resizable("#resizable_panel");
		}
	});
	*/
	min_width = min_width || 100;
	
	var selector = function(parent_selector, child_selector){
		return parent_selector + " > .ember-view > " + child_selector;
	};

	var parent = function(){return Ember.$(parent_id);};
	var left = function(){return Ember.$(selector(parent_id, ".left"));};
	var dragger = function(){return Ember.$(selector(parent_id, ".dragger"));};
	var right = function(){return Ember.$(selector(parent_id, ".right"));};

	function update_right_panel(){
		right().css("left", dragger().position().left + dragger().width());
		right().width(parent().width() - left().width() - dragger().width());
	}

	function update_height(){
		var innerHeight = parent().height();

		left().height(innerHeight);
		dragger().height(innerHeight);
		right().height(innerHeight);
	}
	
	function update_on_drag() {
		// update the width of the left panel, and resize and move the right
        left().width(dragger().position().left);
        update_right_panel();
    }

	update_height();
	left().position({my: "left top", at:"left top", of: parent()});
	left().width(parent().width()*0.5);
	dragger().position({my: "left top", at:"right top", of: left()});
	update_right_panel();

	dragger().draggable({
		axis: "x",
		drag: update_on_drag
	});

	dragger().mouseup(function(){
		dragger().position({my: "left top", at:"right top", of: left()});
		update_right_panel();
	});

	var parent_dragger = parent().siblings().filter('.dragger');
	if(parent_dragger.length === 1){
		var parent_update_on_drag = parent_dragger.draggable("option","drag");
		parent_dragger.draggable("option","drag", function(){
			parent_update_on_drag();
			update_on_drag();
		});
	}

	Ember.$(window).resize(function(){
		update_height();
		update_right_panel();
	});
};

export default App;
