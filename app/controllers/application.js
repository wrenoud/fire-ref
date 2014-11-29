/* global bibtexParse */
import Ember from 'ember';

export default Ember.Controller.extend(Ember.TargetActionSupport,{
  currentUser: null,
  loggedin: false,
  userName: function(){
    var id = this.get('currentUser');
    var user = this.get('store').getById('user', id);
    if(user){
      return user.get('name');
    }
  }.property('currentUser'),

  actions: {
    dropbox_login: function(){
      var controller = this;
      Ember.Application.client.authenticate(function(error, client) {
        if (error) {
          // Replace with a call to your own error-handling code.
          //
          // Don't forget to return from the callback, so you don't execute the code
          // that assumes everything went well.
          return console.log(error);
        }

        // Replace with a call to your own application code.
        //
        // The user authorized your app, and everything went well.
        // client is a Dropbox.Client instance that you can use to make API calls.
        controller.set('loggedin', true);
        client.getAccountInfo({},function(err, account){
          if(!err)
          {
            account.id = account.uid;
            controller.get('store').createRecord('user', account);
            controller.set('currentUser', account.id);
            controller.triggerAction({
              action:'scan_files',
              target: controller
            });
            controller.transitionTo('refs');
          }
        });
      });
    },
    scan_files: function(){
      var controller = this;
      var client = Ember.Application.client;

      if(this.get('loggedin'))
      {
        client.readdir("/", function(error, entries, folderStat, fileStats) {
          if (error) {
            return showError(error);  // Something went wrong.
          }
          console.log(folderStat);
          console.log(fileStats[0]);
          
          var items = {};
          // group bibtex with files
          fileStats.forEach(function(file){
            if(file.isFile){
              var id = file.name.replace(/\.[^\.]+$/ig,'').replace(/ /g,"_").replace(/[^0-9a-z_]/ig,'');
              if(file.mimeType === "text/x-bibtex"){
                if(id in items){
                  items[id].bib = file;
                }else{
                  items[id] = {bib: file, file: null};
                }
              }else{
                if(id in items){
                  items[id].file = file;
                }else{
                  items[id] = {bib: null, file: file};
                }
              }
            }
          });

          Object.keys(items).forEach(function(id){
            var store = controller.get('store');
            var prev_item = store.getById('ref', id);
            if(prev_item){

            }else{
              if(items[id].bib){
                // have bibtex, need to read it and add to the store...
                client.readFile(items[id].bib.path, function(error, data) {
                  if (error) {
                    return showError(error);  // Something went wrong.
                  }

                  var bibtex = bibtexParse.toJSON(data);
                  var new_item = bibtex[0].entryTags;
                  new_item.type = bibtex[0].entryType;
                  new_item.id = bibtex[0].citationKey;
                  var item = store.createRecord('ref', new_item);
                  item.save();
                });
              }else{
                var item = store.createRecord('ref', {
                  id: id,
                  title: items[id].file.name.replace(/\.[^\.]+$/ig,''),
                  path: items[id].file.path,
                  reviewed: 'false'
                });
                item.save();
              }
            }
          });
        });
      }else{
        console.log('Scan called without authentication');
      }
    }
  }
});
