import Ember from 'ember';

export default Ember.View.extend({
  didInsertElement: function(){
    var controller = this.get('controller');
    controller.triggerAction({
      action:'trySilentDropboxLogin',
      target: controller
    });

    // trigger layout
    Ember.$('#content_panel').position({my: "left top", at:"left bottom", of: Ember.$(".navbar")});
    Ember.$('#content_panel').height(window.innerHeight - Ember.$(".navbar").height());
    Ember.$(window).resize(function(){
      Ember.$('#content_panel').height(window.innerHeight - Ember.$(".navbar").height());
    });
  }
});
