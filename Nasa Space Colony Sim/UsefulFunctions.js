let mouseIsDown = false;
let selectedItem;
let selectedAmnt = 0;

function collc(x, y, w, h, x2, y2, w2, h2, bx, by)
{
  // apply the bezzle to the xs
  if (bx != 0 && bx != undefined)
  {
    x = x - bx / 2;
    x2 = x2 - bx / 2;
    w = w + bx;
    w2 = w2 + bx;
  }

  // apply the bezzle to the ys
  if (by != 0 && by != undefined)
  {
    y = y - by / 2;
    y2 = y2 - by / 2;
    h = h + by;
    h2 = h2 + by;
  }

  // draw hit boxes if debug mode is on and H is pressed
  fill(200, 50, 50, 100);
  if (debugModeOn == true && keyIsDown(72)) { rect(x, y, w, h); rect(x2, y2, w2, h2) }

  if (x + w > x2 && x < x2 + w2 && y + h > y2 && y < y2 + h2) return true;

  return false;
}

function new2dArray(w, h, baseValue){
  // define a new array with length (width)
  var newArr = Array(w);

  // what is pushed as the second layer
  var arrayBase = [];

  // if a base value is provided, it becomes a 2d array with the scecond layer contianing the base value
  if(baseValue != undefined) {
    if(baseValue.length != undefined) {
      for(let i = 0; i < baseValue.length; i++){
        arrayBase.push(baseValue[i]);
      }
    } else arrayBase.push(baseValue);
  }

  // push the second layer
  for(let x  = 0; x < w; x++){
    newArr[x] = [];
    for(let y  = 0; y < h; y++){
      newArr[x].push(arrayBase);
    }
  }

  // return the result
  return newArr;
}

function blackAndWhiteFilter(image1)
{
  // load the pixels of the image
  image1.loadPixels();

  // simpler refference to the array of pixels
  let a = image1.pixels;

  // empty array for new pixels
  let newPixels = [];

  //itterate over the pixels
  for (let i = 0; i < a.length; i += 4)
  {
    let totalBrightness = map(a[i] + a[i + 1] + a[i + 2], 0, 765, 0, 255);
    // get the total brightness
    newPixels.push(totalBrightness, totalBrightness, totalBrightness, 255);
  }
  for (let i = 0; i < a.length; i++)
  {
    image1.pixels[i] = newPixels[i];
  }
  image1.updatePixels();
  return image1;
}

function statisticBar(x, y, s, maxW, text1, percentFull){
  percentFull = constrain(percentFull, 0, 100);

  // draw the line
  textSize(30);
  textAlign(LEFT);
  strokeWeight(s + 5);
  stroke(0);
  line(x, y, x + maxW, y);
  strokeWeight(s);
  stroke(255, 150, 100);
  line(x, y, x + (maxW * (percentFull / 100)), y);

  // text
  strokeWeight(1);
  stroke(0);
  textSize(15);
  fill(0);
  textAlign(CENTER);
  text(text1, x + maxW / 2, y - s - 10)
}

function dropShadowText(txt, x, y, xoffset, yoffset)
{
  // if a second offset is not provided, it will simply apply the first offset to they y as well
  if (yoffset == undefined) yoffset = xoffset;
  fill(0);
  text(txt, x + xoffset, y + yoffset);
  fill(230);
  text(txt, x, y);
}

function animate(frames, timeBetweenFrames, loop, currentTime){
  let curFrame = round(currentTime / timeBetweenFrames);
  if(curFrame > frames.length-1){
    // modulo operator (%) gives the remainder and doing so loops
    // the current frame between 0-amount of frames
    if(loop == true) return frames[curFrame%frames.length];
    // if it is not looping, simply draw the last frame
    else return frames[frames.length-1];
  }
  curFrame = round(constrain(curFrame, 0, frames.length-1));
  return frames[curFrame];
}

