/******************/
/* interpreter.js */
;(function(){

	'use strict';

	angular.module('inApp')	//	your app here
	.service('interpreter', ['$http', function($http) {

		var langDictionary = {},	// the main hash map we keep all our current translations
		    langCache      = {},	// we cache here the different language dictionaries
		    //	a function which does the rewrite of the new words whenever we get a new language
		    replaceWords   = function(newLangData){

		    	Object.keys(newLangData)
		    	.every(function(key) {
		    		langDictionary[key] = newLangData[key];	//	we assign the new string to the current 'word'
		    		return true;
		    	});
		    };

		this.ignoreCache = false;	// we use the cache by default, but you can turn it off

		this.setLang = function(url, callback) {

			if(typeof url !== 'string'){
				return false;
			}

			// check if the cache is available for this language code
			if(langCache[url] !== undefined && !this.ignoreCache){
				replaceWords(langCache[url]);
				return true;
			}

			$http({
				url: url
			})
			.error(function(){
				//	something went wrong in getting the file, handle it
			})
			.success(function(data/*, status, headers, config*/){

				//	we assume we get a json file, so `data` is the dictionary we expect
				replaceWords(data);

				//	cache the data
				langCache[url] = data;

				if(typeof callback === 'function'){
					callback();	//	do something after the language is updated
				}
			});
		};

		//	expose the dictionary hashmap so you can bind on it
		this.map = langDictionary;

	}]);

}());
/* interpreter.js */
/******************/
