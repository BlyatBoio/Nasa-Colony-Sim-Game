let tileSize;
let gameTiles;
let tileID = 0;
let mapWidth = 100;
let mapHeight = 100;

// vars for the "Camera" position and movement
// because of how the cameraX and Y interact with screen objects
// going right is -X and down is -Y so they are debugged as - versions of themselves
let cameraX = 0;
let cameraY = 0;
let cameraScale = 1;
let cameraMoveSped = 12;

class gameTile{
	constructor(x, y, type){
		this.x = x;
		this.y = y;
		this.w = tileSize;
		this.h = tileSize;

		// ID
		this.id = tileID;
		tileID ++;

		this.type = type;
		// floor, building

		// maps the x position from 0-width to the grid of 0 - width/tilesize
		// same for y position
		this.gridX = round(map(this.x, 0, tileSize * mapWidth, 0, mapWidth));
		this.gridY = round(map(this.y, 0, tileSize * mapHeight, 0, mapHeight));

		// color to fill in the square when drawn
		let noise1 = noise(x, y);
		noiseDetail(10)
		this.baseFillColor = [random(10, 40) * noise1, random(100, 130) * noise1, random(10, 40) * noise1];
		this.fillColor = this.baseFillColor;
	}
	changeType(newType){
		this.type = newType;
	}
	setPosition(x, y){
		this.x = x;
		this.y = y;
	}
	drawSelf(){
		// temp
		fill(this.fillColor);
		noStroke();
		let pos = adjustForCamera(this.x, this.y);
		rect(pos[0], pos[1], this.w * cameraScale, this.h * cameraScale);
	}
}

function cameraControls(){
	// up/down/left/right movement
	let movingX = 0;
	let movingY = 0;

	if(keyIsDown(87)) {cameraY += cameraMoveSped; movingY = 1;} else
	if(keyIsDown(83)) {cameraY -= cameraMoveSped; movingY = -1;} 
	if(keyIsDown(68)) {cameraX -= cameraMoveSped; movingX = -1;} else 
	if(keyIsDown(65)) {cameraX += cameraMoveSped; movingX = 1;}

	if(keyIsDown(82)) cameraMoveSped = 28;
	else cameraMoveSped = 12;

	// moving diagonal moves at the same overall speed, not double the speed as it would be otherwise
	if(movingX != false && movingY != false){ cameraX -= cameraMoveSped*0.25 * movingX; cameraY -= cameraMoveSped*0.25 * movingY}
	// / cameraScale makes the relative speed the same as it gets larger and smaller
	if(keyIsDown(38)) cameraScale += round(10 * (0.5*cameraScale)) / 100; else
	if(keyIsDown(40)) cameraScale -= round(10 * (0.5*cameraScale)) / 100;

	// mouse scrolling for scale
	cameraScale -= mouseScrolled / 300;

	// constrain the cameraScale to a reasonable amount
	cameraScale = constrain(cameraScale, 0.1, 5);
	cameraScale = round(cameraScale * 100) / 100;
}

function adjustForCamera(x, y){
	if(x + y != undefined){
		// adjust by camera position
		x += cameraX;
		y += cameraY;

		// adjust the position for the scale arround the center point
		// tDist gets the "true distance" or simply includes negative signs
		// if X is greater than X2
		x += ((cameraScale - 1) * tileSize * (tDist(x + tileSize/2, width/2)/tileSize));
		y += ((cameraScale - 1) * tileSize * (tDist(y + tileSize/2, height/2)/tileSize));

		// return the position
		return [x, y];
	}
	else return "ERROR: X and or Y left undefined in adjustForCamera";
}

function tDist(x, x2){
	if(x < x2) return -dist(x, 0, x2, 0); 
	else return dist(x, 0, x2, 0);
}

function drawFloor(){
	cameraControls();
	// temp draw function to get camera controls working
	/*
	// initial positions
	let xpos = 0;
	let ypos = 0;
	// itterate over a given amount
	for(let i = 0; i < 1000; i++){
		// define an adjusted position for the blocks in relation to the camera
		let pos = adjustForCamera(xpos, ypos);
		// if it is not to the left of the screen
		if(pos[1] < -tileSize * cameraScale){xpos = 0; ypos += tileSize}
		else
		if(pos[0] < -tileSize * cameraScale){xpos+= tileSize;} else{
			// draw a square at that point
			square(pos[0], pos[1], (tileSize * cameraScale));
			// incriment the xposition
			xpos += tileSize;
		}
		// other constraints to ensure only on-screen blocks are drawn
		if(pos[0] >= width) {xpos = 0; ypos += tileSize;}
		if(pos[1] >= height) break;
	}
	*/
	background(0);
	for(let x = 0; x < gameTiles.length; x++){
		for(let y = 0; y < gameTiles[x].length; y++){
			gameTiles[x][y].drawSelf();
		}
	}
}

function mouseWheel(event){
	mouseScrolled = event.delta;
}

function dayNightHandler(){
	// timer updates
	totalTime++;
	dayTimer++;

	if(dayTimer > dayLength)isDayTime = !isDayTime;
}