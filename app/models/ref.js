/* global Ember, bibtexParse */
import DS from 'ember-data';
import config from '../config/environment';

var ref = DS.Model.extend({
  type: DS.attr(),
  title: DS.attr(),
  year: DS.attr(),
  author: DS.attr(),
  publisher: DS.attr(),
  bibtex: function(key, value, previousValue){
    if(arguments.length > 1){
      var model = this;
      var json = bibtexParse.toJSON(value);
      model.set('type', json[0].entryType);
      Object.keys(json[0].entryTags).forEach(function(key){
          model.set(key, json[0].entryTags[key]);
      });
      model.set('id',json[0].citationKey);
    }
    var data = this.toJSON();
    data.type = undefined; // store as the entryType, don't need it in the bibtex

    return bibtexParse.toBibtex([{
      citationKey: this.id,
      entryType: this.getWithDefault('type', 'paper'),
      entryTags: data
    }]);
  }.property('type','title','year','author','publisher','path','reviewed','updated'),
  
  path: DS.attr(),
  reviewed: DS.attr(), // True/False
  updated: DS.attr(),

  pretty_bibtex: function(key, value, previousValue){
    if(arguments.length > 1){
      var bibtex = this.set('bibtex', value);
    }
    return this.get('bibtex').replace(/, /ig,',\n\t');
  }.property('bibtex'),

  preview: function(){
    return "preview.html?path=" + this.get('path') + "&access_token=" + Ember.Application.client._oauth._token;
  }.property('uri'),

});



export default ref;