import Ember from 'ember';

export default Ember.ArrayController.extend({
	filter: null,
	sortProperties: ['year'],
  	sortAscending: true,
	//allLabels: Ember.computed.mapBy('refs', 'label'),
	//labels: Ember.computed.uniq('allLabels'),

	labels: function() {
  	return this.get('model').reduce(function(prev,next){
			var glom = prev;
      if(Object.prototype.toString.call( prev ) !== '[object Array]')
      {
        if(prev === undefined)
        {
          return [];
        }else{
          var prev_label = prev.get('label');
          if(typeof prev_label === 'string' && prev_label !== '')
          {
            glom = prev_label.split(/,\s*/g);
          }else{
            glom = [];
          }
        }
      }
      var next_label = next.get('label');
      if(typeof next_label === 'string' && next_label !== ''){
        glom = glom.concat(next_label.split(/\s*,\s*/g));
      }
			return glom;
		}).filter(function(label, index, arr){
	    return arr.indexOf(label) === index && label !== undefined && label !== ''; // throw away any instances which are not first
	  }).sort();
	}.property('@each.isDirty'),

	filteredContent: function(){
	    var filter = this.get('filter');
	    var refs = this.get('arrangedContent');
	    if(filter === '*'){
        // all
	    	return refs;
	    }else if(filter === undefined || filter === null || filter === ''){
        // unsorted
	    	return refs.filter(function(ref) {
		      return ref.get('label') === undefined || ref.get('label') === null || ref.get('label') === '';//.match(rx);
		    });
	    }else{
        // sorted
        var rx = new RegExp(filter, 'gi');
		    return refs.filter(function(ref) {
          var hasMatch = false;
          var labels = ref.get('label');
          if(labels !== undefined && labels !== ''){
            labels.split(/\s*,\s*/).forEach(function(label){
              if(label.match(rx)){
                hasMatch = true;
              }
            });
          }
		      return hasMatch;
		    });
	    }
  	}.property('arrangedContent', 'filter', '@each.isDirty'),

  	sortedByTitle: function(){return this.get('sortProperties').indexOf('title') !== -1;}.property('sortProperties'),
  	sortedByAuthor: function(){return this.get('sortProperties').indexOf('author') !== -1;}.property('sortProperties'),
  	sortedByYear: function(){return this.get('sortProperties').indexOf('year') !== -1;}.property('sortProperties'),
  	actions: {
  		filter: function(filter){
  			this.set('filter', filter);
  		},
  		sort: function(column){
  			if(this.get('sortProperties').indexOf(column) !== -1){
				this.set('sortAscending', this.get('sortAscending') ^ true);
  			}else{
  				this.set('sortProperties', [column]);
  			}
  		}
  	}
});
