eval("//# sourceURL=vendor/ember-cli/loader.js");

;eval("define(\"fire-ref/adapters/application\", \n  [\"ember-data\",\"exports\"],\n  function(__dependency1__, __exports__) {\n    \"use strict\";\n    /* global Ember */\n    var DS = __dependency1__[\"default\"];\n\n    //export default DS.RESTAdapter.extend({\n    //});\n\n    __exports__[\"default\"] = DS.Adapter.extend({\n      find: function(store, type, id) {\n        var client = Ember.Application.client;\n        console.log(\"Adapter\", store, type);\n\n        if(type.contains(\':user:\')){\n          return client.getAccountInfo({},function(error, account){\n            var dets = account.json();\n            dets.id = account.uid;\n            return dets;\n          });\n        }\n      },\n      findAll:  function(store, type) {\n        var client = Ember.Application.client;\n        console.log(\"Adapter\");\n        if(type.toString().indexOf(\':user:\')>=0){\n          return client.getAccountInfo({},function(error, account){\n            var dets = account.json();\n            dets.id = account.uid;\n            console.log(dets);\n            return dets;\n          });\n        }\n\n        if(type.toString().indexOf(\':user:\')){\n          return new Ember.RSVP.Promise(function(resolve,reject){\n            client.readdir(\"/\", function(error, entries) {\n              if (error) {\n                console.log(error);  // Something went wrong.\n                reject(error);\n              }\n              console.log(\"Your Dropbox contains \" + entries.join(\", \"));\n              var files = {refs: []};\n              entries.forEach(function(file){\n                files.refs.push({id: file});\n              });\n              console.log(files);\n              resolve(files);\n            });\n          });\n        }\n      }\n    });\n  });//# sourceURL=fire-ref/adapters/application.js");

;eval("define(\"fire-ref/app\", \n  [\"ember\",\"ember/resolver\",\"ember/load-initializers\",\"fire-ref/config/environment\",\"exports\"],\n  function(__dependency1__, __dependency2__, __dependency3__, __dependency4__, __exports__) {\n    \"use strict\";\n    var Ember = __dependency1__[\"default\"];\n    var Resolver = __dependency2__[\"default\"];\n    var loadInitializers = __dependency3__[\"default\"];\n    var config = __dependency4__[\"default\"];\n\n    Ember.MODEL_FACTORY_INJECTIONS = true;\n\n    var App = Ember.Application.extend({\n      modulePrefix: config.modulePrefix,\n      podModulePrefix: config.podModulePrefix,\n      Resolver: Resolver\n    });\n\n    loadInitializers(App, config.modulePrefix);\n\n    __exports__[\"default\"] = App;\n  });//# sourceURL=fire-ref/app.js");

;eval("define(\"fire-ref/controllers/application\", \n  [\"ember\",\"exports\"],\n  function(__dependency1__, __exports__) {\n    \"use strict\";\n    var Ember = __dependency1__[\"default\"];\n\n    \r\n    __exports__[\"default\"] = Ember.Controller.extend({\r\n    	currentUser: null,\r\n    	loggedin: false,\r\n    \r\n    	actions: {\r\n    		dropbox_login: function(){\r\n    			var controller = this;\r\n    			Ember.Application.client.authenticate(function(error, client) {\r\n    			  if (error) {\r\n    			    // Replace with a call to your own error-handling code.\r\n    			    //\r\n    			    // Don\'t forget to return from the callback, so you don\'t execute the code\r\n    			    // that assumes everything went well.\r\n    			    return alert(error);\r\n    			  }\r\n    \r\n    			  // Replace with a call to your own application code.\r\n    			  //\r\n    			  // The user authorized your app, and everything went well.\r\n    			  // client is a Dropbox.Client instance that you can use to make API calls.\r\n    			  controller.set(\'loggedin\', true);\r\n    			  client.getAccountInfo({},function(err, account){\r\n    			  	if(!err)\r\n    			  	{\r\n    			  		account.id = account.uid;\r\n    			  		controller.set(\'currentUser\', account.id);\r\n    					controller.get(\'store\').createRecord(\'user\', account);\r\n    		  		}\r\n    			  });\r\n    			});\r\n    		}\r\n    	}\r\n    });\n  });//# sourceURL=fire-ref/controllers/application.js");

