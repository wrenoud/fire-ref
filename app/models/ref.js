import DS from 'ember-data';
import config from '../config/environment';

var ref = DS.Model.extend({
  type: DS.attr(),
  title: DS.attr(),
  year: DS.attr(),
  author: DS.attr(),
  uri: DS.attr(),

  preview: function(){
    return "https://api-content.dropbox.com/1/previews/auto" + config.APP.DROPBOX_FOLDER + this.get('uri');
  }.property('uri')
});

ref.reopenClass({
  FIXTURES: [
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
  ]
});

export default ref;