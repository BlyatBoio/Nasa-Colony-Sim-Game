
function drawMenuUI(){
 	menuBackground();
	
	textSize(60);
  dropShadowText("Space Adventure (In Adventure Space)", width/2, 75, 4, 4);
	textSize(35);
  dropShadowText("In The Adventure Of Space In That Space Where You Adventure", width/2, 125, 4, 4);
	textSize(25);
  dropShadowText("When Space Adventures In Spacing Adventuring Space Space", width/2, 155, 4, 4);
	textSize(20);
  dropShadowText("Adventure The Space In A Adventure That Space In Space", width/2, 185, 4, 4);
	textSize(17);
  dropShadowText("Adventure Space In Space", width/2, 215, 4, 4);
	
	/*
	textSize(30);
	dropShadowText("Super Pleasant Advancement Construction Engineering Awesome Destruction", width/2, 75, 4, 4);
	textSize(25);
	dropShadowText("Very Exiting Neutral Teritory Unilateral Rienforcement Ecstatic", width/2, 125, 4, 4);
	textSize(20);
	dropShadowText("Awesome Destruction Very Exiting Neutral Teritory Unilateral Rienforcement Ecstatic", width/2, 175, 4, 4);
	textSize(18);
	dropShadowText("Industry Negative Super Pleasant Advancement Construction Engineering", width/2, 225, 4, 4);
	*/
	// settings button
	settingsButton.drawSelf();
	if(playGameButton.isPressed() == true) gameState = "In New Game Menu";
	playGameButton.drawSelf();
	if(settingsButton.isPressed() == true) gameState = "In Settings";
}
  
function drawSettingsUI(){
	menuBackground();
	background(0, 0, 0, 100);
	keyBindsButton.drawSelf();
	if(keyBindsButton.isPressed() == true) gameState = "In Keybinds";
	loadBackButton("In Menu");
}
  
function drawKeybindsUI(){
	menuBackground();
	background(0, 0, 0, 100);
	loadBackButton("In Settings");

}

function drawNewGameUI(){
	// draw things
	menuBackground();
	background(0, 0, 0, 100);
	loadBackButton("In Menu");
	// formatting
	textAlign(CENTER);
	textSize(50);
  dropShadowText("Save Games", width/2, 50, 4, 4);
	newGameButton.drawSelf();
	// save game buttons
	let bx = width/2 - 115;
	let distance1 = 100;
	let by = 100 + distance1;

	// call the button functions
	button(bx, by, 230, 50, saveFile1.formatting.fileName, "Created On: " + saveFile1.formatting.dateCreated, true);
	button(bx, by + distance1, 230, 50, saveFile2.formatting.fileName, "Created On: " + saveFile2.formatting.dateCreated, true);
	button(bx, by + distance1*2, 230, 50, saveFile3.formatting.fileName, "Created On: " + saveFile3.formatting.dateCreated, true);
	button(bx, by + distance1*3, 230, 50, saveFile4.formatting.fileName, "Created On: " + saveFile4.formatting.dateCreated, true);	

	// if these buttons are clicked
	if(isPressed(bx, by, 230, 50) == true) {curLoadedGame = saveFile1; gameState = "In Game";}
	if(isPressed(bx, by + distance1, 230, 50) == true) {curLoadedGame = saveFile2; gameState = "In Game";}
	if(isPressed(bx, by + distance1*2, 230, 50) == true) {curLoadedGame = saveFile3; gameState = "In Game";}
	if(isPressed(bx, by + distance1*3, 230, 50) == true) {curLoadedGame = saveFile4; gameState = "In Game";}

}	

function menuBackground(){
	// draw background
	let img = bgVideo.get();
	background(img);
  textSize(10);
  dropShadowText("Copyright Carter™ 2024", width - 100, height - 20, 2, 2);
}

function drawGameUI(){
	background(255);
	text(curLoadedGame.saveFile.economicDifficulty, 150, 100);
	text(curLoadedGame.saveFile.popularityDifficulty, 150, 150);
	text(curLoadedGame.saveFile.scenario, 150, 250);
	text(curLoadedGame.saveFile.resources.currency, 150, 200);
	statisticBar(width/2 - 200, height - 20, 5, 400, "NO IDEA", 0)
}

function loadBackButton(backToWhere){
	// backtowhere is a string of the gamestate that you want to reset to when the button is pressed
	// draw the button
	textFont('Courier New');
	backButton.drawSelf();
	textFont(gameFont);
	// if escape is pressed or the button is pressed and the back button hasnt already been pressed
	if(goneBack == false && (keyIsDown(27) || backButton.isPressed() == true)) {gameState = backToWhere; goneBack = true;}
}