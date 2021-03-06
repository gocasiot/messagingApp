'use strict';

module.exports = function(app){
	app.setValue = app.set.bind(app);

	app.getValue = function(path) {
		return app.get(path);
	};

	require('./app-variables')(app);
	require('./static-middleware')(app);

	//Logging middleware
	app.use(app.getValue('log'));

};