;eval("define(\"fire-ref/initializers/dropbox\", \n  [\"exports\"],\n  function(__exports__) {\n    \"use strict\";\n    /* global Ember, Dropbox */\n\n    __exports__[\"default\"] = {\n      name: \'dropbox\',\n      after: \'store\',\n\n      initialize: function(/* container, app */) {\n        //var controller = container.lookup(\'controller:application\');\n\n        var client = Ember.Application.client = new Dropbox.Client({ key: \"dfzpvdfyqakmnfi\" });\n        client.authDriver(new Dropbox.AuthDriver.Popup({\n          receiverUrl: \"http://localhost:4200/oauth_receiver.html\",\n          rememberUser: true\n        }));\n\n        //alert(client.isAuthenticated());\n        //controller.set(\'loggedin\', client.isAuthenticated());\n        // app.register(\'route\', \'foo\', \'service:foo\');\n      }\n    };\n  });//# sourceURL=fire-ref/initializers/dropbox.js");

;eval("define(\"fire-ref/initializers/export-application-global\", \n  [\"ember\",\"fire-ref/config/environment\",\"exports\"],\n  function(__dependency1__, __dependency2__, __exports__) {\n    \"use strict\";\n    var Ember = __dependency1__[\"default\"];\n    var config = __dependency2__[\"default\"];\n\n    function initialize(container, application) {\n      var classifiedName = Ember.String.classify(config.modulePrefix);\n\n      if (config.exportApplicationGlobal) {\n        window[classifiedName] = application;\n      }\n    };\n    __exports__.initialize = initialize;\n    __exports__[\"default\"] = {\n      name: \'export-application-global\',\n\n      initialize: initialize\n    };\n  });//# sourceURL=fire-ref/initializers/export-application-global.js");

;eval("define(\"fire-ref/models/ref\", \n  [\"ember-data\",\"exports\"],\n  function(__dependency1__, __exports__) {\n    \"use strict\";\n    var DS = __dependency1__[\"default\"];\n\n    var ref = DS.Model.extend({\n      title: DS.attr(),\n      year: DS.attr(),\n      author: DS.attr(),\n\n    });\n\n    ref.reopenClass({\n      FIXTURES: [\n        {\n          id: 1,\n          title:\"Something important\",\n          year: \"2010\",\n          author:\"Weston Renoud\",\n        },\n        {\n          id: 2,\n          title:\"Less important\",\n          year: \"2009\",\n          author:\"W Renoud\",\n        }\n      ]\n    });\n\n    __exports__[\"default\"] = ref;\n  });//# sourceURL=fire-ref/models/ref.js");

;eval("define(\"fire-ref/models/user\", \n  [\"ember-data\",\"exports\"],\n  function(__dependency1__, __exports__) {\n    \"use strict\";\n    var DS = __dependency1__[\"default\"];\n\n    __exports__[\"default\"] = DS.Model.extend({\n    	countryCode: DS.attr(),\n    	email: DS.attr(),\n    	name: DS.attr(),\n    	privateBytes: DS.attr(),\n    	publicAppUrl: DS.attr(),\n    	quota: DS.attr(),\n    	referralUrl: DS.attr(),\n    	sharedBytes: DS.attr(),\n    	uid: DS.attr(),\n    	usedQuota: DS.attr()\n    });\n  });//# sourceURL=fire-ref/models/user.js");

;eval("define(\"fire-ref/router\", \n  [\"ember\",\"fire-ref/config/environment\",\"exports\"],\n  function(__dependency1__, __dependency2__, __exports__) {\n    \"use strict\";\n    var Ember = __dependency1__[\"default\"];\n\n    var config = __dependency2__[\"default\"];\n\n    \r\n    var Router = Ember.Router.extend({\r\n      location: config.locationType\r\n    });\r\n    \r\n    Router.map(function() {\r\n      this.resource(\'refs\');\r\n      this.resource(\'ref\', {path: \'/refs/:id\'});\r\n      this.resource(\'user\');\r\n    });\r\n    \r\n    __exports__[\"default\"] = Router;\n  });//# sourceURL=fire-ref/router.js");

