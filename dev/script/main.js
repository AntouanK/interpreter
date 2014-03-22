;(function(){
	'use strict';

	var escape = document.createElement('textarea');
	function escapeHTML(html) {
		escape.innerHTML = html;
		return escape.innerHTML;
	}

	var inApp = angular.module('inApp', []);

	inApp.controller('mainCtrl',
	['$scope', 'interpreter', '$compile', function($scope, interpreter, $compile){


		interpreter.addLang('en-UK', 'languages/lang.en-UK.json', function(){
			interpreter.setLang('en-UK');
		});
		interpreter.addLang('el-GR', 'languages/lang.el-GR.json');

		$scope.curActiveView = '';
		$scope.splash = true;

		var onClickSelection = function(selection){

				$scope.splash = false;

				onClickSelection = function(selection){

					$scope.curActiveView = selection.nextView;
					// menu.class = "pure-menu-selected";

					$scope.menuScope.menu = eval(selection.nextView.replace(/\/.+/,'')+'Menu');
				};

				onClickSelection(selection);
			},
		    mainMenu = [
				{
					text: 'Try it',
					nextView: 'tryIt/setLang',
					click: onClickSelection,
					class: ''
				},
				{
					text: 'Documentation',
					nextView: 'documentation',
					click: onClickSelection,
					class: ''
				}
			],
		    tryItMenu = [
				{
					text: ' << ',
					nextView: 'main',
					click: onClickSelection,
					class: ''
				},
				{
					text: 'set Languages',
					nextView: 'tryIt/setLang',
					click: onClickSelection,
					class: ''
				},
				{
					text: 'How to use',
					click: onClickSelection,
					nextView: 'tryIt/seeCode',
					class: ''
				}
			],
			documentationMenu = [
				{
					text: ' << ',
					nextView: 'main',
					click: onClickSelection,
					class: ''
				}
			];

		$scope.menuScope = {};
		$scope.menuScope.menu = mainMenu;

		$scope.keyword = interpreter.map;

		$scope.howToCode = {
			textArea: '<div>{{keyword.HELLO}}</div>\n<div>{{keyword.WORLD}}!</div>\n<div>{{keyword.DESCRIPTION}}</div>',
			// viewHtml: '',
			keyword: interpreter.map,
			switchLang: function(code){ interpreter.setLang(code); }
		};

		// $scope.howToCode.viewHtml = $compile($scope.howToCode.textArea)($scope.howToCode);

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

			mainMenu[0].click(mainMenu[0]);
		};
	}]);

}());
