import DS from 'ember-data';
import config from '../config/environment';

//export default DS.RESTAdapter.extend({
//});

export default DS.LSAdapter.extend({
    namespace: config.APP.LOCALSTORAGE_NS
});

// export default DS.Adapter.extend({
//   find: function(store, type, id) {
//     var client = Ember.Application.client;

//     if(type.contains(':user:')){
//       return client.getAccountInfo({},function(error, account){
//           var dets = account.json();
//           dets.id = account.uid;
//           store.load(type, account.uid, dets);
//           return dets;
//         })
//     }
//   },
//   findAll:  function(store, type) {
//     var client = Ember.Application.client;
//     if(type.toString().indexOf(':user:')>=0){
//       return client.getAccountInfo({},function(error, account){
//           console.log(account.uid);
//           return [account];
//         });
//     }
//   }
// });