;eval("define(\"fire-ref/routes/refs\", \n  [\"ember\",\"exports\"],\n  function(__dependency1__, __exports__) {\n    \"use strict\";\n    var Ember = __dependency1__[\"default\"];\n\n    __exports__[\"default\"] = Ember.Route.extend({\n    	model: function(){\n    		if(!this.container.lookup(\'controller:application\').get(\'loggedin\'))\n    			this.transitionTo(\'/\');\n    		return this.store.find(\'ref\');\n    	}\n    });\n  });//# sourceURL=fire-ref/routes/refs.js");

;eval("define(\"fire-ref/routes/user\", \n  [\"ember\",\"exports\"],\n  function(__dependency1__, __exports__) {\n    \"use strict\";\n    var Ember = __dependency1__[\"default\"];\n\n    __exports__[\"default\"] = Ember.Route.extend({\n    	model: function(){\n    		if(!this.container.lookup(\'controller:application\').get(\'loggedin\'))\n    			this.transitionTo(\'/\');\n    		return this.store.find(\'user\', this.container.lookup(\'controller:application\').get(\'currentUser\'));\n    	}\n    });\n  });//# sourceURL=fire-ref/routes/user.js");

;eval("define(\"fire-ref/templates/application\", \n  [\"ember\",\"exports\"],\n  function(__dependency1__, __exports__) {\n    \"use strict\";\n    var Ember = __dependency1__[\"default\"];\n    __exports__[\"default\"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {\n    this.compilerInfo = [4,\'>= 1.0.0\'];\n    helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};\n      var buffer = \'\', stack1, helper, options, escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;\n\n    function program1(depth0,data) {\n      \n      \n      data.buffer.push(\"<span class=\\\"glyphicon glyphicon-fire\\\"></span> FireRef\");\n      }\n\n    function program3(depth0,data) {\n      \n      \n      data.buffer.push(\"References\");\n      }\n\n    function program5(depth0,data) {\n      \n      \n      data.buffer.push(\"User\");\n      }\n\n    function program7(depth0,data) {\n      \n      var buffer = \'\', stack1;\n      data.buffer.push(\"\\r\\nHi \");\n      stack1 = helpers._triageMustache.call(depth0, \"currentUser.display_name\", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:[\"ID\"],data:data});\n      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }\n      data.buffer.push(\"\\r\\n\");\n      return buffer;\n      }\n\n    function program9(depth0,data) {\n      \n      var buffer = \'\';\n      data.buffer.push(\"\\r\\n<button \");\n      data.buffer.push(escapeExpression(helpers.action.call(depth0, \"dropbox_login\", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:[\"STRING\"],data:data})));\n      data.buffer.push(\">Dropbox Login</button>\\r\\n\");\n      return buffer;\n      }\n\n      data.buffer.push(\"<nav class=\\\"navbar navbar-default\\\" role=\\\"navigation\\\">\\r\\n  <div class=\\\"container-fluid\\\">\\r\\n    <!-- Brand and toggle get grouped for better mobile display -->\\r\\n    <div class=\\\"navbar-header\\\">\\r\\n      <button type=\\\"button\\\" class=\\\"navbar-toggle\\\" data-toggle=\\\"collapse\\\" data-target=\\\"#bs-example-navbar-collapse-1\\\">\\r\\n        <span class=\\\"sr-only\\\">Toggle navigation</span>\\r\\n        <span class=\\\"icon-bar\\\"></span>\\r\\n        <span class=\\\"icon-bar\\\"></span>\\r\\n        <span class=\\\"icon-bar\\\"></span>\\r\\n      </button>\\r\\n      \");\n      stack1 = (helper = helpers[\'link-to\'] || (depth0 && depth0[\'link-to\']),options={hash:{\n        \'class\': (\"navbar-brand\")\n      },hashTypes:{\'class\': \"STRING\"},hashContexts:{\'class\': depth0},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:[\"STRING\"],data:data},helper ? helper.call(depth0, \"index\", options) : helperMissing.call(depth0, \"link-to\", \"index\", options));\n      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }\n      data.buffer.push(\"\\r\\n    </div>\\r\\n\\r\\n    <!-- Collect the nav links, forms, and other content for toggling -->\\r\\n    <div class=\\\"collapse navbar-collapse\\\" id=\\\"bs-example-navbar-collapse-1\\\">\\r\\n      <ul class=\\\"nav navbar-nav\\\">\\r\\n        <li>\\r\\n      		\");\n      stack1 = (helper = helpers[\'link-to\'] || (depth0 && depth0[\'link-to\']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:[\"STRING\"],data:data},helper ? helper.call(depth0, \"refs\", options) : helperMissing.call(depth0, \"link-to\", \"refs\", options));\n      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }\n      data.buffer.push(\"\\r\\n      	</li>\\r\\n        <li><a href=\\\"#\\\">Link</a></li>\\r\\n        <li>\");\n      stack1 = (helper = helpers[\'link-to\'] || (depth0 && depth0[\'link-to\']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0],types:[\"STRING\"],data:data},helper ? helper.call(depth0, \"user\", options) : helperMissing.call(depth0, \"link-to\", \"user\", options));\n      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }\n      data.buffer.push(\"</li>\\r\\n        <li><button \");\n      data.buffer.push(escapeExpression(helpers.action.call(depth0, \"dropbox_login\", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:[\"STRING\"],data:data})));\n      data.buffer.push(\">Dropbox Login</button></li>\\r\\n      </ul>\\r\\n    </div><!-- /.navbar-collapse -->\\r\\n  </div><!-- /.container-fluid -->\\r\\n</nav>\\r\\n\\r\\n\\r\\n\");\n      stack1 = helpers[\'if\'].call(depth0, \"loggedin\", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(9, program9, data),fn:self.program(7, program7, data),contexts:[depth0],types:[\"ID\"],data:data});\n      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }\n      data.buffer.push(\"\\r\\n\\r\\n\");\n      stack1 = helpers._triageMustache.call(depth0, \"outlet\", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:[\"ID\"],data:data});\n      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }\n      return buffer;\n      \n    });\n  });//# sourceURL=fire-ref/templates/application.js");

