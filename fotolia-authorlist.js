var fs = require('fs'), path = require('path'), FotoliaImage = require('./lib/FotoliaImage.js');
var argv = require('optimist').usage('List the authors of all fotolia images in a directory\nUsage: $0 [directory]').demand(1).argv;

var imagePath = argv._[0] + path.sep;

fs.readdir(imagePath, function(err, files) {
	files.forEach(function(file) {
		if ((path.extname(file) === '.jpg' || path.extname(file) === '.jpeg') && file.toLowerCase().indexOf('fotolia') >= 0) {
			fs.stat(imagePath + file, function(fsError, stats) {
				if (stats.isFile()) {
					var image = new FotoliaImage(imagePath + file);
					image.getAuthor(function(err, author) {
						if (author) {
							console.log(author);
						}
					});
				}
			});
		}
	});
});
