/* global Ember, bibtexParse */
import DS from 'ember-data';
import config from '../config/environment';

var ref = DS.Model.extend({
  type: DS.belongsTo('entrytype'),
  label: DS.attr(),
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
    var model = this;

    if(arguments.length > 1){
      var json = bibtexParse.toJSON(value);
      
      model.set('id',   json[0].citationKey);
      model.set('type', model.store.getById('entrytype', json[0].entryType));
      Object.keys(json[0].entryTags).forEach(function(key){
        var value = json[0].entryTags[key];
          model.set(key, value);
      });
    }
    var data = model.toJSON();
    data.type = undefined; // store as the entryType, don't need it in the bibtex

    return bibtexParse.toBibtex([{
      citationKey: model.id,
      entryType: model.get('type').id,
      entryTags: data
    }]);
  }.property('type','title','year','author','journal','publisher','path','reviewed','updated','volume','number','label'),
  
  path: DS.attr(),
  reviewed: DS.attr(), // True/False
  updated: DS.attr(),

  pretty_bibtex: function(key, value, previousValue){
    if(arguments.length > 1){
      var bibtex = this.set('bibtex', value);
    }
    return this.get('bibtex').replace(/\}, /ig,'},\n\t');
  }.property('bibtex'),

  abbreviated_authors: function(){
    var author = this.get('author');
    function last_name(name){
      var names = name.split(/\s*,\s+/g);
      if(names.length === 1){
        names = name.split(/\s+/g);
        return names[names.length-1];
      }else{
        return names[0];
      }
      
    }
    var abbreviated_authors = '';
    if(author){
      var authors = author.split(/\s+and\s+/ig);
      if(authors.length > 3){
        abbreviated_authors += last_name(authors[0]) + ' et al. ';
      }else{
        authors.forEach(function(name){
          abbreviated_authors += last_name(name) + ', ';
        });
      }
      return abbreviated_authors.replace(/, $/,'. ');
    }else{
      return '';
    }

  }.property('author'),

  pretty_filename: function(){
    var year = this.get('year');
    var title = this.get('title');
    
    var filename = '';
    filename += (year && year !== '') ? year + '. ' : '';

    var authors = this.get("abbreviated_authors");
    if(authors !== '')
    {
      filename += authors;
    }
    
    if(title){
      filename += title;
    }
    return filename.replace(/[^ .,a-zA-Z0-9\-\+]/g,'').replace(/. $/g,'');
  }.property('year','author','title'),

  googleScholar: function(){
    var url = 'http://scholar.google.ca/scholar?';
    var authors = this.get('abbreviated_authors');
    if(authors !== '')
    {
      url += "as_sauthors=" + authors.replace(/[^\S]+/g, '+');
    }

    url += "&as_q=" + this.get('title').replace(/[^\S]+/g, '+');
    return url;
  }.property('author', 'title'),


  preview: function(){
    return config.baseURL + "preview.html?path=" + this.get('path') + "&access_token=" + Ember.Application.client._oauth._token;
  }.property('path'),

});



export default ref;