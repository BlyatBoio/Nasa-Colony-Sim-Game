function drawMenuUI(){
  // draw background
  let img = bgVideo.get();

  background(img);

  // settings button
  settingsButton.drawSelf();
  if(playGameButton.isPressed() == true) gameState = "In New Game Menu";
  playGameButton.drawSelf();
  if(settingsButton.isPressed() == true) gameState = "In Settings";
}

function drawSettingsUI(){
  // draw background
  let img = bgVideo.get();
  background(img);
  background(0, 0, 0, 100);
  keyBindsButton.drawSelf();
  if(keyBindsButton.isPressed() == true) gameState = "In Keybinds";
  loadBackButton("In Menu");
}

function drawKeybindsUI(){
  // draw background
  let img = bgVideo.get();
  background(img);
  background(0, 0, 0, 100);
  loadBackButton("In Settings");
}

function drawNewGameUI(){
  // draw background
  let img = bgVideo.get();
  background(img);
  background(0, 0, 0, 100);
  loadBackButton("In Menu");
  var json = $.getJSON("defaultGameSave.json");
  console.log()
}

function loadBackButton(backToWhere){
    // backtowhere is a string of the gamestate that you want to reset to when the button is pressed
    // draw the button
    backButton.drawSelf();
    // if escape is pressed or the button is pressed and the back button hasnt already been pressed
    if(goneBack == false && (keyIsDown(27) || backButton.isPressed() == true)) {gameState = backToWhere; goneBack = true;}
}