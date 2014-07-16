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
	usedQuota: DS.attr()
});
