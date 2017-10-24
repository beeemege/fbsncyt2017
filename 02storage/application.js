var app = angular.module('MyApp', ['firebase', 'angular-file-input']);

app.controller('MyController', function($scope, $window, $firebaseArray, $firebaseAuth, $firebaseObject, $firebaseStorage){
	
	$scope.fileModel = {};

	$scope.cargarArchivo = function(){
		var fileName = $scope.file.name;
		var stReference = firebase.storage().ref('archivos').child(fileName);
		var storage = $firebaseStorage(stReference);
		var metadata = { contentType: $scope.file.type };
		var uploadTask = storage.$put($scope.file, metadata);

		uploadTask.$error(function(error){
			console.log(error);
		});

		uploadTask.$complete(function(snapshot){
			$scope.fileModel.downloadURL = snapshot.downloadURL;
		});

		uploadTask.$progress(function(snapshot){
			var p = (snapshot.bytesTransferred / snapshot.totalBytes)*100;
			console.log(p + "%");
		});

	}

	$scope.borrar = function(){
		var stReference = firebase.storage().ref($scope.fileModel.directorio).child($scope.fileModel.archivo);
		var storage = $firebaseStorage(stReference);

		storage.$delete().then(function(){
			console.log('successfully deleted!');
		});
	}

	$scope.dameUrl = function(){
		var stReference = firebase.storage().ref($scope.fileModel.directorio).child($scope.fileModel.archivo);
		var storage = $firebaseStorage(stReference);

		storage.$getDownloadURL().then(function(url){
			$scope.fileModel.downloadURL = url;
		});
	}

	$scope.dameMetadata = function(){
		var stReference = firebase.storage().ref($scope.fileModel.directorio).child($scope.fileModel.archivo);
		var storage = $firebaseStorage(stReference);

		storage.$getMetadata().then(function(metadata){
			$scope.fileModel.metadata = metadata;
		});
	}

});