function jsonToTreeClass(json1)
{
  let paths = [];
  // poulate the paths array
  for (let i = 0; i < json1.techTree.paths.length; i++)
  {
    paths.push(new techTreePath(json1.techTree.paths[i][0], json1.techTree.paths[i][1]));
  }

  // get the new tree object
  let newTechTree = new techTree(json1.techTree.name1, paths);

  // return
  return newTechTree;
}

class techTree
{
  constructor(treeName, paths)
  {
    this.name = treeName;
    this.paths = paths;
  }
  drawSelf()
  {
    fill(230);
    stroke(0);
    dropShadowText(this.name, width / 2, 75);
    for (let i = 0; i < this.paths.length; i++)
    {
      this.paths[i].drawSelf(100, 200 + i * 50);
    }
  }
}

class techTreePath
{
  constructor(names, costs)
  {
    this.names = [];
    this.costs = [];
    this.items = [];
    for (let i = 0; i < names.length; i++)
    {
      this.items.push(new techTreeItem(names[i], true, costs[i]));
    }
  }
  drawSelf(startX, startY)
  {
    for (let i = 0; i < this.items.length; i++)
    {
      // draw the item
      textSize(5);
      textFont('Courier New');
      this.items[i].drawSelf(startX + i * 200, startY + i * 50);

      // draw a line between all of the items
      stroke(0);
      strokeWeight(6);
      if (i < this.items.length - 1) line(startX + i * 200, startY, startX + (i + 1) * 200);
      strokeWeight(1);
    }
  }
}

class techTreeItem
{
  constructor(name, isLocked, cost)
  {
    // a cost array is formatted as [[15, "Iron Rod"], [20, "Iron Plate"]]
    this.name = name;
    this.isLocked = isLocked;
    this.cost = cost;
    this.costString = "";

    // compile a string to state the cost
    for (let i = 0; i < this.cost.length; i++)
    {
      this.costString += this.cost[i][0] + " " + this.cost[i][1] + "s, ";
    }
  }
  drawSelf(x, y)
  {
    // draws a button which when clicked, sets it to upgraded
    button(x, y, 50, 20, this.name, this.costString, true);
  }
}

