var fs = require('fs'), path = require('path'), ExifImage = require('exif').ExifImage;

if (process.argv.length < 3) {
	process.exit(1);
}
var imagePath = process.argv[2];
var imageFiles = fs.readdirSync(imagePath);

var outputAuthor = function(imageFile, exifData) {
	if (exifData && exifData.image && exifData.image.Copyright && exifData.image.Copyright.trim()) {
		var author = '© ' + exifData.image.Copyright.replace(/\(C\)\ /g, '');
		if (imageFile.toLowerCase().indexOf('fotolia') > -1 && author.toLowerCase().indexOf('fotolia') < 0) {
			author += ' / Fotolia.com';
		}
		console.log(author);
	}
};

imageFiles.forEach(function(imageFile) {
	if (path.extname(imageFile) === '.jpg' || path.extname(imageFile) === '.jpeg') {
		fs.stat(imagePath + imageFile, function(fsError, stats) {
			if (fsError) {
				throw new Error(fsError);
			}

			if (stats.isFile()) {
				new ExifImage({
					'image': imagePath + imageFile
				}, function(exifError, exifData) {
					if (exifError) {
						console.error(exifError);
					} else {
						outputAuthor(imageFile, exifData);
					}
				});
			}
		});
	}
});
