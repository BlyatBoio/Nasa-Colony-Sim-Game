let buttonHighlight;
let menus = [];
let menuID = 0;

function newButton(x, y, w, h, text, subtext, doHighlight, bgImage)
{
let b1 = new buttonUI(x, y, w, h, text, subtext, doHighlight, bgImage);
  return b1;
}

class buttonUI
{
  constructor(x, y, w, h, text, subtext, doHighlight, bgImage, doDraw, callBackFunction)
  {
		// position and size
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		// text to draw and text to draw when hovered
		this.text = text;
		this.subtext = subtext;

		// if it highlights when the mouse gets closer
		this.doHighlight = doHighlight;

		// background image handling.
		this.bgImage = bgImage;
		this.doBgImage = true;
		this.doDraw = doDraw;
		// drawing variables
		if(this.doDraw == undefined) this.doDraw = true;
		if (this.bgImage == undefined) this.doBgImage = false;
		this.callBackFunction = callBackFunction;
	}
  drawSelf()
  {
		// draw the background;
		if(this.doDraw == true){
			noStroke();
			fill(50, 50, 200, 100);
			if (this.doBgImage == true) image(this.bgImage, this.x, this.y);
			else rect(this.x, this.y, this.w, this.h);

			// draw the text and subtext
			textAlign(CENTER);
			textSize(25);
			dropShadowText(this.text, this.x + this.w / 2, this.y + this.h / 2 + 7, 3, 5);

			if (collc(this.x, this.y, this.w, this.h, mouseX, mouseY, 1, 1, 150, 159) == true);
			{
				// do highlighting for when mouse gets close
				if(this.doHighlight == true) this.drawHighlight();

				if (collc(this.x, this.y, this.w, this.h, mouseX, mouseY, 1, 1))
				{
					// draw subtext
					textSize(15);
					fill(230);
					text(this.subtext, this.x + this.w - 40, this.y - 10);
				}
			}

			if (this.isPressed())
			{
				fill(0, 0, 0, 100);
				strokeWeight(3);
				stroke(0);
				rect(this.x, this.y, this.w, this.h);
				strokeWeight(1);
			}
		}
		// if a call-back function is provided, run said function when pressed
		if(this.isPressed() && this.callBackFunction != undefined) this.runCallBackFunction();
	}
	isPressed()
	{
		return collc(this.x, this.y, this.w, this.h, mouseX, mouseY, 10, 10) == true && mouseIsPressed && mouseButton == LEFT;
	}
	drawHighlight()
	{
		// get istance from the mouse to the center of the button
		let dx = dist(mouseX, 0, this.x + this.w / 2, 0);
		let dy = dist(mouseY, 0, this.y + this.h / 2, 0);
		let maxAlpha = 150;
		// map the distance from the max istance of 300 down to a range of 0 -the max number
		dx = map(dx, 0, this.w, 0, maxAlpha / 2);
		dy = map(dy, 0, this.h, 0, maxAlpha / 2);
		let totalAlpha = maxAlpha - (dx + dy);

		// load in the pixels to be eddited
		buttonHighlight.loadPixels();

		for (let i = 0; i < buttonHighlight.pixels.length; i += 4)
		{
			buttonHighlight.pixels[i] = 150;
			buttonHighlight.pixels[i + 1] = 150;
			buttonHighlight.pixels[i + 2] = 150;
			buttonHighlight.pixels[i + 3] = totalAlpha;
		}

		// update the image
		buttonHighlight.updatePixels();

		// draw the image
		image(buttonHighlight, this.x, this.y, this.w, this.h);
	}
	runCallBackFunction(){
		let f1 = eval(this.callBackFunction);
		f1();
	}
}

function isPressed(x, y, w, h){
	return collc(x, y, w, h, mouseX, mouseY, 10, 10) == true && mouseIsPressed && mouseButton == LEFT;
}

function drawHighlight(x, y, w, h){
	// get istance from the mouse to the center of the button
	let dx = dist(mouseX, 0, x + w / 2, 0);
	let dy = dist(mouseY, 0, y + h / 2, 0);
	let maxAlpha = 150;
	// map the distance from the max istance of 300 down to a range of 0 -the max number
	dx = map(dx, 0, w, 0, maxAlpha / 2);
	dy = map(dy, 0, h, 0, maxAlpha / 2);
	let totalAlpha = maxAlpha - (dx + dy);

	// load in the pixels to be eddited
	buttonHighlight.loadPixels();

	for (let i = 0; i < buttonHighlight.pixels.length; i += 4)
	{
		buttonHighlight.pixels[i] = 150;
		buttonHighlight.pixels[i + 1] = 150;
		buttonHighlight.pixels[i + 2] = 150;
		buttonHighlight.pixels[i + 3] = totalAlpha;
	}

	// update the image
	buttonHighlight.updatePixels();

	// draw the image
	image(buttonHighlight, x, y, w, h);
}

function button(x, y, w, h, text1, subtext1, doHighlight, bgImage){
	let doBgImage = true;
	if(bgImage == undefined) doBgImage = false; 

	// draw the background;
	noStroke();
	fill(50, 50, 200, 100);
	if (doBgImage == true) image(bgImage, x, y);
	else rect(x, y, w, h);

	// draw the text and subtext
	textAlign(CENTER);
	textSize(25);
	dropShadowText(text1, x + w / 2, y + h / 2 + 7, 3, 5);

	if (collc(x, y, w, h, mouseX, mouseY, 1, 1, 150, 159) == true);
	{
		// do highlighting for when mouse gets close
		if(doHighlight == true) drawHighlight(x, y, w, h);

		if (collc(x, y, w, h, mouseX, mouseY, 1, 1))
		{
			// draw subtext
			textSize(15);
			fill(230);
			text(subtext1, x + w - 40, y - 10);
		}
	}

	if (isPressed(x, y, w, h))
	{
		fill(0, 0, 0, 100);
		strokeWeight(3);
		stroke(0);
		rect(x, y, w, h);
		strokeWeight(1);
	}	
}