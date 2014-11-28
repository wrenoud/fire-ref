/* global Ember, bibtexParse */
import DS from 'ember-data';
import config from '../config/environment';

var ref = DS.Model.extend({
  type: DS.attr(),
  title: DS.attr(),
  year: DS.attr(),
  author: DS.attr(),
  publisher: DS.attr(),
  bibtex: function(){
    return bibtexParse.toBibtex([{
      citationKey: this.id,
      entryType: this.getWithDefault('type', 'paper'),
      entryTags: this.toJSON()
    }]);
  }.property('type','title','year','author','publisher','path','reviewed','updated'),
  path: DS.attr(),
  reviewed: DS.attr(), // True/False
  updated: DS.attr(),

  preview: function(){
    return "preview.html?path=" + this.get('path') + "&access_token=" + Ember.Application.client._oauth._token;
  }.property('uri'),

});



export default ref;