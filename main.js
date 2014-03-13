;(function(){
	'use strict';

	var myApp = angular.module('myApp', []);

	myApp.controller('mainCtrl', ['$scope', 'interpreter', function($scope, interpreter){

		$scope.setLang = function(url) {
			interpreter.setLang(url);
		};

		var currentActiveMenu,
			setActiveMenu = function(menu){

				if(currentActiveMenu !== undefined){
					currentActiveMenu.class = '';
				}
				currentActiveMenu = menu;
				menu.class = "pure-menu-selected";

				//	set view active
				$scope.activeView = menu.view;
			};

		$scope.mainMenu = [
			{
				text: 'Set language',
				view: 'setLanguage',
				click: setActiveMenu,
				class: ''
			},
			{
				text: 'Sample language files',
				view: 'sampleLanguageFiles',
				click: setActiveMenu,
				class: ''
			},
			{
				text: 'Add a new language',
				view: 'addNewLanguage',
				click: setActiveMenu,
				class: ''
			},
		]

		$scope.keyword = interpreter.map;

		$scope.splash = true;
		$scope.mainMenuClass = 'closed';

		$scope.tryIt = function(){
		
			$scope.mainMenuClass = '';
			$scope.splash = false;
		};
	}]);

}());



