// vars for creating a game
let newGameNameInp;
let newGameSeedInp;
let newGameJson;
let scenarioSwapped = false;

let debugButtonPressed = false;

function drawMenuUI()
{
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
  dropShadowText("Celestial Horizons", width / 2, 75, 4, 4);
  textSize(50);
  dropShadowText("Beyond the Skies", width / 2, 145, 4, 4);

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
  if (playGameButton.isPressed() == true) gameState = "In New Game Menu";
  playGameButton.drawSelf();
  if (settingsButton.isPressed() == true) gameState = "In Settings";
}

function drawSettingsUI()
{
  menuBackground();
  background(0, 0, 0, 100);
  keyBindsButton.drawSelf();
  if (keyBindsButton.isPressed() == true) gameState = "In Keybinds";
  debugModeButton.drawSelf();
  if (debugModeButton.isPressed() == true && debugButtonPressed == false) { debugModeOn = !debugModeOn; debugButtonPressed = true; }
  if (debugModeButton.isPressed() == false) debugButtonPressed = false;
  loadBackButton("In Menu");
}

function drawKeybindsUI()
{
  menuBackground();
  background(0, 0, 0, 100);
  loadBackButton("In Settings");

}

function drawNewGameUI()
{
  // draw things
  menuBackground();
  background(0, 0, 0, 100);
  loadBackButton("In Menu");
  // formatting
  textAlign(CENTER);
  textSize(50);
  dropShadowText("Save Games", width / 2, 50, 4, 4);
  newGameButton.drawSelf();
  // save game buttons
  let bx = width / 2 - 115;
  let distance1 = 100;
  let by = 100 + distance1;

  // call the button functions
  button(bx, by, 230, 50, saveFile1.formatting.fileName, "Created On: " + saveFile1.formatting.dateCreated, true);
  button(bx, by + distance1, 230, 50, saveFile2.formatting.fileName, "Created On: " + saveFile2.formatting.dateCreated, true);
  button(bx, by + distance1 * 2, 230, 50, saveFile3.formatting.fileName, "Created On: " + saveFile3.formatting.dateCreated, true);
  button(bx, by + distance1 * 3, 230, 50, saveFile4.formatting.fileName, "Created On: " + saveFile4.formatting.dateCreated, true);

  // if these buttons are clicked
  if (isPressed(bx, by, 230, 50) == true && saveFile1.Loadable != 0) loadSaveFile(saveFile1); else
    if (isPressed(bx, by + distance1, 230, 50) == true && saveFile2.Loadable != 0) loadSaveFile(saveFile2); else
      if (isPressed(bx, by + distance1 * 2, 230, 50) == true && saveFile3.Loadable != 0) loadSaveFile(saveFile3); else
        if (isPressed(bx, by + distance1 * 3, 230, 50) == true && saveFile4.Loadable != 0) loadSaveFile(saveFile4);
  if (newGameButton.isPressed() == true)
  {
    gameState = "Creating Game";
    newGameNameInp.value(defaultJson.formatting.fileName);
    newGameSeedInp.value(round(random(100000, 999999)));
    newGameEDiffSlider.value(defaultJson.saveFile.economicDifficulty);
    newGamePDiffSlider.value(defaultJson.saveFile.popularityDifficulty);
    newGameWorldSizeSlider.value(150);
  }
}

