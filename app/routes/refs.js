import Ember from 'ember';

export default Ember.Route.extend({
	model: function(){
		return [
			{
				title:"Something important",
				year: "2010",
				author:"Weston Renoud",
			},
			{
				title:"Less important",
				year: "2009",
				author:"W Renoud",
			}
		];
	},
});
