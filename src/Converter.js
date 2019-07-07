/*
  CanvasImage Class
  Class that wraps the html image element and canvas.
  It also simplifies some of the canvas context manipulation
  with a set of helper functions.

  https://github.com/lokesh/color-thief/blob/master/src/color-thief.js
*/
var CanvasImage = function(imageData) {
  this.canvas = new OffscreenCanvas(imageData.width, imageData.height);
  this.context = this.canvas.getContext("2d");

  this.width = imageData.width;
  this.height = imageData.height;

  this.context.putImageData(imageData, 0, 0);
};

CanvasImage.prototype.clear = function() {
  this.context.clearRect(0, 0, this.width, this.height);
};

CanvasImage.prototype.update = function(imageData) {
  this.context.putImageData(imageData, 0, 0);
};

CanvasImage.prototype.getPixelCount = function() {
  return this.width * this.height;
};

CanvasImage.prototype.getImageData = function() {
  return this.context.getImageData(0, 0, this.width, this.height);
};

CanvasImage.prototype.removeCanvas = function() {
  this.canvas.parentNode.removeChild(this.canvas);
};

export function parseImage(heightImage, colorImage) {
  const hImage = new CanvasImage(heightImage);
  const cImage = new CanvasImage(colorImage || heightImage);

  let str = "h = {}\n";

  try {
    for (var h = 0; h < cImage.height; h++) {
      str = str + `h[${h + 1}]={\n`;
      for (var w = 0; w < cImage.width; w++) {
        const heightPixels = hImage.context.getImageData(w, h, 1, 1).data;
        const pixels = cImage.context.getImageData(w, h, 1, 1).data;

        const [r, g, b] = pixels;

        const isLastLine = w + 1 === hImage.width;
        const height = heightPixels[0];
        str = str + `{${height},{${r},${g},${b}}}${isLastLine ? "\n" : ",\n"}`;
      }
      str = str + `}\n\n`;
    }
  } finally {
    // hImage.removeCanvas();
    //cImage.removeCanvas();
  }
  str = str + `_G.Heightmap = h\n`;

  return str;
}

/*

h = {}
h[1] = {
	{160,{150,80,150}};
	{160,{150,80,150}};
	{160,{150,80,150}};
}

h[2] = {
	{160,{150,80,150}};
	{160,{150,80,150}};
	{160,{150,80,150}};
}

_G.Heightmap = h

*/
