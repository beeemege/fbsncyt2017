var app = angular.module('MyApp', ['firebase']);

app.controller('MyController', function($scope, $window, $firebaseArray, $firebaseAuth, $firebaseObject, $firebaseStorage){
	
	var auth = $firebaseAuth();
	$scope.authInfo = '';

	$scope.email = ''; $scope.password = '';

	$scope.getInfo = function(){
		$scope.authInfo = auth.$getAuth();
	}

	$scope.cerrar = function(){
		auth.$signOut();
		$scope.authInfo = 'signOut';
	}

	$scope.anonimo = function(){
		auth.$signInAnonymously().then(function(firebaseUser){
			console.log('signInAnonymously');
		}).catch(function(error){
			console.log(error);
		});
	}

	$scope.proveedor = function(provider){
		auth.$signInWithPopup(provider).then(function(firebaseUser){
			$scope.authInfo = firebaseUser;
			console.log(firebaseUser);
			console.log(firebaseUser.user.displayName);
		}).catch(function(error){
			console.log(error);
		});
	}

	$scope.correo = function(){
		auth.$signInWithEmailAndPassword($scope.email, $scope.password)
		.then(function(firebaseUser){
			$scope.authInfo = firebaseUser;
		}).catch(function(error){
			console.log(error);
		});
	}

});
