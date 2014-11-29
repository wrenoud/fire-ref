export function initialize(/* container, application */) {
  // application.inject('route', 'foo', 'service:foo');
};

export default {
  name: 'bibtex',
  after: 'store',

  initialize: function(container){
    var types = [
      {
        id: "article",
        description: "An article from a journal or magazine.",
        required: ["author", "title", "journal", "year"],
        optional: ["volume", "number", "pages", "month", "note", "key"]
      },
      {
        id: "book",
        description: "A book with an explicit publisher.",
        required: ["author", "editor", "title", "publisher", "year"],
        optional: ["volume", "number", "series", "address", "edition", "month", "note", "key"]
      },
      {
        id: "booklet",
        description: "A work that is printed and bound, but without a named publisher or sponsoring institution.",
        required: ["title"],
        optional: ["author", "howpublished", "address", "month", "year", "note", "key"]
      },
      {
        id: "conference",
        description: "The same as inproceedings, included for Scribe compatibility.",
        required: ["author", "title", "booktitle", "year"],
        optional: ["editor", "volume", "number", "series", "pages", "address", "month", "organization", "publisher", "note", "key"]
      },
      {
        id: "inbook",
        description: "A part of a book, usually untitled. May be a chapter (or section, etc.) and/or a range of pages.",
        required: ["author", "editor", "title", "chapter", "pages", "publisher", "year"],
        optional: ["volume", "number", "series", "type", "address", "edition", "month", "note", "key"]
      },
      {
        id: "incollection",
        description: "A part of a book having its own title.",
        required: ["author", "title", "booktitle", "publisher", "year"],
        optional: ["editor", "volume", "number", "series", "type", "chapter", "pages", "address", "edition", "month", "note", "key"]
      },
      {
        id: "inproceedings",
        description: "An article in a conference proceedings.",
        required: ["author", "title", "booktitle", "year"],
        optional: ["editor", "volume", "number", "series", "pages", "address", "month", "organization", "publisher", "note", "key"]
      },
      {
        id: "manual",
        description: "Technical documentation.",
        required: ["title"],
        optional: ["author", "organization", "address", "edition", "month", "year", "note", "key"]
      },
      {
        id: "mastersthesis",
        description: "A Master's thesis.",
        required: ["author", "title", "school", "year"],
        optional: ["type", "address", "month", "note", "key"]
      },
      {
        id: "misc",
        description: "For use when nothing else fits.",
        required: ["none"],
        optional: ["author", "title", "howpublished", "month", "year", "note", "key"]
      },
      {
        id: "phdthesis",
        description: "A Ph.D. thesis.",
        required: ["author", "title", "school", "year"],
        optional: ["type", "address", "month", "note", "key"]
      },
      {
        id: "proceedings",
        description: "The proceedings of a conference.",
        required: ["title", "year"],
        optional: ["editor", "volume", "number", "series", "address", "month", "publisher", "organization", "note", "key"]
      },
      {
        id: "techreport",
        description: "A report published by a school or other institution, usually numbered within a series.",
        required: ["author", "title", "institution", "year"],
        optional: ["type", "number", "address", "month", "note", "key"]
      },
      {
        id: "unpublished",
        description: "A document having an author and title, but not formally published.",
        required: ["author", "title", "note"],
        optional: ["month", "year", "key"]
      },
    ];

    var store = container.lookup('store:main');

    types.forEach(function(entrytype){
      // store.find('entrytype', entrytype.id).then(function(record){
      //   record.set('description',entrytype.description);
      //   record.save();
      // })
      if(!store.getById('entrytype', entrytype.id)){
        var item = store.createRecord('entrytype', {id: entrytype.id, description: entrytype.description});
        // save fields
        var requiredArray = item.get('required');
        entrytype.required.forEach(function(required){
          var record = store.getById('field', required);
          if(!record){
            record = store.createRecord('field', {id: required});
          }
          requiredArray.pushObject(record);
        });
        var optionalArray = item.get('required');
        entrytype.optional.forEach(function(optional){
          var record = store.getById('field', optional);
          if(!record){
            record = store.createRecord('field', {id: optional});
          }
          optionalArray.pushObject(record);
        });

        
        item.save();
      }
    });
  }
};