class inventory{
  constructor(size, lootTable){
    this.size = size;
    // define the array
    this.items = Array(inventoryWidth);

    // make the array 2d
    for(let i = 0; i < this.items.length; i++){
      this.items[i] = [];
    }

    // loot table functions
    if(lootTable != undefined){
      for(let i = 0; i < this.items.length; i++){
        for(let i2 = 0; i2 < ceil(size/inventoryWidth) + 1; i2++){
          // get a random item from the loot table
          let r = lootTable.randomItem();

          // push it into the items array with a random value
          this.items[i].push(r);
          this.items[i].push(random(0, r.stackSize));
        }
      }
    }
    // push the default empty items into the array
    else {
      for(let i = 0; i < this.items.length; i++){
        for(let i2 = 0; i2 < ceil(size/inventoryWidth) + 1; i2++){

          // generate a random on/off value
          let a = round(random(0, 1));

          // push either empty or placeholder depending on the value of a
          if(a == 0) this.items[i].push([empty, 0]);
          else this.items[i].push([placeHolder1, round(random(5, 20))]);
        }
      }
    }

    // trim the end to make it actually appropriate to the size

    // for a size of 33 and a width of 9
    // let a = ceil(33/9) = your height
    // let b = 33 - a * width
    let removeAmnt = inventoryWidth - (size - (floor(size/inventoryWidth)*inventoryWidth));

    for(let i = 0; i < removeAmnt; i++){
      this.items[(this.items.length-i)-1].shift();
    }

  }
  drawSelf(screenX, screenY, displaySize){
    // default the display size
    if(displaySize == undefined) displaySize = 50;

    for(let x = 0; x < this.items.length-1; x++){
      for(let y = 0; y < this.items[x].length-1; y++){  
        // screen display position
        let curDisplayX = screenX + (x*displaySize);
        let curDisplayY = screenY + (y*displaySize);
        
        // formatting
        fill(200, 200, 200, 100);
        stroke(230);
        square(curDisplayX, curDisplayY, displaySize);

        // only draw the text if the slot is not empty
        if(this.items[x][y][0].name != "Empty" && this.items[x][y][1] != 0){

          // formatting
          fill(255);
          stroke(0);
          textSize(10);
          textAlign(CENTER);
          text(this.items[x][y][0].name + " X " + this.items[x][y][1], curDisplayX + displaySize/2, curDisplayY + displaySize/2 + 20);
        }
      }
    }

    // call the interaction function
    this.interaction(screenX, screenY, displaySize);
  }
  interaction(screenX, screenY, displaySize){
    // itterate over all positions
    for(let x = 0; x < this.items.length-1; x++){
      for(let y = 0; y < this.items[x].length-1; y++){  
        
        // simpler refference to current position 
        let curDisplayX = screenX + (x*displaySize);
        let curDisplayY = screenY + (y*displaySize);

        // collision with mouse
        if(collc(curDisplayX, curDisplayY, displaySize, displaySize, mouseX, mouseY, 1, 1) == true){
          noStroke();
          fill(200, 200, 200, 100);
          square(curDisplayX, curDisplayY, displaySize);
          if(mouseIsDown == true){
            // if the item being placed into the slot is not the same item as is in the slot
            if(selectedItem.itemID != this.items[x][y][0].itemID){

              // deine a saved variable of the item
              let newSelectedItem = this.items[x][y][0];
              let newSelectedAmnt = this.items[x][y][1];

              // update the items array
              this.items[x][y][0] = selectedItem;
              this.items[x][y][1] = selectedAmnt;
              
              // update selected item with the coppied variables
              selectedItem = newSelectedItem;
              selectedAmnt = newSelectedAmnt;
            } else {
              // if the item being placed into the slot is the same item

              // add the amount to the items array
              this.items[x][y][1] += selectedAmnt;

              // reset the item amount
              selectedItem = empty;
              selectedAmnt = 0;

              // check to see if the amount in the slot is greater than the stack size
              if(this.items[x][y][1] > this.items[x][y][0].stackSize){
                selectedItem = this.items[x][y][0];
                selectedAmnt = this.items[x][y][1] - this.items[x][y][0].stackSize;
                this.items[x][y][1] = this.items[x][y][0].stackSize;
              }
            }

          }
        }
      }
    }
    // draw the curently selected item on the mouse
    if(selectedItem.name != "Empty" && selectedAmnt != 0){

      // formatting
      fill(255);
      stroke(0);
      textSize(10);
      textAlign(CENTER);
      text(selectedItem.name + " X " + selectedAmnt, mouseX, mouseY);
    }
  }
}

class lootTable{
  constructor(items, chances, maxValue){
    this.items = items;
    this.chances = chances;
    this.maxValue = maxValue;

    // instead of having item1, item2, with 70% 30%, it becomes 70 item1s and 30 item2s,
    // these are then chosen at random from the array with a random 0-100 
    let items1 = [];
    for(let i = 0; i < this.chances.length; i++){
      for(let i2 = 0; i2 < this.chances[i]; i2++){
        items1.push(this.items[i]);
      }
    }
    this.items = items1;
    if(maxValue == undefined) this.maxValue = 100;
  }
  randomItem(){
    // get a random item with the proper weighting as far as the loot table.
    let r = round(random(0, this.maxValue-1));
    return this.items[r];
  }
}

function mousePressed(){
  mouseIsDown = true;
}

function consoleTextLog(t){
  consoleText += consoleLength + ": ";
  consoleText += t;
  consoleText += "\n"
  consoleLength ++;
  if(consoleLength + consoleDrawY > height/20) consoleDrawY -= 60; 
  if(consoleLength > 500) {
    consoleText = "";
    consoleLength = 0;
    consoleDrawY = 50;
  }
}