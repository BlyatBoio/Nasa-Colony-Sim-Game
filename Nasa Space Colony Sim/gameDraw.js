let tileSize;
let gameTiles;
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

		this.type = type;
		// floor, building

		// maps the x position from 0-width to the grid of 0 - width/tilesize
		// same for y position
		this.gridX = round(map(this.x, 0, tileSize * mapWidth, 0, mapWidth));
		this.gridY = round(map(this.y, 0, tileSize * mapHeight, 0, mapHeight));
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
		fill(0);
		stroke(255);
		rect(this.x, this.y, this.w, this.h);
	}
}

function cameraControls(){
	// up/down/left/right movement
	let movingX = false;
	let movingY = false;

	if(keyIsDown(87)) {cameraY += cameraMoveSped; movingY = true;} else
	if(keyIsDown(83)) {cameraY -= cameraMoveSped; movingY = true;} 
	if(keyIsDown(68)) {cameraX -= cameraMoveSped; movingX = true;} else 
	if(keyIsDown(65)) {cameraX += cameraMoveSped; movingX = true;}

	if(keyIsDown(82)) {cameraMoveSped = 18};

	// moving diagonal moves at the same overall speed, not double the speed as it would be otherwise
	if(movingX == true && movingY == true) {cameraX -= cameraMoveSped/2; cameraY -= cameraMoveSped/2}

	// / cameraScale makes the relative speed the same as it gets larger and smaller
	if(keyIsDown(38)) cameraScale += round(10 * (0.5*cameraScale)) / 100; else
	if(keyIsDown(40)) cameraScale -= round(10 * (0.5*cameraScale)) / 100;

	// constrain the cameraScale to a reasonale amount
	cameraScale = constrain(cameraScale, 1, 5);
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
	push();
	let xpos = 0;
	let ypos = 0;
	for(let i = 0; i < 300; i++){
		let pos = adjustForCamera(xpos, ypos);
		fill(230);
		square(pos[0], pos[1], (tileSize * cameraScale));
		xpos += tileSize;
		if(pos[0] < 0){ xpos++;}
		if(pos[0] >= width) {xpos = 0; ypos += tileSize;}
		if(pos[1] >= height) break;
	}
	pop();
}