;eval("define(\"fire-ref/templates/index\", \n  [\"ember\",\"exports\"],\n  function(__dependency1__, __exports__) {\n    \"use strict\";\n    var Ember = __dependency1__[\"default\"];\n    __exports__[\"default\"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {\n    this.compilerInfo = [4,\'>= 1.0.0\'];\n    helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};\n      \n\n\n      data.buffer.push(\"Welcome to FireRef\\n\\n\");\n      \n    });\n  });//# sourceURL=fire-ref/templates/index.js");

;eval("define(\"fire-ref/templates/refs\", \n  [\"ember\",\"exports\"],\n  function(__dependency1__, __exports__) {\n    \"use strict\";\n    var Ember = __dependency1__[\"default\"];\n    __exports__[\"default\"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {\n    this.compilerInfo = [4,\'>= 1.0.0\'];\n    helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};\n      var buffer = \'\', stack1, self=this;\n\n    function program1(depth0,data) {\n      \n      var buffer = \'\', stack1;\n      data.buffer.push(\"\\n		<tr>\\n			<td>\");\n      stack1 = helpers._triageMustache.call(depth0, \"author\", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:[\"ID\"],data:data});\n      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }\n      data.buffer.push(\"</td>\\n			<td>\");\n      stack1 = helpers._triageMustache.call(depth0, \"year\", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:[\"ID\"],data:data});\n      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }\n      data.buffer.push(\"</td>\\n			<td>\");\n      stack1 = helpers._triageMustache.call(depth0, \"title\", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:[\"ID\"],data:data});\n      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }\n      data.buffer.push(\"</td>\\n		</tr>\\n	\");\n      return buffer;\n      }\n\n      stack1 = helpers._triageMustache.call(depth0, \"model\", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:[\"ID\"],data:data});\n      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }\n      data.buffer.push(\"\\n<table class=\\\"table\\\">\\n	<thead>\\n		<tr>\\n			<th>Author(s)</th>\\n			<th>Year</th>\\n			<th>Title</th>\\n		</tr>\\n	</thead>\\n	<tbody>\\n	\");\n      stack1 = helpers.each.call(depth0, {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[],types:[],data:data});\n      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }\n      data.buffer.push(\"\\n	</tbody>\\n</table>\\n\");\n      return buffer;\n      \n    });\n  });//# sourceURL=fire-ref/templates/refs.js");

