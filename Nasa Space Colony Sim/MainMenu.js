// vars for creating a game
let newGameNameInp;
let newGameSeedInp;
let newGameJson;
let scenarioSwapped = false;

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
 debugButton.drawSelf();
 if(debugButton.isPressed() == true) {debugModeOn = !debugModeOn; gameState = "In Menu"}
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
  if(isPressed(bx, by, 230, 50) == true && saveFile1.Loadable != 0) loadSaveFile(saveFile1); else
  if(isPressed(bx, by + distance1, 230, 50) == true && saveFile2.Loadable != 0) loadSaveFile(saveFile2); else
  if(isPressed(bx, by + distance1*2, 230, 50) == true && saveFile3.Loadable != 0) loadSaveFile(saveFile3); else
  if(isPressed(bx, by + distance1*3, 230, 50) == true && saveFile4.Loadable != 0) loadSaveFile(saveFile4);
  if(newGameButton.isPressed() == true) {
    gameState = "Creating Game";
    newGameNameInp.value(defaultJson.formatting.fileName);
    newGameSeedInp.value(round(random(100000, 999999)));
    newGameEDiffSlider.value(defaultJson.saveFile.economicDifficulty);
    newGamePDiffSlider.value(defaultJson.saveFile.popularityDifficulty);
    newGameWorldSizeSlider.value(150);
  }
  loadBackButton("In Menu");
}	

function drawCreateGameUI(){
  // background
  menuBackground();
  background(0, 0, 0, 100);

  // Visuals
  newGameNameInp.show();
  newGameSeedInp.show();
  let date = Date();
  let displayDate = "";
  for(let i = 4; i < 15; i++){
    if(i == 7 || i == 10) displayDate+="/";
    else displayDate += date[i];
  }
  // update values in the loaded JSON
  
  // formatting
  textSize(50); 
  textAlign(CENTER);
  dropShadowText(newGameNameInp.value(), width/2, 50);
  textSize(20);
  dropShadowText(displayDate, width/2, 80);
  dropShadowText("Name", width/2 - 100, 140);
  dropShadowText("Seed", width/2 + 100, 140);
  newGameEDiffSlider.show();
  dropShadowText("Economic Difficulty: " + newGameEDiffSlider.value(), width/2, 215);
  newGamePDiffSlider.show();
  dropShadowText("Popularity Difficulty: " + newGamePDiffSlider.value(), width/2, 290);
  newGameWorldSizeSlider.show();
  dropShadowText("World Size: " + newGameWorldSizeSlider.value(), width/2, 430);
  newGameScenarioButton.drawSelf();
  fill(230);
  stroke(0);
  textSize(20);
  textAlign(CENTER);
  dropShadowText("Current Scenario:", width/2, 370);
  dropShadowText(scenarios[curDisplayingScenario], width/2, 395);
  if(newGameScenarioButton.isPressed() == true && scenarioSwapped == false) {curDisplayingScenario ++; scenarioSwapped = true;}
  if(curDisplayingScenario > scenarios.length-1) curDisplayingScenario = 0;
  if(newGameScenarioButton.isPressed() == false) scenarioSwapped = false;
  loadBackButton();

  createGameButton.drawSelf();
  if(createGameButton.isPressed() == true){
    // update the JSON file
    newGameJson.formatting.fileName = newGameNameInp.value();
    newGameJson.saveFile.noiseSeed = newGameSeedInp.value();
    newGameJson.formatting.dateCreated = displayDate;
    newGameJson.saveFile.economicDifficulty = newGameEDiffSlider.value();
    newGameJson.saveFile.popularityDifficulty = newGamePDiffSlider.value();
    mapWidth = newGameWorldSizeSlider.value();
    mapHeight = newGameWorldSizeSlider.value();
    newGameJson.saveFile.scenario = scenarios[curDisplayingScenario];

    newGameNameInp.hide();
    newGameSeedInp.hide();
    newGameEDiffSlider.hide();
    newGamePDiffSlider.hide();
    newGameWorldSizeSlider.hide();

    if(saveFile1.Loadable == 0) {saveFile1 = newGameJson; loadSaveFile(saveFile1)} else
    if(saveFile2.Loadable == 0) {saveFile2 = newGameJson; loadSaveFile(saveFile2)} else
    if(saveFile3.Loadable == 0) {saveFile3 = newGameJson; loadSaveFile(saveFile3)} else
    if(saveFile4.Loadable == 0) {saveFile4 = newGameJson; loadSaveFile(saveFile4)} 
  }
}

