'use strict';

	//	get through2
var through2 = require('through2'),
	//
	//	make our function
	replaceInFile = function(fileToInject, target, placeHolder){

		if(fileToInject === undefined || target === undefined || typeof placeHolder !== 'string'){
			return false;
		}

		var bufferTarget, // file to be saved
			bufferToInject; //

		//	return a through2 stream
		return through2.obj(function (file, enc, callback) {

			//	check if file is there
			if (file.isNull()) {
				this.push(file);
				return callback();
			}

			if (file.isStream()){
				throw Error('streams not supported');
				return false;
			}

			var fileName = file.path.replace(file.base, '');

			if(fileName === target){
				bufferTarget = file;

			} else if(fileName === fileToInject) {

				if(bufferTarget !== undefined){
					(function(){

						var contentsTarget = bufferTarget.contents.toString(),
						    contentsToInject = file.contents.toString();

						bufferTarget.contents = new Buffer(contentsTarget.replace(placeHolder, contentsToInject));

					})();
					this.push(bufferTarget);
				}
			} else {
				this.push(file);
			}

			callback();
		});
	};


module.exports = replaceInFile;
