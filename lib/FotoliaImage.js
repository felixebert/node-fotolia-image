var im = require('imagemagick'), async = require('async');

var FotoliaImage = function(file) {
	var readAsync = function(name, key) {
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
		var toRead = [readAsync('exifCopyright', '%[EXIF:Copyright]'), readAsync('iptcCredit', '%[IPTC:2:110]'), readAsync('iptcCopyright', '%[IPTC:2:116]')];
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
