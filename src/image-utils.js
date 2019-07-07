export function imageToArray(image) {
  if (!image) {
    return null;
  }
  var canvas = document.createElement("canvas");
  var context = canvas.getContext("2d");
  canvas.height = image.height;
  canvas.width = image.width;
  context.drawImage(image, 0, 0);
  var imageData = context.getImageData(0, 0, image.width, image.height);

  return imageData;
}
