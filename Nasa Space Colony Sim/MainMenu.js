let backgroundImage;

function drawMenuUI(){
  // draw background
  background(backgroundImage);

  // settings button
  settingsButton.drawSelf();
  if(settingsButton.isPressed() == true) gameState = "In Settings";
}

function drawSettingsUI(){
  background(backgroundImage);

}