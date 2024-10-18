let employeeNames = ["Jared", "Michael", "Dina", "Jeremy", "Derek", "Kiera", "Marie", "Daryl", "Johnson", "Lucy", "Pam", "Eric", "Diana", "Ronald", "Donald", "Mary", "Michele", "ZEUS DESTORYER OF WORLDS"];
let employeeSelected = false;

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
		this.x = random(0, width);
		this.y = random(0, height);
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
		rect(this.x, this.y, 15, 40);
		if (collc(mouseX, mouseY, 10, 10, this.x, this.y, 15, 40, 15, 15) == true) { noFill(); stroke(255); rect(this.x, this.y, 15, 40); this.isDisplayingProfile = true; }

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
				this.targetx = constrain(random(this.x - 200, this.x + 200), 0, width - 15);
				this.targety = constrain(random(this.y - 200, this.y + 200), 0, height - 40);
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
		let yoff = 100;
		let spacing = 15;
		textAlign(CENTER);
		fill(230);
		textSize(spacing);
		textFont("Courier New")
		text("Time Waited: " + this.delayTime, this.x, this.y - yoff);
		text("Timer Length: " + this.delayWait, this.x, this.y - yoff + spacing);
		text("Current Position: " + round(this.x) + ", " + round(this.y), this.x, this.y - yoff + spacing * 2);
		text("Target Poition: " + round(this.targetx) + ", " + round(this.targety), this.x, this.y - yoff + spacing * 3);
		text("Current Task: " + this.currentTask, this.x, this.y - yoff + spacing * 4);
		text("ID: " + this.id, this.x, this.y - yoff + spacing * 5);
	}

	displayProfile(x, y, w, h)
	{
		// if a size is not provided, default to top right 100 by 100
		if (x == undefined) { x = width - 375; y = 50; w = 300; h = 100 }

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