;eval("define(\"fire-ref/templates/user\", \n  [\"ember\",\"exports\"],\n  function(__dependency1__, __exports__) {\n    \"use strict\";\n    var Ember = __dependency1__[\"default\"];\n    __exports__[\"default\"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {\n    this.compilerInfo = [4,\'>= 1.0.0\'];\n    helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};\n      var buffer = \'\', stack1;\n\n\n      stack1 = helpers._triageMustache.call(depth0, \"model\", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:[\"ID\"],data:data});\n      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }\n      data.buffer.push(\"\\r\\n<li>uid: \");\n      stack1 = helpers._triageMustache.call(depth0, \"uid\", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:[\"ID\"],data:data});\n      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }\n      data.buffer.push(\"</li>\\r\\n<li>countryCode: \");\n      stack1 = helpers._triageMustache.call(depth0, \"countryCode\", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:[\"ID\"],data:data});\n      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }\n      data.buffer.push(\"</li>\\r\\n<li>email: \");\n      stack1 = helpers._triageMustache.call(depth0, \"email\", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:[\"ID\"],data:data});\n      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }\n      data.buffer.push(\"</li>\\r\\n<li>name: \");\n      stack1 = helpers._triageMustache.call(depth0, \"name\", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:[\"ID\"],data:data});\n      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }\n      data.buffer.push(\"</li>\\r\\n<li>privateBytes: \");\n      stack1 = helpers._triageMustache.call(depth0, \"privateBytes\", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:[\"ID\"],data:data});\n      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }\n      data.buffer.push(\"</li>\\r\\n<li>publicAppUrl: \");\n      stack1 = helpers._triageMustache.call(depth0, \"publicAppUrl\", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:[\"ID\"],data:data});\n      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }\n      data.buffer.push(\"</li>\\r\\n<li>quota: \");\n      stack1 = helpers._triageMustache.call(depth0, \"quota\", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:[\"ID\"],data:data});\n      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }\n      data.buffer.push(\"</li>\\r\\n<li>referralUrl: \");\n      stack1 = helpers._triageMustache.call(depth0, \"referralUrl\", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:[\"ID\"],data:data});\n      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }\n      data.buffer.push(\"</li>\\r\\n<li>sharedBytes: \");\n      stack1 = helpers._triageMustache.call(depth0, \"sharedBytes\", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:[\"ID\"],data:data});\n      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }\n      data.buffer.push(\"</li>\\r\\n<li>usedQuota: \");\n      stack1 = helpers._triageMustache.call(depth0, \"usedQuota\", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:[\"ID\"],data:data});\n      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }\n      data.buffer.push(\"</li>\");\n      return buffer;\n      \n    });\n  });//# sourceURL=fire-ref/templates/user.js");

;eval("define(\"fire-ref/tests/adapters/application.jshint\", \n  [],\n  function() {\n    \"use strict\";\n    module(\'JSHint - adapters\');\n    test(\'adapters/application.js should pass jshint\', function() { \n      ok(false, \'adapters/application.js should pass jshint.\\nadapters/application.js: line 8, col 31, \\\'id\\\' is defined but never used.\\n\\n1 error\'); \n    });\n  });//# sourceURL=fire-ref/tests/adapters/application.jshint.js");

;eval("define(\"fire-ref/tests/app.jshint\", \n  [],\n  function() {\n    \"use strict\";\n    module(\'JSHint - .\');\n    test(\'app.js should pass jshint\', function() { \n      ok(true, \'app.js should pass jshint.\'); \n    });\n  });//# sourceURL=fire-ref/tests/app.jshint.js");

;eval("define(\"fire-ref/tests/controllers/application.jshint\", \n  [],\n  function() {\n    \"use strict\";\n    module(\'JSHint - controllers\');\n    test(\'controllers/application.js should pass jshint\', function() { \n      ok(true, \'controllers/application.js should pass jshint.\'); \n    });\n  });//# sourceURL=fire-ref/tests/controllers/application.jshint.js");

;eval("define(\"fire-ref/tests/fire-ref/tests/helpers/resolver.jshint\", \n  [],\n  function() {\n    \"use strict\";\n    module(\'JSHint - fire-ref/tests/helpers\');\n    test(\'fire-ref/tests/helpers/resolver.js should pass jshint\', function() { \n      ok(true, \'fire-ref/tests/helpers/resolver.js should pass jshint.\'); \n    });\n  });//# sourceURL=fire-ref/tests/fire-ref/tests/helpers/resolver.jshint.js");

