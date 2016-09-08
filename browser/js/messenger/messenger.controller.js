'use strict';

app.controller('MsgCtrl', ['$scope', 'Recipient', 'Message', function($scope, Recipient, Message) {
	$scope.atLeastOneRecipient = false;
	$scope.recipients = [{
			name: '',
			email: '',
			sms: ''
		}];

	$scope.add = function () {
		Recipient.add({
			name: $scope.recipients[$scope.recipients.length - 1].name,
			email: $scope.recipients[$scope.recipients.length - 1].email,
			sms: $scope.recipients[$scope.recipients.length - 1].sms
		})
		.then(function (response) {
			if(response.success) {
				$scope.atLeastOneRecipient = true;
				$scope.recipients.push({
					name: '',
					email: '',
					sms: ''
				});
			} else {
				alert('Try Again Later');
			}
		});
	};

	$scope.showAddButton = function (idx) {
		return idx === $scope.recipients.length - 1;
	};


	// Finds recipient info. Used for autocomplete
	$scope.findRecipient = function (query) {
		return Recipient.find(query);
	};

	$scope.autoCompleteOtherFields = function (item) {
		$scope.recipients[$scope.recipients.length - 1].email = item.email;
		$scope.recipients[$scope.recipients.length - 1].sms = parseInt(item.phone);
	}

	$scope.showCustomMsg = false;

	var customMsgRecipientIds = [];
	$scope.stateChanged = function (recipientId) {
		var theIndex = customMsgRecipientIds.indexOf(recipientId);
		if(theIndex === -1) {
			customMsgRecipientIds.push(recipientId);
		} else {
			customMsgRecipientIds.splice(theIndex, 1);
		}

		if(customMsgRecipientIds.length) {
			$scope.showCustomMsg = true;
		} else {
			$scope.showCustomMsg = false;
		}
	};

	$scope.sendMessage = function () {

		// Need slice to remove empty recipient entry from array
		var messageRecipients = $scope.recipients.slice(0, -1);

		// Sends custom message to selected users
		if($scope.showCustomMsg) {
			var customMsgRecipients = customMsgRecipientIds.map(function (id) {
				return messageRecipients[id];
			});
			
			var sortedCustomRecipientIds = customMsgRecipientIds.slice().sort(function(a, b) {
				return b - a;
			});

			for(var i = 0; i < sortedCustomRecipientIds.length; i++) {
				messageRecipients.splice(sortedCustomRecipientIds[i], 1);
			}

			Message.send(JSON.stringify({
				message: $scope.customMsg.text,
				recipients: customMsgRecipients
			}));
		}

		// Sends regular message
		Message.send(JSON.stringify({
			message: $scope.message.text,
			recipients: messageRecipients
		}));
	}

	// Message Templates
	// Source: http://quotes.kyledesigns.com/2014/07/07/congratulation-quotes-sayings/
	$scope.templates = [
		"Give the world the best you have, and the best will come to you.", 
		"Congratulations on your achievements.",
		"Congratulations on the first step of many in your path to success.",
		"Enjoy your gift!"
	];

}]);