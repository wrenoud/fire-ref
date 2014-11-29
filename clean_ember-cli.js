// based loosely on https://gist.github.com/dschmidt/a68747348036fd6aa989
// and the answer http://stackoverflow.com/questions/24782479/how-to-debug-slow-ember-cli-broccoli-builds/26044864#26044864
var glob = require('glob')
  , fs   = require('fs')
  , util = require('util')
  , _    = require('lodash');
 
EMBER_FILES=[
 'ember/ember.js',
 'ember/ember.prod.js',
 'ember-cli-shims/app-shims.js',
 'ember-cli-test-loader/test-loader.js',
 'ember-data/ember-data.js',
 'ember-data/ember-data.prod.js',
 'ember-load-initializers/ember-load-initializers.js',
 'ember-resolver/dist/modules/ember-resolver.js',
 'jquery/dist/jquery.js',
 'loader.js/loader.js',
 'handlebars/handlebars.js',
 'handlebars/handlebars.runtime.js',
 
 'ember-qunit-notifications/passed.png',
 'ember-qunit-notifications/failed.png',
 'ember-qunit/dist/named-amd/main.js',
 'ember-cli-shims/test-shims.js',
 'qunit/qunit/qunit.js',
 'qunit-notifications/index.js',
 'qunit/qunit/qunit.css',
];
 
// load dependancies from Brocfile.js
var imports = new RegExp(/app\.import\(\'bower_components\/(.*?)\'\)\;/ig);
var contents = fs.readFileSync("Brocfile.js", {encoding: 'utf8'});
var match = imports.exec(contents);
while (match != null) {
    //console.log(match[1]);
    EMBER_FILES.push(match[1]);
    match = imports.exec(contents);
}

glob("**", {cwd: "bower_components", dot:true}, function (er, files) {
  files.forEach(function(filename){
  	var filepath = "bower_components/" + filename;
  	fs.stat(filepath, function(err, stats){
  		if(stats && stats.isFile()
        && !_.contains(EMBER_FILES, filename)
        && filename.indexOf("jquery-ui/themes/smoothness/images") !== 0){
  			fs.unlink(filepath, function(err){
  				if(!err){
  					console.log('Deleted', filepath);
  				}
  			});
  		}
  	});
  });
})