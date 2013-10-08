var im = require('imagemagick'), async = require('async');

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
	var read = function(name, key) {
		return function(callback) {
			im.identify(['-format', key, file], function(err, metadata) {
				if (err) {
					callback(err);
				} else {
					callback(null, metadata.trimRight());
				}
			});
		};
	};

	this.getAuthor = function(authorCallback) {
		var toRead = [read('exifCopyright', '%[EXIF:Copyright]'), read('iptcCredit', '%[IPTC:2:110]'), read('iptcCopyright', '%[IPTC:2:116]')];
		async.series(toRead, function(err, authorNames) {
			var author = null;
			if (!err) {
				authorNames.forEach(function(authorName) {
					if (authorName) {
						author = authorName.replace(/\(C\)\ /g, '');
					}
				});
				if (author != null) {
					if (author.toLowerCase().indexOf('fotolia') < 0) {
						author += ' / Fotolia.com';
					}
				}
			}
			authorCallback(err, author);
		});
	};
};

module.exports = FotoliaImage;