function loadSaveFile(file1){
  curLoadedGame = file1; 
  curLoadedGameFileName = file1.formatting.refferencePath; 
  totalTilesCreated = 0;
  gameTiles = new2dArray(mapWidth, mapHeight);
  file1.saveFile.resources.currency = round(500000 / file1.saveFile.economicDifficulty / 10000) * 10000;


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

 gameState = "Loading Game"; 
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
  // update the floor tiles to reset them
  // draw the background called in the gameDraw.JS file
  drawFloor();
  dayNightHandler();
  // in game updates
  if(gameState == "In Game"){
    updateGame();
    let profileDrawn = false
    for(let i = 0; i < allEmployees.length; i++){
      let pos = adjustForCamera(allEmployees[i].x, allEmployees[i].y);
      if(pos[0] < width && pos[0] > -64 * cameraScale && pos[1] < height && pos[1] > -90 * cameraScale){
        if(allEmployees[i].isDisplayingProfile == true && profileDrawn == false) {allEmployees[i].displayProfile(); profileDrawn = true;}
        allEmployees[i].drawSelf();
      }
    }
    if(goneBack == false && keyIsDown(27)) {gameState = "Paused Game"; goneBack = true;}
  }
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

  // describe your current stats such as money, the daytime
  fill(50, 50, 200, 100);
  rect(20, 20, width-40, 50);
  fill(230);
  stroke(0);
  dropShadowText("Xebulence: " + curLoadedGame.saveFile.resources.currency, 40, 40);
  textFont("Courier New");
  buildMenuButton.drawSelf();
  textFont(gameFont);

  // pause menu
  if(gameState != "In Game") {
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

  let t1 = tileSize*cameraScale;
  let c1 = cameraScale-1;

  if(inWorldMouseX >= 0 && inWorldMouseX < gameTiles.length-1 && inWorldMouseY >= 0 && inWorldMouseY < gameTiles[0].length){
    gameTiles[inWorldMouseX][inWorldMouseY].resetColor();
  }

  // inWorldMouseX and Y are

  // the tDist accounts for the scaling around the center done by camera controls
  // /cameraScale adjusts this to make sure the cursor moves the appropriate ammount at higher and lower scale
  // /tileSize accounts for the fact that the transformation is being placed into the grid form where the array position is / tilesize
  // + 5 and + 2 is an offset that workse for some reason
  // round in order to make sure you dont refference array[5.3] or something like it
  
  inWorldMouseX = round((((tDist(mouseX, width/2)/cameraScale) - cameraX)/tileSize) + 5);
  inWorldMouseY = round((((tDist(mouseY, height/2)/cameraScale) - cameraY)/tileSize) + 2);
  // buffer to reset the tiles that were tinted red but now no longer need to be
  fill(255);
  for(let i = 0; i < tilesToReset.length; i++){
    tilesToReset[i].fillColor = tilesToReset[i].baseFillColor;
  }

  tilesToReset = [];  
}

function loadBackButton(backToWhere){
  // backtowhere is a string of the gamestate that you want to reset to when the button is pressed
  // draw the button
  textFont('Courier New');
  backButton.drawSelf();
  textFont(gameFont);
  // if escape is pressed or the button is pressed and the back button hasnt already been pressed
  if(goneBack == false && (keyIsDown(27) || backButton.isPressed() == true)) {
    if(backToWhere != undefined) {gameState = backToWhere; goneBack = true;}
    else {gameState = gameStateHistory[gameStateHistory.length - 1]; gameStateHistory.shift()};
  }
}
