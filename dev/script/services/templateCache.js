/********************/
/* templateCache.js */
;(function() {

	'use strict';

	angular.module('inApp')
	// HACK: we ask for $injector instead of $compile, to avoid circular dep
	.factory('$templateCache',
	['$cacheFactory', '$http', '$injector', function($cacheFactory, $http, $injector) {
		var cache = $cacheFactory('templates'),
		    allTplPromise;

		return {
			get: function(url) {

				var fromCache = cache.get(url);

				// already have required template in the cache
				if (fromCache) {
					return fromCache;
				}

				// first template request ever - get the all tpl file
				if (!allTplPromise) {

					allTplPromise =
					$http.get('templates.html')
					.then(function(response) {
						// compile the response, which will put stuff into the cache
						$injector.get('$compile')(response.data);

						return response;
					});
				}

				// return the all-tpl promise to all template requests
				return allTplPromise.then(function(response) {
					return {
						status: response.status,
						data: cache.get(url)
					};
				});
			},

			put: function(key, value) {
				cache.put(key, value);
			}
		};
	}]);
}());
/* templateCache.js */
/********************/
