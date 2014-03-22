;(function(){
	'use strict';

	var inApp = angular.module('inApp', ['pasvaz.bindonce']);

	inApp.controller('mainCtrl',
	['$scope', 'interpreter', function($scope, interpreter){

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

		$scope.menuScope = {};
		$scope.menuScope.mainMenu = [
			{
				text: 'Try it',
				view: 'tryIt',
				click: setActiveMenu,
				class: ''
			},
			{
				text: 'Documentation',
				view: 'documentation',
				click: setActiveMenu,
				class: ''
			}
		];

		$scope.keyword = interpreter.map;

		$scope.splash = true;
		$scope.mainMenuClass = 'closed';

		$scope.jsonUk = JSON.stringify({
			"HELLO": "Hello",
			"WORLD": "world",
			"DESCRIPTION": "This is an example"
		});

		$scope.jsonGr = JSON.stringify({
			"HELLO": "Γεια σου",
			"WORLD": "κόσμε",
			"DESCRIPTION": "Αυτο ειναι ενα παραδειγμα"
		});

		$scope.tryIt = function(){

			$scope.mainMenuClass = '';
			$scope.splash = false;
		};
	}]);

}());
