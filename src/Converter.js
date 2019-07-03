/*
  CanvasImage Class
  Class that wraps the html image element and canvas.
  It also simplifies some of the canvas context manipulation
  with a set of helper functions.

  https://github.com/lokesh/color-thief/blob/master/src/color-thief.js
*/
var CanvasImage = function(image) {
  this.canvas = document.createElement("canvas");
  this.context = this.canvas.getContext("2d");

  document.body.appendChild(this.canvas);

  this.width = this.canvas.width = image.width;
  this.height = this.canvas.height = image.height;

  this.context.drawImage(image, 0, 0, this.width, this.height);
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

export class Converter {
  constructor(heightImage, colorImage) {
    this.heightImage = heightImage;
    this.colorImage = colorImage || heightImage;
  }

  parseImage() {
    const hImage = new CanvasImage(this.heightImage);
    const cImage = new CanvasImage(this.colorImage);

    let str = "h = {}\n";

    try {
      for (var h = 0; h < cImage.height; h++) {
        str = str + `h[${h + 1}]={\n`;
        for (var w = 0; w < cImage.width; w++) {
          const heightPixels = hImage.context.getImageData(w, h, 1, 1).data;
          const pixels = cImage.context.getImageData(w, h, 1, 1).data;

          const [r, g, b, a] = pixels;

          const isLastLine = w + 1 === hImage.width;
          const height = heightPixels[0];
          str =
            str + `{${height},{${r},${g},${b}}}${isLastLine ? "\n" : ",\n"}`;
        }
        str = str + `}\n`;
      }
    } finally {
      hImage.removeCanvas();
      cImage.removeCanvas();
    }
    str = str + `_G.Heightmap = h\n`;

    return str;
  }
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
