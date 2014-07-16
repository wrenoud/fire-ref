import DS from 'ember-data';

var ref = DS.Model.extend({
  title: DS.attr(),
  year: DS.attr(),
  author: DS.attr(),

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