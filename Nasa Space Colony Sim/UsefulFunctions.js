function collc(x, y, w, h, x2, y2, w2, h2, bx, by){
  // apply the bezzle to the xs
  if(bx != 0 && bx != undefined){
    x = x - bx/2;
    x2 = x2 - bx/2;
    w = w + bx;
    w2 = w2 + bx;
  }

  // apply the bezzle to the ys
  if(by != 0 && by != undefined){
    y = y - by/2;
    y2 = y2 - by/2;
    h = y + by;
    h2 = y2 + by;
  }

  // draw hit boxes if debug mode is on and H is pressed
  fill(200, 50, 50, 100);
  if(debugModeOn == true && keyIsDown(72)) {rect(x, y, w, h); rect(x2, y2, w2, h2)}

  if(x + w > x2 && x < x2 + w2 && y + h > y2 && y < y2 + h2) return true;

  return false;
}

function blackAndWhiteFilter(image1){
  image1.loadPixels();
  let a = image1.pixels;
  let newPixels = [];
  for(let i = 0; i < a.length; i += 4){
      let totalBrightness = (a[i] + a[i + 1] + a[i + 2]);
      newPixels.push(totalBrightness, totalBrightness, totalBrightness, 255);
  }
  for(let i = 0; i < a.length; i ++){
      image1.pixels[i] = newPixels[i];
  }
  image1.updatePixels();
  return image1;
}
