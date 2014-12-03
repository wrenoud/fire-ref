/* global Ember, bibtexParse */
import DS from 'ember-data';
import config from '../config/environment';

var ref = DS.Model.extend({
  type: DS.belongsTo('entrytype'),
  title: DS.attr(),
  year: DS.attr(),
  author: DS.attr(),
  journal: DS.attr(),
  publisher: DS.attr(),
  institution: DS.attr(),
  volume: DS.attr(),
  number: DS.attr(),
  doi: DS.attr(), // http://dx.doi.org/
  issn: DS.attr(),
  pages: DS.attr(),
  isbn: DS.attr(),
  bibtex: function(key, value, previousValue){
    if(arguments.length > 1){
      var model = this;
      var json = bibtexParse.toJSON(value);
      model.store.find('entrytype', json[0].entryType).then(function(entrytype){
        model.set('type', entrytype);
        Object.keys(json[0].entryTags).forEach(function(key){
            model.set(key, json[0].entryTags[key]);
        });
        model.set('id',json[0].citationKey);
      });
    }
    var data = this.toJSON();
    data.type = undefined; // store as the entryType, don't need it in the bibtex

    return bibtexParse.toBibtex([{
      citationKey: this.id,
      entryType: this.get('type').id,
      entryTags: data
    }]);
  }.property('type','title','year','author','journal','publisher','path','reviewed','updated','volume','number'),
  
  path: DS.attr(),
  reviewed: DS.attr(), // True/False
  updated: DS.attr(),

  pretty_bibtex: function(key, value, previousValue){
    if(arguments.length > 1){
      var bibtex = this.set('bibtex', value);
    }
    return this.get('bibtex').replace(/\}, /ig,'},\n\t');
  }.property('bibtex'),

  pretty_filename: function(){
    var year = this.get('year');
    var author = this.get('author');
    var title = this.get('title');
    
    var filename = '';
    filename += (year && year !== '') ? year + '. ' : '';

    function last_name(name){
      var names = name.split(/\s*,\s+/g);
      if(names.length === 1){
        names = name.split(/\s+/g);
        return names[names.length-1];
      }else{
        return names[0];
      }
      
    }

    if(author){
      var authors = author.split(/\sand\s/ig);
      if(authors.length > 3){
        filename += last_name(authors[0]) + '. ';
      }else{
        authors.forEach(function(name){
          filename += last_name(name) + ', ';
        });
      }
    }
    filename = filename.replace(/, $/g,'. ');
    
    if(title){
      filename += title;
    }
    return filename.replace(/[^ .,a-zA-Z0-9\-\+]/g,'').replace(/. $/g,'');
  }.property('year','author','title'),

  preview: function(){
    return config.baseURL + "preview.html?path=" + this.get('path') + "&access_token=" + Ember.Application.client._oauth._token;
  }.property('path'),

});



export default ref;