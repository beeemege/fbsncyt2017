var app = angular.module('MyApp', ['firebase']);

app.controller('MyController', function($scope, $window, $firebaseArray){

	var dbReference = firebase.database().ref();

	// $scope.dataArray = $firebaseArray(dbReference);

	$scope.data = {};

	$scope.add = function(){
		$scope.dataArray.$add($scope.data);

		console.log('successfully created!');
	}

	$scope.select = function(key){
		$scope.data = $scope.dataArray.$getRecord(key);
	}

	$scope.update = function(){
		var key = $scope.data.$id;
		var index = $scope.dataArray.$indexFor(key);

		$scope.dataArray.$save(index)
		.then(function(ref){
			ref.key === $scope.dataArray[index].$id;

			console.log('successfully updated!');
		});
	}

	$scope.remove = function(index){
		$scope.dataArray.$remove($scope.dataArray[index]);

		console.log('successfully deleted!');
	}

	$scope.getKey = function(index){
		var key = $scope.dataArray.$keyAt(index);

		console.log('key: ' + key);
	}

	$scope.getIndex = function(key){
		var index = $scope.dataArray.$indexFor(key);

		console.log('index: ' + index);
	}

	$scope.stop = function(){
		$scope.dataArray.$destroy();

		console.log('stop sync');
	}

	$scope.start = function(){
		$scope.dataArray = $firebaseArray(dbReference);

		console.log('start sync');
	}
	
});
