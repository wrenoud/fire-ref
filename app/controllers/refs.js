import Ember from 'ember';

export default Ember.ArrayController.extend({
	sortProperties: ['year'],
  	sortAscending: true,
  	sortedByTitle: function(){return this.get('sortProperties').indexOf('title') !== -1;}.property('sortProperties'),
  	sortedByAuthor: function(){return this.get('sortProperties').indexOf('author') !== -1;}.property('sortProperties'),
  	sortedByYear: function(){return this.get('sortProperties').indexOf('year') !== -1;}.property('sortProperties'),
  	actions: {
  		sort: function(column){
  			if(this.get('sortProperties').indexOf(column) !== -1){
				this.set('sortAscending', this.get('sortAscending') ^ true);
  			}else{
  				this.set('sortProperties', [column]);
  			}
  		}
  	}
});
