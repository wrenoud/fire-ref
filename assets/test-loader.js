var moduleName,shouldLoad;QUnit.config.urlConfig.push({id:"nojshint",label:"Disable JSHint"});for(moduleName in requirejs.entries)shouldLoad=!1,moduleName.match(/[-_]test$/)&&(shouldLoad=!0),!QUnit.urlParams.nojshint&&moduleName.match(/\.jshint$/)&&(shouldLoad=!0),shouldLoad&&require(moduleName);QUnit.notifications&&QUnit.notifications({icons:{passed:"/assets/passed.png",failed:"/assets/failed.png"}});
