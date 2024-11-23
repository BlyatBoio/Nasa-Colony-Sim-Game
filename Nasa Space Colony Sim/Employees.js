let employeeNames = ["Jared", "Michael", "Dina", "Jeremy", "Derek", "Kiera", "Marie", "Daryl", "Johnson", "Lucy", "Pam", "Eric", "Diana", "Ronald", "Donald", "Mary", "Michele", "ZEUS DESTORYER OF WORLDS",
	"Bob", "Craig", "Burger", "Timothy Chalame", "William"
];
let employeeSelected = false;

let tilesToReset = [];

class Employee
{
	constructor(type)
	{
		// Intern Engineer Manager or Astronaut
		this.employeeType = type;

		// relvant to how much work the have done, get different beneits for having done more work
		this.prestigeLevel = 0;

		// update ID system
		this.id = employeeID;
		employeeID++;

		// generate the random variables to give the charachter more personality
		this.generatePersonalInfo();

		// current task it is assigned to doing
		this.currentTask = "Idle";

		// add itself to the necesarry arrays
		allEmployees.push(this);

		// display variables
		this.x = random(0, mapWidth * tileSize);
		this.y = random(0, mapHeight * tileSize);
		this.targetx = this.x;
		this.targety = this.y;
		this.delayTime = 0;
		this.delayWait = random(0, 100);
		this.walkSpeed = 2;
		this.isDisplayingProfile = false;
		this.isSelected = false;
		this.selctXoff = 0;
	}

	generatePersonalInfo()
	{
		// get a random name from the list of names
		this.name = employeeNames[round(random(0, employeeNames.length - 1))];
		this.age = round(random(17, 65));
	}

	upgradeSelf(upgradeTo)
	{
		// simplest case, it is an intern and just upgrades to the given type
		if (this.employeeType == "Intern") { this.employeeType = upgradeTo; this.prestigeLevel = 0; };
	}

	assignTask(task)
	{
		this.currentTask = task;
	}

	drawSelf()
	{
		this.isDisplayingProfile = false;
		fill(100);
		stroke(0);
		let truePos = adjustForCamera(this.x, this.y);
		image(workerImage, truePos[0], truePos[1], 64*cameraScale, 90*cameraScale);
		if (collc(mouseX, mouseY, 10, 10, truePos[0], truePos[1], 15, 40, 15, 15) == true) { noFill(); stroke(255); rect(truePos[0], truePos[1], 64*cameraScale, 90*cameraScale); this.isDisplayingProfile = true;}

		if (debugModeOn == true) this.drawDebug();
	}

	handleMovement()
	{
		// handle selections because this code is only called outside ofthe pause menu
		if (employeeSelected == false && mouseIsPressed && collc(this.x, this.y, 15, 40, mouseX, mouseY, 10, 10, 10, 10) == true) { this.isSelected = true; employeeSelected = true; }
		if (mouseIsPressed == false && this.isSelected == true) { employeeSelected = false; this.isSelected = false }
		if (this.isSelected == true)
		{
			let dist1 = 50;
			this.selctXoff++;
			let targx = mouseX;
			let targy = mouseY;
			if (this.selctXoff > dist1) this.selctXoff = 0;
			for (let i = 0; i < dist(this.x + 7.5, this.y + 20, targx, targy) - this.selctXoff * 2; i += dist1)
			{
				push();
				stroke(230);
				strokeWeight(3);
				translate(this.x + 7.5, this.y + 20);
				rotate(-atan2(this.x + 7.5 - targx, this.y + 20 - targy) - PI / 2);
				line(i + this.selctXoff, 0, i + dist1 - 20 + this.selctXoff, 0);
				pop();
			}
			push();
			noFill();
			strokeWeight(1);
			stroke(255);
			rect(this.x, this.y, 15, 40);
			pop();
		}
		if (this.currentTask == "Idle")
		{
			// update the timer and handle reseting target position when the timer is up
			this.delayTime++;
			if (this.delayTime > this.delayWait)
			{
				this.delayTime = 0;
				this.delayWait = round(random(50, 500));
				this.targetx = constrain(random(this.x - 200, this.x + 200), 0, (mapWidth * tileSize) - 15);
				this.targety = constrain(random(this.y - 200, this.y + 200), 0, (mapHeight * tileSize) - 40);
			}

			// handle movement

			// move if it is far enough away
			if (dist(this.x, this.y, this.targetx, this.targety) > this.walkSpeed)
			{
				if (this.x > this.targetx) this.x -= this.walkSpeed;
				if (this.x < this.targetx) this.x += this.walkSpeed;

				if (this.y > this.targety) this.y -= this.walkSpeed;
				if (this.y < this.targety) this.y += this.walkSpeed;
			}
		}

	}

