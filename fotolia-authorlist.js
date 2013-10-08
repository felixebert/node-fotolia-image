var fs = require('fs'), path = require('path'), ExifImage = require('exif').ExifImage, FotoliaImage = require('./lib/fotolia-image.js');
var argv = require('optimist').usage('List the authors of all fotolia images in a directory\nUsage: $0 [directory]').demand(1).argv;

var imagePath = argv._[0] + path.sep;

fs.readdirSync(imagePath).forEach(function(file) {
	if (path.extname(file) === '.jpg' || path.extname(file) === '.jpeg') {
		fs.stat(imagePath + file, function(fsError, stats) {
			if (fsError) {
				throw new Error(fsError);
			}

			if (stats.isFile()) {
				var image = new FotoliaImage(imagePath + file);
				image.getAuthor(function(author) {
					if (author != null) {
						console.log(author);
					}
				});
			}
		});
	}
});
