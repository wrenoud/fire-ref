import DS from 'ember-data';

export default DS.Model.extend({
  description: DS.attr(),
  required: DS.hasMany("field", {
    inverse: 'requiredForType'
  }),
  optional: DS.hasMany("field", {
    inverse: 'optionalForType'
  })
});
