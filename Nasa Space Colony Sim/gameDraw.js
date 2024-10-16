let tileSize;
let gameTiles;
let mapWidth = 100;
let mapHeight = 100;

// vars for the "Camera" position and movement
let cameraX = 0;
let cameraY = 0;
let cameraViewWidth = 1500;
let cameraViewHeight = 1500;
let cameraMoveSped = 1;

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

function scaleCamera(){

}

function cameraControls(){
	switch(keyIsDown()){
		case 87: 
			cameraY += 10; 
			break;
		case 83: 
			cameraY -= 10; 
			break;
		
		case 68: 
			cameraY += 10; 
			break;
		case 65: 	
			cameraY -= 10; 
			break;
	}
}

function drawFloor(){
	cameraControls();
	for(let i = cameraX / tileSize; i < (cameraX + cameraViewWidth) / tileSize; i++){
		for(let i2 = cameraY / tileSize; i2 < (cameraY + cameraViewHeight) / tileSize; i2++){
			gameTiles[round(i)][round(i2)].drawSelf();
		}
	}
}