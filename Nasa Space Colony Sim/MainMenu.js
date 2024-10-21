
function drawMenuUI(){
  menuBackground();
 
  /*
  Funny Title
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
 */
 
 // actual title
 textSize(100);
 dropShadowText("Celestial Horizons", width/2, 75, 4, 4);
 textSize(50);
 dropShadowText("Beyond the Skies", width/2, 145, 4, 4);

 // acronym version of "Space Adventure Adventure In Space"
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
 if(isPressed(bx, by, 230, 50) == true) {loadSaveFile(saveFile1)} else
 if(isPressed(bx, by + distance1, 230, 50) == true) {loadSaveFile(saveFile2)} else
 if(isPressed(bx, by + distance1*2, 230, 50) == true) {loadSaveFile(saveFile3)} else
 if(isPressed(bx, by + distance1*3, 230, 50) == true) {loadSaveFile(saveFile4)}

}	

function loadSaveFile(file1){
 curLoadedGame = file1; 

 // load the employees array
 allEmployees = [];
 for(let i = 0; i < file1.saveFile.workers.interns; i++){
   allEmployees.push(new Employee("Intern"));
 }
 for(let i = 0; i < file1.saveFile.workers.engineers; i++){
   allEmployees.push(new Employee("Engineer"));
 }
 for(let i = 0; i < file1.saveFile.workers.managers; i++){
   allEmployees.push(new Employee("Manager"));
 }
 for(let i = 0; i < file1.saveFile.workers.astronauts; i++){
   allEmployees.push(new Employee("Astronaut"));
 }

 gameState = "In Game"; 
 bgVideo.stop();
}

function menuBackground(){
 // draw background
 let img = bgVideo.get();
 background(img);
 textSize(10);
 dropShadowText("Copyright Carter™ 2024", width - 100, height - 20, 2, 2);
}

function drawGameUI(){
 dayNightHandler();
 drawFloor();

 // bottom right UI
 let startX = width - 200;
 let startY = height - 125;
 fill(50, 50, 200, 150);
 stroke(0);
 // overly complicated way to draw a rectangle around the text
 rect(startX - 15, startY - 25, -1 * (startX - width + 5) - 40, -1 * (startY - height) - 10)

 // text describing the employees you have
 fill(230);
 stroke(0);
 textAlign(LEFT);
 textSize(15);
 text("Interns: " + curLoadedGame.saveFile.workers.interns, startX, startY);
 text("Engineers: " + curLoadedGame.saveFile.workers.engineers, startX, startY + 25);
 text("Managers: " + curLoadedGame.saveFile.workers.managers, startX, startY + 50);
 text("Astronauts: " + curLoadedGame.saveFile.workers.astronauts, startX, startY + 75);

 
 // in game updates
 if(gameState == "In Game"){
   updateGame();
   for(let i = 0; i < allEmployees.length; i++){
     if(allEmployees[i].isDisplayingProfile == true) { allEmployees[i].displayProfile(); break;}
   }
   if(goneBack == false && keyIsDown(27)) {gameState = "Paused Game"; goneBack = true;}
 }

 // pause menu
 else {
   // dark Overlay
   fill(0, 0, 0, 100);
   rect(0, 0, width, height);

   // exiting the menu buttons and if ESC is pressed
   resumeGameButton.drawSelf();
   if(goneBack == false && keyIsDown(27)) {gameState = "In Game"; goneBack = true;}
   if(resumeGameButton.isPressed() == true) gameState = "In Game";

   // main menu button
   mainMenuButton.drawSelf();
   if(mainMenuButton.isPressed() == true) {gameState = "In Menu"; bgVideo.play();};
 }
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
