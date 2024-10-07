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
      h = h + by;
      h2 = h2 + by;
    }
  
    // draw hit boxes if debug mode is on and H is pressed
    fill(200, 50, 50, 100);
    if(debugModeOn == true && keyIsDown(72)) {rect(x, y, w, h); rect(x2, y2, w2, h2)}
  
    if(x + w > x2 && x < x2 + w2 && y + h > y2 && y < y2 + h2) return true;
  
    return false;
  }
  
function blackAndWhiteFilter(image1){
    // load the pixels of the image
    image1.loadPixels();

    // simpler refference to the array of pixels
    let a = image1.pixels;

    // empty array for new pixels
    let newPixels = [];

    //itterate over the pixels
    for(let i = 0; i < a.length; i += 4){
        let totalBrightness = map(a[i] + a[i + 1] + a[i + 2], 0, 765, 0, 255);
        // get the total brightness
        newPixels.push(totalBrightness, totalBrightness, totalBrightness, 255);
    }
    for(let i = 0; i < a.length; i ++){
        image1.pixels[i] = newPixels[i];
    }
    image1.updatePixels();
    return image1;
}

function dropShadowText(txt, x, y, xoffset, yoffset){
    // if a second offset is not provided, it will simply apply the first offset to they y as well
    if(yoffset == undefined) yoffset = xoffset;
    fill(0);
    text(txt, x + xoffset, y + yoffset);
    fill(230);
    text(txt, x, y);
}