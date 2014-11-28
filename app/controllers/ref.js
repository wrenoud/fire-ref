/* global bibtex */
import Ember from 'ember';

export default Ember.ObjectController.extend({
  autoSave: (function() {
  	var model = this.get('model');
  	console.log('### checking...');
  	if(model.get('isDirty'))
  	{
    	return Ember.run.debounce(this, this.save, 1000);
  	}
  }).observes('controller.contents'),

  save: function() {
    var model = this.get('model');
    model.set('updated',Date.now());
	var bibtex = model.get('bibtex');
	console.log(bibtex);
	Ember.Application.client.writeFile(model.get('path').replace(/\.[^\.]+$/ig,'.bib'), bibtex, function(error, stat) {
	  if (error) {
	    return showError(error);  // Something went wrong.
	  }
	  model.save();
	  console.log("File saved as revision " + stat.versionTag);
	});
  },
  actions: {
  	save: function(){
  		return Ember.run.debounce(this, this.save, 100);
  	}
  }
});
