let debugModeOn = true;
let gameState = "In Menu";
// In Menu, In Settings, In Keybinds, In Loading Screen, In New Game Menu, In Game, Paused Game

// variables for multi-media
let bgVideo;
let menuMusic1;
let menuMusic2;
let buttonSound1;
let doMusic = false;

// variables for buttons
let goneBack = false
let settingsButton;
let playGameButton;
let keyBindsButton;
let backButton;

function preload(){
  bgVideo = createVideo("images/AdobeStock_335419604_Video_HD_Preview.mov");
  menuMusic1 = loadSound("Audio/storymatic.ogg");
  menuMusic2 = loadSound("Audio/theClub.ogg");
  buttonSound1 = loadSound("Audio/confirm_style_2_001.wav");
  buttonHighlight = createImage(100, 100);
}

function setup() {
  //backgroundImage = blackAndWhiteFilter(backgroundImage);
  createCanvas(windowWidth, windowHeight);
  settingsButton = newButton(width - 300, 300, 200, 50, "Settings", "", true);
  playGameButton = newButton(width - 300, 150, 200, 50, "Play Game", "", true);
  keyBindsButton = newButton(width/2 - 100, height/2 - 300, 200, 50, "Keybinds", "", true);
  backButton = newButton(50, 50, 30, 30, "⟲", "", true);
  bgVideo.play();
  bgVideo.hide();
  bgVideo.loop();
  if(doMusic == true){
    menuMusic1.play();
    menuMusic1.loop();
  }
}

function draw() {
  switch (gameState){
    case "In Menu": drawMenuUI(); break;
    case "In Settings": drawSettingsUI(); break;
    case "In Keybinds": drawKeybindsUI(); break;
    case "In New Game Menu": drawNewGameUI(); break;
  }
  if(debugModeOn == true) drawDebug();
  if(mouseIsPressed == false && keyIsDown(27) == false) goneBack = false;

}

function drawDebug(){
  fill(255);
  stroke(0);
  textSize(30);
  text(round(frameRate()), width - 100, 50);
  text(round(mouseX) + ", " + round(mouseY), mouseX, mouseY);
}