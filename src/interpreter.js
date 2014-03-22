/******************/
/* interpreter.js */
;(function(){

	'use strict';

	angular.module('myApp')	//	your app here
	.service('interpreter', ['$http', function($http) {

		var langDictionary = {},
			langCache = {},
			currentLangCode = '',
			replaceWords = function(newLangData){

				Object.keys(newLangData)
				.every(function(key){

					//	if property is read-only, unlock it
					if(langDictionary[key] !== undefined){
						Object.defineProperty(langDictionary, key, { writable: true });
					}

					//	write the new keywords ( all bindings on it will be pointing to the new value )
					langDictionary[key] = newLangData[key];

					//	make keyword read only, no one should try to write on it ( will throw error if he does! )
					Object.defineProperty(langDictionary, key, { writable: false });
					return true;
				});
			},
			getLang = function(url, callback){

				if(typeof url !== 'string' || typeof callback !== 'function'){
					return false;
				}

				$http({
					url: url
				})
				.error(function(data, status){
					//	Handle the error here
					//	console.log('error in getting '+langCode);
				})
				.success(function(data, status, headers, config){
					callback(data);
				});
			};

		//	pass a new dictionary and store it with a language code e.g. en-UK
		this.addLang = function(langCode, newLangData, callback){

			//	we assume newLangData is a JSON language dictionary
			if(typeof newLangData === 'object'){

				try {
					JSON.parse(newLangData);
				} catch (e){
					throw 'bad JSON given as language data';
				}

				langCache[langCode] = newLangData;
				return true;
			}

			//	we assume newLangData is a url
			if(typeof newLangData === 'string'){

				if(langCache[langCode] !== undefined){
					return false;
				}

				getLang(newLangData, function(data){

					//	cache the language
					langCache[langCode] = data;

					if(typeof callback === 'function'){
						callback();
					}
				});
			}
		};

		//	set a language as the active one, using it's langcode ( if the language is not in the cache,
		//	we'll try to receive it from lang.langCode.json )
		this.setLang = function(langCode, callback){

			if(typeof langCode !== 'string'){
				return false;
			}

			if(langCache[langCode] !== undefined){
				console.log(langCache[langCode]);
				replaceWords(langCache[langCode]);
				currentLangCode = langCode;
				return true;
			}
		};

		this.getCurrentLang = function(){
			return currentLangCode;
		};

		//	expose the dictionary so that every controller that uses the service can
		//	bind directly onto te map, thus having real-time update when the map changes language
		this.map = langDictionary;

		return this;
	}]);

}());
/* interpreter.js */
/******************/
