/*function buildContent(question) {
	$("#container").fadeOut(500, function() {
		var title = document.getElementById('title');
		var content = document.getElementById('content');
		var buttons = document.getElementById('buttons');

		//build title
		title.innerHTML = oracle[question]['title'];

		//build content
		content.innerHTML = oracle[question]['text'];

		//build buttons
		buttons.innerHTML = "";
		for (b in oracle[question]['buttons']) {
			console.log(oracle[question].buttons[b]);
			var node = document.createElement("button");
			node.setAttribute('onclick', 'buildContent('+oracle[question].buttons[b]+')');
			var text = document.createTextNode(oracle[oracle[question].buttons[b]]['title']);
			node.appendChild(text);
			buttons.appendChild(node);
		}
	}).fadeIn(500);
}*/

/**
*  Videodek Help Center Module
*
* Description
*/
var app = angular.module('vdhelpcenter', ['firebase', 'ngMaterial']);

app.config(function($mdThemingProvider) {
	$mdThemingProvider.theme('default')
		.primaryPalette('cyan')
		.accentPalette('light-blue');
});

app.controller('OracleCtrl', ['$scope', '$firebaseArray', function($scope, $firebaseArray){
	var ref = new Firebase("https://blistering-inferno-4503.firebaseio.com/oracle");

	$scope.items = $firebaseArray(ref);

	$scope.loginAsAdmin = function (e, pwd) {
		ref.authWithPassword({
			email		: e,
			password	: pwd
		}, function (error, authData) {
			if (error) {
				console.log("Login failed!", error);
			}
			else {
				console.log("Login successful with payload: ", authData);
			}
		});
	};

	$scope.focus = 0;

	$scope.toggleFocus = function() {
		$scope.focus = -$scope.focus+1;
		console.log($scope.focus);
	}	

	$scope.itemsPerPage = 50;
	$scope.currentPage = 0;



	$scope.prevPage = function() {
		$scope.currentPage--;
	}

	$scope.disablePrevPage = function() {
		return $scope.currentPage === 0 ? "true" : "";
	}

	$scope.pageCount = function() {
		return Math.ceil($scope.items.length/$scope.itemsPerPage)-1;
	}

	$scope.nextPage = function() {
		$scope.currentPage++;
	}

	$scope.disableNextPage = function() {
		return $scope.currentPage === $scope.pageCount() ? "true" : "";
	}

	$scope.getRandomColor = function() {
		var letters = '0123456789ABCDEF'.split('');
		var color ="#";
	    for (var i = 0; i < 6; i++ ) {
	        color += letters[Math.floor(Math.random() * 16)];
	    }
	    var arr = {'background-color':color};
	    return arr;
	}
}]);

app.filter('offset', function() {
  return function(input, start) {
    start = parseInt(start, 10);
    return input.slice(start);
  };
});