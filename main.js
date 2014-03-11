;(function(){
	'use strict';

	var myApp = angular.module('myApp', []);

	myApp.controller('mainCtrl', ['$scope', 'interpreter', function($scope, interpreter){

		$scope.setLang = function(url) {
			interpreter.setLang(url);
		};

		$scope.keyword = interpreter.map;
	}]);

}());



