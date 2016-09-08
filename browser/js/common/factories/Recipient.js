'use strict';

app.factory('Recipient', ['$http', '$httpParamSerializerJQLike', function ($http, $httpParamSerializerJQLike) {
	var Recipient = {};
	Recipient.add = function (recipientData) {
		var config = {
			headers: {
      			'Content-Type': 'application/x-www-form-urlencoded'
    		}
		};
		return $http.post('//app.yiftee.com/programming_challenge/add', $httpParamSerializerJQLike(recipientData), config)
		.then(function (res) {
			return res.data.response;
		});
	};

	Recipient.find = function (query) {
		return $http.get('//app.yiftee.com/programming_challenge/autocomplete?q=' + query)
		.then(function (res) {
			return res.data.response.contacts;
		});
	};

	return Recipient;
}]);