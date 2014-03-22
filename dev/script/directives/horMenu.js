/**************/
/* horMenu.js */
;(function(){

	'use strict';

	angular.module('inApp')
	.directive('horMenu', ['$timeout', function($timeout){

		var locked = false,
		    link;

		link = function(scope, ele, attr){

			scope.onMousedown = function(){

				if(!locked){
					ele.children().children().addClass('closed');
					locked = true;

					$timeout(function(){
						ele.children().children().removeClass('closed');
						locked = false;
					},200);
				}
			};

			scope.$watch('scope.horMenuScope.menu', function(){
				//
			});
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