	drawDebug()
	{
		let pos1 = adjustForCamera(this.x, this.y)
		pos1 = createVector(pos1[0], pos1[1]);
		let yoff = 100;
		let spacing = 15;
		textAlign(CENTER);
		fill(230);
		textSize(spacing);
		textFont("Courier New")
		text("Time Waited: " + this.delayTime, pos1.x, pos1.y - yoff);
		text("Timer Length: " + this.delayWait, pos1.x, pos1.y - yoff + spacing);
		text("Current Position: " + round(pos1.x) + ", " + round(pos1.y), pos1.x, pos1.y - yoff + spacing * 2);
		text("Target Poition: " + round(this.targetx) + ", " + round(this.targety), pos1.x, pos1.y - yoff + spacing * 3);
		text("Current Task: " + this.currentTask, pos1.x, pos1.y - yoff + spacing * 4);
		text("ID: " + this.id, pos1.x, pos1.y - yoff + spacing * 5);
	}

	displayProfile(x, y, w, h)
	{
		// if a size is not provided, default to top right 100 by 100
		if (x == undefined) { x = width - 375; y = 100; w = 300; h = 100 }

		// draw the profile

		// background and formatting
		fill(50, 50, 200, 100);
		stroke(50);
		strokeWeight(3);
		rect(x, y, w, h);
		fill(230);
		stroke(0);
		strokeWeight(1);
		textAlign(LEFT);
		textSize(20);

		// text
		text(this.name + ", " + this.age + " years old", x + 10, y + 25);
		text(this.employeeType, x + 10, y + 55);
		text("Prestige Level: " + this.prestigeLevel, x + 10, y + 85);
	}
}

class task{
	constructor(name, timeRequired, input1, output1){
		this.name = name;
		this.timeRequired = timeRequired;
		this.input = input1;
		this.output1 = output1;
	}
}

class buildingTemplate {
	constructor(name, tasks, drawnImage, shapeXs, shapeYs){
		this.name = name;
		this.tasks = tasks;
		this.drawnImage = drawnImage;
		this.shape = new buildingShape(shapeXs, shapeYs);
	}
}

class buildingShape{
	constructor(xs, ys){
		this.xs = xs;
		this.ys = ys;

		// define minimum and maximum values
		this.minx = 10000000;
		this.maxx = -10000000;
		this.miny = 10000000;
		this.maxy = -10000000;

		// update values to be accurate

		// min/max X
		for(let i = 0; i < this.xs.length; i++){
			// maximum X value
			if(this.xs[i] > this.maxx) this.maxx = this.xs[i];
			
			// minimum X value
			if(this.xs[i] < this.minx) this.minx = this.xs[i];
		}
		
		// min/max Y
		for(let i = 0; i < this.ys.length; i++){
			// maximum Y value
			if(this.ys[i] > this.maxy) this.maxy = this.ys[i];
			
			// minimum Y value
			if(this.ys[i] < this.miny) this.miny = this.ys[i];
		}

		// get Width and Height values for the shape
		this.w = dist(this.minx, 0, this.maxx, 0);
		this.h = dist(this.miny, 0, this.maxy, 0);
	}
	
	drawHighlight(drawFromCenter){
		// draw the outline
		let baseX = inWorldMouseX;
		let baseY = inWorldMouseY;

		if(drawFromCenter == true){
			baseX -= this.w/2;
			baseY -= this.h/2;
		}

		for(let i = 0; i < this.xs.length; i++){

			// math to get relative position in the array

			let drawX = round(baseX+this.xs[i]);
			let drawY = round(baseY+this.ys[i]);

			if(drawX>=0&&drawX<gameTiles.length&&drawY>=0&&drawY<gameTiles[0].length){
				// get the tile at thatposition
				let checkTile = gameTiles[drawX][drawY];

				// set the current fill color to a redder hue
				checkTile.fillColor = [0, 0, 0];

				// push the tile into the current frame tiles
				if(mouseIsDown == false) tilesToReset.push(checkTile);
				else checkTile.baseFillColor = [0, 0, 0];
			}
		}

	}
}

class building {
	constructor(buildingTemplate1, x, y){
		// refference the building template task which 
		this.name = buildingTemplate1.name;
		this.drawnImage = buildingTemplate1.drawnImage;
		this.tasks = buildingTemplate1.tasks;
		this.employees = [];
		this.startX = x;
		this.startY = y;
		this.shape = buildingTemplate1.shape;
	}
}