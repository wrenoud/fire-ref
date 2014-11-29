import DS from 'ember-data';

export default DS.Model.extend({
  requiredForType: DS.hasMany("entrytype", {
    inverse: 'required'
  }),
  optionalForType: DS.hasMany("entrytype", {
    inverse: 'optional'
  })

});
