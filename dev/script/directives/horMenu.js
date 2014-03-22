/**************/
/* horMenu.js */
;(function(){

	'use strict';

	angular.module('inApp')
	.directive('horMenu', ['$timeout', function($timeout){

		var locked = false;

		var link = function(scope, ele, attr){

			scope.onClick = function(){

				if(!locked){
					ele.children().children().addClass('closed');
					locked = true;

					$timeout(function(){
						ele.children().children().removeClass('closed');
						locked = false;
					},300);
				}
			};
		};

		return {
			restrict: 'E',
			scope: {
				horMenuScope: '='
			},
			link: link,
			templateUrl: 'horMenu.html'
		};
	}]);
}());

/* horMenu.js */
/**************/
