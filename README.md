# Quick Examples

```javascript
var FotoliaImage = require('FotoliaImage');
new FotoliaImage('Fotolia_72655_Subscription_M.jpg').getAuthor(function(err, author) {
	console.log(author);
});;
```

```
node fotolia-authorlist.js <directory>
```

```
node fotolia-author.js <imgFile>
```

# API Installation

npm install --save git://github.com/felixebert/node-fotolia-image
