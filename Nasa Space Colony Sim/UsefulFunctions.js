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

function statisticBar(x, y, s, maxW, text1, percentFull){
  percentFull += 100;
  percentFull = constrain(percentFull, 0, 100);

  // draw the line
  textSize(30);
  textAlign(LEFT);
  strokeWeight(s + 5);
  stroke(0);
  line(x, y, x + maxW, y);
  strokeWeight(s);
  stroke(255, 150, 100);
  line(x, y, x + (maxW * (percentFull/100)), y);
  
  // text
  strokeWeight(1);
  stroke(0);
  textSize(15);
  fill(0);
  textAlign(CENTER);
  text(text1, x + maxW/2, y - s - 10)
}

function dropShadowText(txt, x, y, xoffset, yoffset){
  // if a second offset is not provided, it will simply apply the first offset to they y as well
  if(yoffset == undefined) yoffset = xoffset;
  fill(0);
  text(txt, x + xoffset, y + yoffset);
  fill(230);
  text(txt, x, y);
}

function jsonToTreeClass(jsonPath){
  var json1 = loadJSON("TechTreeJsons/onboardProcesingTechTree.json");
  var name1 = json1.testRefference.test1;
  return name1;
}

class techTree {
  constructor(treeName, paths){
    this.name = treeName;
    this.paths = paths;
  }
  drawSelf(){
    fill(230);
    stroke(0);
    dropShadowText(this.name, width/2, 75);
    for(let i = 0; i< this.paths; i++){
      this.paths[i].drawSelf(100, 200 + i * 50);
    }
  }
}

class techTreePath {
  constructor(names, costs){
    this.names = [];
    this.costs = [];
    this.items = [];
    for(let i = 0; i < this.names.length; i++){
      this.items.push(new techTreeItem(this.names[i], true, this.costs[i]));
    }
  }
  drawSelf(startX, startY){
    for(let i = 0; i < this.items.length; i++){
      // draw the item
      this.items[i].drawSelf(startX + i * 50, startY);

      // draw a line between all of the items
      stroke(0);
      strokeWeight(6);
      if(i < this.items.length - 1) line(startX + i*50, startY, startX + (i+1)*50);
      strokeWeight(1);
    }
  }
}

class techTreeItem {
  constructor(name, isLocked, cost){
    // a cost array is formatted as [[15, "Iron Rod"], [20, "Iron Plate"]]
    this.name = name;
    this.isLocked = isLocked;
    this.cost = cost;
    this.costString = "";

    // compile a string to state the cost
    for(let i = 0; i < this.cost.length; i++){
      for(let i2 = 0; i < this.cost[i].length; i2++){
        this.costString += this.cost[i][0] + " " + this.costString[i][1] + "s, ";
      }
    }
  }
  drawSelf(x, y){
    // draws a button which when clicked, sets it to upgraded
    button(x, y, 50, 20, this.name, this.costString, true);
  }
}