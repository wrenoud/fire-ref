import Ember from 'ember';

export default Ember.Route.extend({
	model: function(){
		return [
			{
				id: 1,
				title:"Something important",
				year: "2010",
				author:"Weston Renoud",
			},
			{
				id: 2,
				title:"Less important",
				year: "2009",
				author:"W Renoud",
			}
		];
	},
});
