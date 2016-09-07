'use strict';
var chalk = require('chalk');

//Create a node server instance
var server = require('http').createServer();

//create application
var app = require('./app');
server.on('request', app); //Attach the Express application

//start server

var PORT = process.env.PORT || 1337;
server.listen(PORT, function() {
	console.log(chalk.blue('Server started on port: ', chalk.magenta(PORT)));
});
