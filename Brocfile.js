/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var app = new EmberApp();

// Use `app.import` to add additional libraries to the generated
// output files.
//
// If you need to use different assets in different
// environments, specify an object as the first parameter. That
// object's keys should be the environment name and the values
// should be the asset to use in that environment.
//
// If the library that you are including contains AMD or ES6
// modules that you would like to import into your application
// please specify an object with the list of modules as keys
// along with the exports of each module as its value.

app.import('bower_components/dropbox-build/dropbox.js');

app.import('bower_components/zotero-bibtex-parse/zotero-bibtex-parse.js');
app.import('bower_components/ember-localstorage-adapter/localstorage_adapter.js');

app.import('bower_components/jquery-ui/jquery-ui.js');
//app.import('bower_components/jquery-ui/themes/smoothness/jquery-ui.css');
app.import('bower_components/jquery-ui/themes/smoothness/jquery-ui.min.css');
app.import('bower_components/jquery-ui/themes/smoothness/theme.css');

var pickFiles = require('broccoli-static-compiler');
jqueryUiImgs = pickFiles('bower_components/jquery-ui/themes/smoothness/images', {
	srcDir: '/',
	destDir: '/assets/images'
})

var mergerTrees = require('broccoli-merge-trees');
merged = mergerTrees([app.toTree(), jqueryUiImgs]);

if (app.env === 'development') {
  module.exports = merged
}else{
  var closure_compiler = require('broccoli-closure-compiler');
  module.exports = closure_compiler(merged, {language_in: 'ECMASCRIPT5'});
}