function drawCreateGameUI()
{
  // background
  menuBackground();
  background(0, 0, 0, 100);

  // Visuals
  newGameNameInp.show();
  newGameSeedInp.show();
  let date = Date();
  let displayDate = "";
  for (let i = 4; i < 15; i++)
  {
    if (i == 7 || i == 10) displayDate += "/";
    else displayDate += date[i];
  }
  // update values in the loaded JSON

  // formatting
  textSize(50);
  textAlign(CENTER);

  // draw the title
  dropShadowText(newGameNameInp.value(), width / 2, 50);
  textSize(20);
  // name and seed input
  dropShadowText(displayDate, width / 2, 80);
  dropShadowText("Name", width / 2 - 100, 140);
  dropShadowText("Seed", width / 2 + 100, 140);

  // difficulty sliders
  newGameEDiffSlider.show();
  dropShadowText("Economic Difficulty: " + newGameEDiffSlider.value(), width / 2, 215);
  newGamePDiffSlider.show();
  dropShadowText("Popularity Difficulty: " + newGamePDiffSlider.value(), width / 2, 290);
  newGameWorldSizeSlider.show();
  dropShadowText("World Size: " + newGameWorldSizeSlider.value(), width / 2, 430);
  newGameScenarioButton.drawSelf();

  // formatting
  fill(230);
  stroke(0);
  textSize(20);
  textAlign(CENTER);

  // scenario button
  dropShadowText("Current Scenario:", width / 2, 370);
  dropShadowText(scenarios[curDisplayingScenario], width / 2, 395);
  if (newGameScenarioButton.isPressed() == true && scenarioSwapped == false) { curDisplayingScenario++; scenarioSwapped = true; }
  if (curDisplayingScenario > scenarios.length - 1) curDisplayingScenario = 0;
  if (newGameScenarioButton.isPressed() == false) scenarioSwapped = false;

  // backtowhere is a string of the gamestate that you want to reset to when the button is pressed
  // draw the button
  textFont('Courier New');
  backButton.drawSelf();
  textFont(gameFont);
  // if escape is pressed or the button is pressed and the back button hasnt already been pressed
  if (goneBack == false && (keyIsDown(27) || backButton.isPressed() == true))
  {
    gameState = "In New Game Menu"; goneBack = true;
    newGameNameInp.hide();
    newGameSeedInp.hide();
    newGameEDiffSlider.hide();
    newGamePDiffSlider.hide();
    newGameWorldSizeSlider.hide();
  }

  createGameButton.drawSelf();
  if (createGameButton.isPressed() == true)
  {
    // update the JSON file
    newGameJson.formatting.fileName = newGameNameInp.value();
    newGameJson.saveFile.noiseSeed = newGameSeedInp.value();
    newGameJson.formatting.dateCreated = displayDate;
    newGameJson.saveFile.economicDifficulty = newGameEDiffSlider.value();
    newGameJson.saveFile.popularityDifficulty = newGamePDiffSlider.value();
    newGameJson.saveFile.scenario = scenarios[curDisplayingScenario];

    newGameNameInp.hide();
    newGameSeedInp.hide();
    newGameEDiffSlider.hide();
    newGamePDiffSlider.hide();
    newGameWorldSizeSlider.hide();

    if (saveFile1.Loadable == 0) { saveFile1 = newGameJson; loadSaveFile(saveFile1); } else
      if (saveFile2.Loadable == 0) { saveFile2 = newGameJson; loadSaveFile(saveFile2); } else
        if (saveFile3.Loadable == 0) { saveFile3 = newGameJson; loadSaveFile(saveFile3); } else
          if (saveFile4.Loadable == 0) { saveFile4 = newGameJson; loadSaveFile(saveFile4); }
          else console.log("Save Files Full Unable To Create New Game");
  }
}

function loadSaveFile(file1)
{
  curLoadedGame = file1;
  curLoadedGameFileName = file1.formatting.refferencePath;
  totalTilesCreated = 0;
  gameTiles = new2dArray(mapWidth, mapHeight);

  // load the employees array
  allEmployees = [];
  for (let i = 0; i < file1.saveFile.workers.interns; i++)
  {
    allEmployees.push(new Employee("Intern"));
  }
  for (let i = 0; i < file1.saveFile.workers.engineers; i++)
  {
    allEmployees.push(new Employee("Engineer"));
  }
  for (let i = 0; i < file1.saveFile.workers.managers; i++)
  {
    allEmployees.push(new Employee("Manager"));
  }
  for (let i = 0; i < file1.saveFile.workers.astronauts; i++)
  {
    allEmployees.push(new Employee("Astronaut"));
  }

  gameState = "Loading Game";
  bgVideo.stop();
}

function menuBackground()
{
  // draw background
  let img = bgVideo.get();
  background(img);
  textSize(10);
  dropShadowText("Copyright Carter™ 2024", width - 100, height - 20, 2, 2);
}

function drawGameUI()
{
  drawFloor();
  dayNightHandler();

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
  if (gameState == "In Game")
  {
    //updateGame();
    for (let i = 0; i < allEmployees.length; i++)
    {
      //if(allEmployees[i].isDisplayingProfile == true) { allEmployees[i].displayProfile(); break;}
    }
    if (goneBack == false && keyIsDown(27)) { gameState = "Paused Game"; goneBack = true; }
  }

  // pause menu
  else
  {
    // dark Overlay
    fill(0, 0, 0, 100);
    rect(0, 0, width, height);

    // exiting the menu buttons and if ESC is pressed
    resumeGameButton.drawSelf();
    if (goneBack == false && keyIsDown(27)) { gameState = "In Game"; goneBack = true; }
    if (resumeGameButton.isPressed() == true) gameState = "In Game";

    // main menu button
    mainMenuButton.drawSelf();
    if (mainMenuButton.isPressed() == true) { gameState = "In Menu"; bgVideo.play(); };
  }
}

function loadBackButton(backToWhere)
{
  // backtowhere is a string of the gamestate that you want to reset to when the button is pressed
  // draw the button
  textFont('Courier New');
  backButton.drawSelf();
  textFont(gameFont);
  // if escape is pressed or the button is pressed and the back button hasnt already been pressed
  if (goneBack == false && (keyIsDown(27) || backButton.isPressed() == true))
  {
    if (backToWhere != undefined) { gameState = backToWhere; goneBack = true; }
    else { gameState = gameStateHistory[gameStateHistory.length - 1]; gameStateHistory.shift() };
  }
}
