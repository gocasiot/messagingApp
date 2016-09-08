'use strict';

app.factory('Message', ['$http', function ($http) {
	var Message = {};
	Message.send = function (messageData) {
		console.log(messageData);

		return $http.post('//app.yiftee.com/programming_challenge/send', messageData)
		.then(function (response) {

			// Currently getting the following error: "XMLHttpRequest cannot load http://app.yiftee.com/programming_challenge/send. Response for preflight has invalid HTTP status code 404"
			// Error seems to be due to CORS on the server side
			// See: http://stackoverflow.com/questions/30497413/angular-http-delete-cors-error-preflight-request
			// Also: http://stackoverflow.com/questions/12111936/angularjs-performs-an-options-http-request-for-a-cross-origin-resource/20516179#20516179
			return response;
		});
	};

	return Message;
}]);