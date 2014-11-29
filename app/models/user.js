import DS from 'ember-data';

export default DS.Model.extend({
	countryCode: DS.attr(),
	email: DS.attr(),
	name: DS.attr(),
	privateBytes: DS.attr(),
	publicAppUrl: DS.attr(),
	quota: DS.attr(),
	referralUrl: DS.attr(),
	sharedBytes: DS.attr(),
	uid: DS.attr(),
	usedQuota: DS.attr(),

	private_pretty: function(){
		var size = this.get('privateBytes');
		var unit = 0;
		var units = ["B","KB","MB","GB","TB"];
		while(size > 1024){
			size = size / 1024.0;
			unit ++;
		}
		return size.toFixed(1) + " " + units[unit];
	}.property('privateBytes'),
	shared_pretty: function(){
		var size = this.get('sharedBytes');
		var unit = 0;
		var units = ["B","KB","MB","GB","TB"];
		while(size > 1024){
			size = size / 1024.0;
			unit ++;
		}
		return size.toFixed(1) + " " + units[unit];
	}.property('sharedBytes'),
	used_pretty: function(){
		var size = this.get('usedQuota');
		var unit = 0;
		var units = ["B","KB","MB","GB","TB"];
		while(size > 1024){
			size = size / 1024.0;
			unit ++;
		}
		return size.toFixed(1) + " " + units[unit];
	}.property('usedQuota'),

	quota_pretty: function(){
		var size = this.get('quota');
		var unit = 0;
		var units = ["B","KB","MB","GB","TB"];
		while(size > 1024){
			size = size / 1024.0;
			unit ++;
		}
		return size.toFixed(1) + " " + units[unit];
	}.property('quota'),

	private_percentage: function(){
		return this.get('privateBytes') / this.get('quota') * 100.0;
	}.property('quota', 'privateBytes'),

	shared_percentage: function(){
		return this.get('sharedBytes') / this.get('quota') * 100.0;
	}.property('quota', 'sharedBytes'),

	total_percentage: function(){
		return this.get('usedQuota') / this.get('quota') * 100.0;
	}.property('quota', 'usedQuota')
});
