var OCRAD = require('./ocrad.js');
var Canvas = require('canvas');
var Image = Canvas.Image;
var fs = require('fs');
var fp = process.argv[2];
var argv = require('minimist')(process.argv.slice(2), {
    'alias': {
        'key': '_'
    },
    'string': ['out'],
});

outPath = argv.out ? argv.out : '/dev/null';
console.log('Saving output to ' + outPath);

fs.readFile(String(fp), function(err, src) {
  if (err) {
    throw err;
  }
  var img = new Image();
  img.src = src;
  var canvas = new Canvas(img.width, img.height);
  var ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0, img.width, img.height);
  console.log(OCRAD(canvas));
  if (!fs.existsSync(outPath)) {
  	fs.writeFileSync(outPath, OCRAD(canvas));
  }
});