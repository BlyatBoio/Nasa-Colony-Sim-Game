let tileSize;
let gameTiles;
let tileID = 0;
let mapWidth = 50;
let mapHeight = 50;

// vars for the "Camera" position and movement
// because of how the cameraX and Y interact with screen objects
// going right is -X and down is -Y so they are debugged as - versions of themselves
let cameraX = 0;
let cameraY = 0;
let cameraScale = 1;
let cameraMoveSped = 12;
let floorLoadingX = 0;
let floorLoadingY = 0;
let totalTilesCreated = 0;
let lastYOnScreen = 0;
let yOnScreenSet = false;

class gameTile
{
	constructor(x, y, type)
	{
		this.x = x;
		this.y = y;
		this.w = tileSize;
		this.h = tileSize;

		// ID
		this.id = tileID;
		tileID++;

		this.type = type;
		// floor, building

		// maps the x position from 0-width to the grid of 0 - width/tilesize
		// same for y position
		this.gridX = round(map(this.x, 0, tileSize * mapWidth, 0, mapWidth));
		this.gridY = round(map(this.y, 0, tileSize * mapHeight, 0, mapHeight));

		// color to fill in the square when drawn
		noiseSeed(138);
		noiseDetail(100);
		let noise1 = noise(this.gridX * 0.1, this.gridY * 0.1);
		this.baseFillColor = [random(10, 40) * noise1, random(100, 130) * noise1, random(10, 40) * noise1];
		this.fillColor = this.baseFillColor;
	}
	changeType(newType)
	{
		this.type = newType;
	}
	setPosition(x, y)
	{
		this.x = x;
		this.y = y;
	}
	drawSelf()
	{
		// temp
		fill(this.fillColor);
		noStroke();
		let pos = adjustForCamera(this.x, this.y);
		rect(pos[0], pos[1], this.w * cameraScale + 1, this.h * cameraScale + 1);
		if (pos[0] > width) return 1;
		if (pos[1] > height) return 2;
		if (pos[0] < -tileSize * cameraScale) return 3;
		if (pos[1] > 50 && yOnScreenSet == false) { yOnScreenSet = true; return 4 }
		return 0;
	}
}

function createGameFloor()
{
	// the y for loop
	for (let i2 = 0; i2 < mapWidth / 100; i2++)
	{
		for (let i = 0; i < mapHeight; i++)
		{
			gameTiles[floorLoadingX][floorLoadingY] = new gameTile(floorLoadingX * tileSize, floorLoadingY * tileSize, "Floor");
			floorLoadingY++;
			totalTilesCreated++;
		}
		// if the y value is at the limit, reset it and incriment the X value
		if (floorLoadingY == mapHeight)
		{
			floorLoadingX++;
			floorLoadingY = 0;
		}
		// if the x value is at it's limit, then load into the game
	}
	if (floorLoadingX == mapWidth) gameState = "In Game";
	// draw stuff / UI
	background(0);
	// progress bar
	stroke(255, 150, 100);
	strokeWeight(10);
	line(width / 2 - 100, height / 2, width / 2 + 100, height / 2);
	stroke(0);
	strokeWeight(7);
	line(width / 2 - 100, height / 2, width / 2 - 100 + totalTilesCreated / (mapWidth * mapHeight) * 200, height / 2);
}

function cameraControls()
{
	// up/down/left/right movement
	let movingX = 0;
	let movingY = 0;

	if (keyIsDown(87)) { cameraY += cameraMoveSped / cameraScale; movingY = 1; } else
		if (keyIsDown(83)) { cameraY -= cameraMoveSped / cameraScale; movingY = -1; }
	if (keyIsDown(68)) { cameraX -= cameraMoveSped / cameraScale; movingX = -1; } else
		if (keyIsDown(65)) { cameraX += cameraMoveSped / cameraScale; movingX = 1; }

	if (keyIsDown(82)) cameraMoveSped = 28;
	else cameraMoveSped = 12;

	// moving diagonal moves at the same overall speed, not double the speed as it would be otherwise
	if (movingX != false && movingY != false) { cameraX -= cameraMoveSped * 0.25 * movingX; cameraY -= cameraMoveSped * 0.25 * movingY }
	// / cameraScale makes the relative speed the same as it gets larger and smaller
	if (keyIsDown(38)) cameraScale += round(10 * (0.5 * cameraScale)) / 100; else
		if (keyIsDown(40)) cameraScale -= round(10 * (0.5 * cameraScale)) / 100;

	// mouse scrolling for scale
	cameraScale -= mouseScrolled / 500;

	// constrain the cameraScale to a reasonable amount
	cameraScale = constrain(cameraScale, 0.1, 3);
}

function adjustForCamera(x, y)
{
	if (x + y != undefined)
	{
		// adjust by camera position
		x += cameraX;
		y += cameraY;

		// adjust the position for the scale arround the center point
		// tDist gets the "true distance" or simply includes negative signs
		// if X is greater than X2
		x += ((cameraScale - 1) * tileSize * (tDist(x + tileSize / 2, width / 2) / tileSize));
		y += ((cameraScale - 1) * tileSize * (tDist(y + tileSize / 2, height / 2) / tileSize));

		// return the position
		return [x, y];
	}
	else return "ERROR: X and or Y left undefined in adjustForCamera";
}

function tDist(x, x2)
{
	if (x < x2) return -dist(x, 0, x2, 0);
	else return dist(x, 0, x2, 0);
}

function drawFloor()
{
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
	// lastYOnScreen vars help to ensure its not drawing excess squares outside of view
	let endLoop = false;
	yOnScreenSet = false;
	for (let x = 0; x < gameTiles.length; x++)
	{
		endLoop = false;
		for (let y = constrain(lastYOnScreen - 10, 0, 10000); y < gameTiles[x].length; y++)
		{
			let check1 = gameTiles[x][y].drawSelf();
			// returns 1-4 depending on if it is outside of the screen
			// if it is 0, noting happens
			if (check1 != 0)
			{
				if (check1 == 3) { break; }
				if (check1 == 1) { endLoop = true; break; }
				if (check1 == 2) break;
				if (check1 == 4) { lastYOnScreen = y; }
			}
		}
		if (endLoop == true) break;
	}
}

function mouseWheel(event)
{
	mouseScrolled = event.delta;
}

function dayNightHandler()
{
	// timer updates
	totalTime++;
	dayTimer++;

	if (dayTimer > dayLength) isDayTime = !isDayTime;
}