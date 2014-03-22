/*************/
/* editor.js */
;(function(){

	'use strict';

	angular.module('inApp')
	.directive('editor', ['md', function(md){

		var locked = false;

		var link = function(scope, ele, attr){

			if(attr.content !== undefined){
				var content = attr.content,
				    json,
				    lines;

				if(scope.$parent[content] !== undefined){
					content = scope.$parent[content];
				}

				try {
					json = JSON.parse(content);
				} catch(e) {
					throw 'bad JSON';
				}

				content =
				content
				.replace(/^\{/g, '')
				.replace(/}$/g, '');

				lines = content.split(',');

				scope.content =
				'<div class="bracket">{</div>'+
				lines
				.map(function(l){
					return '<div class="line">'+l.replace(/:/g,': ')+'</div>';
				}).join('')+
				'<div class="bracket">}</div>';

				ele.children().children().html(scope.content);
			}
		};

		return {
			restrict: 'E',
			scope: {
				editorScope: '='
			},
			link: link,
			templateUrl: 'editor.html'
		};
	}]);
}());

/* editor.js */
/*************/