;eval("define(\"fire-ref/tests/fire-ref/tests/helpers/start-app.jshint\", \n  [],\n  function() {\n    \"use strict\";\n    module(\'JSHint - fire-ref/tests/helpers\');\n    test(\'fire-ref/tests/helpers/start-app.js should pass jshint\', function() { \n      ok(true, \'fire-ref/tests/helpers/start-app.js should pass jshint.\'); \n    });\n  });//# sourceURL=fire-ref/tests/fire-ref/tests/helpers/start-app.jshint.js");

;eval("define(\"fire-ref/tests/fire-ref/tests/test-helper.jshint\", \n  [],\n  function() {\n    \"use strict\";\n    module(\'JSHint - fire-ref/tests\');\n    test(\'fire-ref/tests/test-helper.js should pass jshint\', function() { \n      ok(true, \'fire-ref/tests/test-helper.js should pass jshint.\'); \n    });\n  });//# sourceURL=fire-ref/tests/fire-ref/tests/test-helper.jshint.js");

;eval("define(\"fire-ref/tests/fire-ref/tests/unit/controllers/application-test.jshint\", \n  [],\n  function() {\n    \"use strict\";\n    module(\'JSHint - fire-ref/tests/unit/controllers\');\n    test(\'fire-ref/tests/unit/controllers/application-test.js should pass jshint\', function() { \n      ok(true, \'fire-ref/tests/unit/controllers/application-test.js should pass jshint.\'); \n    });\n  });//# sourceURL=fire-ref/tests/fire-ref/tests/unit/controllers/application-test.jshint.js");

;eval("define(\"fire-ref/tests/fire-ref/tests/unit/models/ref-test.jshint\", \n  [],\n  function() {\n    \"use strict\";\n    module(\'JSHint - fire-ref/tests/unit/models\');\n    test(\'fire-ref/tests/unit/models/ref-test.js should pass jshint\', function() { \n      ok(true, \'fire-ref/tests/unit/models/ref-test.js should pass jshint.\'); \n    });\n  });//# sourceURL=fire-ref/tests/fire-ref/tests/unit/models/ref-test.jshint.js");

;eval("define(\"fire-ref/tests/fire-ref/tests/unit/models/user-test.jshint\", \n  [],\n  function() {\n    \"use strict\";\n    module(\'JSHint - fire-ref/tests/unit/models\');\n    test(\'fire-ref/tests/unit/models/user-test.js should pass jshint\', function() { \n      ok(true, \'fire-ref/tests/unit/models/user-test.js should pass jshint.\'); \n    });\n  });//# sourceURL=fire-ref/tests/fire-ref/tests/unit/models/user-test.jshint.js");

;eval("define(\"fire-ref/tests/fire-ref/tests/unit/routes/refs-test.jshint\", \n  [],\n  function() {\n    \"use strict\";\n    module(\'JSHint - fire-ref/tests/unit/routes\');\n    test(\'fire-ref/tests/unit/routes/refs-test.js should pass jshint\', function() { \n      ok(true, \'fire-ref/tests/unit/routes/refs-test.js should pass jshint.\'); \n    });\n  });//# sourceURL=fire-ref/tests/fire-ref/tests/unit/routes/refs-test.jshint.js");

;eval("define(\"fire-ref/tests/fire-ref/tests/unit/routes/user-test.jshint\", \n  [],\n  function() {\n    \"use strict\";\n    module(\'JSHint - fire-ref/tests/unit/routes\');\n    test(\'fire-ref/tests/unit/routes/user-test.js should pass jshint\', function() { \n      ok(true, \'fire-ref/tests/unit/routes/user-test.js should pass jshint.\'); \n    });\n  });//# sourceURL=fire-ref/tests/fire-ref/tests/unit/routes/user-test.jshint.js");

;eval("define(\"fire-ref/tests/helpers/resolver\", \n  [\"ember/resolver\",\"fire-ref/config/environment\",\"exports\"],\n  function(__dependency1__, __dependency2__, __exports__) {\n    \"use strict\";\n    var Resolver = __dependency1__[\"default\"];\n    var config = __dependency2__[\"default\"];\n\n    var resolver = Resolver.create();\n\n    resolver.namespace = {\n      modulePrefix: config.modulePrefix,\n      podModulePrefix: config.podModulePrefix\n    };\n\n    __exports__[\"default\"] = resolver;\n  });//# sourceURL=fire-ref/tests/helpers/resolver.js");

