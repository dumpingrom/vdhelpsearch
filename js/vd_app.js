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
}]);