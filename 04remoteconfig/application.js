var app = angular.module('MyApp', ['firebase']);

app.controller('MyController', function($scope, $window, $firebaseArray){

	var dbReference = firebase.database().ref().child('remote-config').child('app');
	var config = { 
		appName: 'La app chidota', 
		foreColor: 'green lighten-4', 
		textColor: 'green-text text-darken-4', 
		title: 'indigo-text text-darken-4' 
	};

	$scope.crear = function(){
		$scope.remoteConfig.$add(config);
	}

	$scope.cargar = function(){
		$scope.remoteConfig = $firebaseArray(dbReference);
	}
	
});