;eval("define(\"fire-ref/tests/helpers/start-app\", \n  [\"ember\",\"fire-ref/app\",\"fire-ref/router\",\"fire-ref/config/environment\",\"exports\"],\n  function(__dependency1__, __dependency2__, __dependency3__, __dependency4__, __exports__) {\n    \"use strict\";\n    var Ember = __dependency1__[\"default\"];\n    var Application = __dependency2__[\"default\"];\n    var Router = __dependency3__[\"default\"];\n    var config = __dependency4__[\"default\"];\n\n    __exports__[\"default\"] = function startApp(attrs) {\n      var App;\n\n      var attributes = Ember.merge({}, config.APP);\n      attributes = Ember.merge(attributes, attrs); // use defaults, but you can override;\n\n      Router.reopen({\n        location: \'none\'\n      });\n\n      Ember.run(function() {\n        App = Application.create(attributes);\n        App.setupForTesting();\n        App.injectTestHelpers();\n      });\n\n      App.reset(); // this shouldn\'t be needed, i want to be able to \"start an app at a specific URL\"\n\n      return App;\n    }\n  });//# sourceURL=fire-ref/tests/helpers/start-app.js");

;eval("define(\"fire-ref/tests/initializers/dropbox.jshint\", \n  [],\n  function() {\n    \"use strict\";\n    module(\'JSHint - initializers\');\n    test(\'initializers/dropbox.js should pass jshint\', function() { \n      ok(true, \'initializers/dropbox.js should pass jshint.\'); \n    });\n  });//# sourceURL=fire-ref/tests/initializers/dropbox.jshint.js");

;eval("define(\"fire-ref/tests/models/ref.jshint\", \n  [],\n  function() {\n    \"use strict\";\n    module(\'JSHint - models\');\n    test(\'models/ref.js should pass jshint\', function() { \n      ok(true, \'models/ref.js should pass jshint.\'); \n    });\n  });//# sourceURL=fire-ref/tests/models/ref.jshint.js");

;eval("define(\"fire-ref/tests/models/user.jshint\", \n  [],\n  function() {\n    \"use strict\";\n    module(\'JSHint - models\');\n    test(\'models/user.js should pass jshint\', function() { \n      ok(true, \'models/user.js should pass jshint.\'); \n    });\n  });//# sourceURL=fire-ref/tests/models/user.jshint.js");

;eval("define(\"fire-ref/tests/router.jshint\", \n  [],\n  function() {\n    \"use strict\";\n    module(\'JSHint - .\');\n    test(\'router.js should pass jshint\', function() { \n      ok(true, \'router.js should pass jshint.\'); \n    });\n  });//# sourceURL=fire-ref/tests/router.jshint.js");

;eval("define(\"fire-ref/tests/routes/refs.jshint\", \n  [],\n  function() {\n    \"use strict\";\n    module(\'JSHint - routes\');\n    test(\'routes/refs.js should pass jshint\', function() { \n      ok(false, \'routes/refs.js should pass jshint.\\nroutes/refs.js: line 6, col 13, Expected \\\'{\\\' and instead saw \\\'this\\\'.\\n\\n1 error\'); \n    });\n  });//# sourceURL=fire-ref/tests/routes/refs.jshint.js");

;eval("define(\"fire-ref/tests/routes/user.jshint\", \n  [],\n  function() {\n    \"use strict\";\n    module(\'JSHint - routes\');\n    test(\'routes/user.js should pass jshint\', function() { \n      ok(false, \'routes/user.js should pass jshint.\\nroutes/user.js: line 6, col 13, Expected \\\'{\\\' and instead saw \\\'this\\\'.\\n\\n1 error\'); \n    });\n  });//# sourceURL=fire-ref/tests/routes/user.jshint.js");

