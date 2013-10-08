var fs = require('fs'), path = require('path'), ExifImage = require('exif').ExifImage;

var getAuthorFromExifData = function(exifData, fileName) {
	var author = null;
	if (exifData && exifData.image && exifData.image.Copyright && exifData.image.Copyright.trim()) {
		author = '© ' + exifData.image.Copyright.replace(/\(C\)\ /g, '');
		if (fileName.toLowerCase().indexOf('fotolia') > -1 && author.toLowerCase().indexOf('fotolia') < 0) {
			author += ' / Fotolia.com';
		}
	}
	return author;
};

var FotoliaImage = function(file) {
	this.getAuthor = function(callback) {
		new ExifImage({
			'image': file
		}, function(exifError, exifData) {
			if (exifError) {
				console.error(exifError);
			} else {
				author = getAuthorFromExifData(exifData, file);
				callback(author);
			}
		});
	};
};

module.exports = FotoliaImage;
