var FotoliaImage = require('./lib/FotoliaImage.js');
var argv = require('optimist').usage('Output the authors of a fotolia image\nUsage: $0 [image]').demand(1).argv;

var image = new FotoliaImage(argv._[0]);
image.getAuthor(function(err, author) {
	if (err) {
		console.error(err);
	} else if (author != null) {
		console.log(author);
	} else {
		console.log('no author found');
	}
});