;eval("define(\"fire-ref/tests/test-helper\", \n  [\"fire-ref/tests/helpers/resolver\",\"ember-qunit\"],\n  function(__dependency1__, __dependency2__) {\n    \"use strict\";\n    var resolver = __dependency1__[\"default\"];\n    var setResolver = __dependency2__.setResolver;\n\n    setResolver(resolver);\n\n    document.write(\'<div id=\"ember-testing-container\"><div id=\"ember-testing\"></div></div>\');\n\n    QUnit.config.urlConfig.push({ id: \'nocontainer\', label: \'Hide container\'});\n    var containerVisibility = QUnit.urlParams.nocontainer ? \'hidden\' : \'visible\';\n    document.getElementById(\'ember-testing-container\').style.visibility = containerVisibility;\n  });//# sourceURL=fire-ref/tests/test-helper.js");

;eval("define(\"fire-ref/tests/unit/controllers/application-test\", \n  [\"ember-qunit\"],\n  function(__dependency1__) {\n    \"use strict\";\n    var test = __dependency1__.test;\n    var moduleFor = __dependency1__.moduleFor;\n\n    moduleFor(\'controller:application\', \'ApplicationController\', {\n      // Specify the other units that are required for this test.\n      // needs: [\'controller:foo\']\n    });\n\n    // Replace this with your real tests.\n    test(\'it exists\', function() {\n      var controller = this.subject();\n      ok(controller);\n    });\n  });//# sourceURL=fire-ref/tests/unit/controllers/application-test.js");

;eval("define(\"fire-ref/tests/unit/models/ref-test\", \n  [\"ember-qunit\"],\n  function(__dependency1__) {\n    \"use strict\";\n    var test = __dependency1__.test;\n    var moduleForModel = __dependency1__.moduleForModel;\n\n    moduleForModel(\'ref\', \'Ref\', {\n      // Specify the other units that are required for this test.\n      needs: []\n    });\n\n    test(\'it exists\', function() {\n      var model = this.subject();\n      // var store = this.store();\n      ok(model);\n    });\n  });//# sourceURL=fire-ref/tests/unit/models/ref-test.js");

;eval("define(\"fire-ref/tests/unit/models/user-test\", \n  [\"ember-qunit\"],\n  function(__dependency1__) {\n    \"use strict\";\n    var test = __dependency1__.test;\n    var moduleForModel = __dependency1__.moduleForModel;\n\n    moduleForModel(\'user\', \'User\', {\n      // Specify the other units that are required for this test.\n      needs: []\n    });\n\n    test(\'it exists\', function() {\n      var model = this.subject();\n      // var store = this.store();\n      ok(model);\n    });\n  });//# sourceURL=fire-ref/tests/unit/models/user-test.js");

;eval("define(\"fire-ref/tests/unit/routes/refs-test\", \n  [\"ember-qunit\"],\n  function(__dependency1__) {\n    \"use strict\";\n    var test = __dependency1__.test;\n    var moduleFor = __dependency1__.moduleFor;\n\n    moduleFor(\'route:refs\', \'RefsRoute\', {\n      // Specify the other units that are required for this test.\n      // needs: [\'controller:foo\']\n    });\n\n    test(\'it exists\', function() {\n      var route = this.subject();\n      ok(route);\n    });\n  });//# sourceURL=fire-ref/tests/unit/routes/refs-test.js");

;eval("define(\"fire-ref/tests/unit/routes/user-test\", \n  [\"ember-qunit\"],\n  function(__dependency1__) {\n    \"use strict\";\n    var test = __dependency1__.test;\n    var moduleFor = __dependency1__.moduleFor;\n\n    moduleFor(\'route:user\', \'UserRoute\', {\n      // Specify the other units that are required for this test.\n      // needs: [\'controller:foo\']\n    });\n\n    test(\'it exists\', function() {\n      var route = this.subject();\n      ok(route);\n    });\n  });//# sourceURL=fire-ref/tests/unit/routes/user-test.js");

/* jshint ignore:start */

define('fire-ref/config/environment', ['ember'], function(Ember) {
  var prefix = 'fire-ref';
/* jshint ignore:start */

try {
  var metaName = prefix + '/config/environment';
  var rawConfig = Ember['default'].$('meta[name="' + metaName + '"]').attr('content');
  var config = JSON.parse(unescape(rawConfig));

  return { 'default': config };
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

/* jshint ignore:end */


});

if (runningTests) {
  require('fire-ref/tests/test-helper');
} else {
  require('fire-ref/app')['default'].create({"LOG_ACTIVE_GENERATION":true,"LOG_VIEW_LOOKUPS":true});
}

/* jshint ignore:end */
