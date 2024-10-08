let debugModeOn = false;
let gameState = "In Menu";
// In Menu, In Settings, In Keybinds, In Loading Screen, In New Game Menu, In Game, Paused Game

// variables for multi-media
let bgVideo;
let menuMusic1;
let menuMusic2;
let buttonSound1;
let buttonImage1;
let gameFont;
let doMusic = false;

// variables for buttons
let goneBack = false
let settingsButton;
let playGameButton;
let keyBindsButton;
let newGameButton;
let backButton;

// tech tree variables
var onBoardProcessnigTree;

var saveFile1;
var saveFile2;
var saveFile3;
var saveFile4;

var curLoadedGame;

function preload(){
  bgVideo = createVideo("images/AdobeStock_335419604_Video_HD_Preview.mov");
  menuMusic1 = loadSound("Audio/storymatic.ogg");
  menuMusic2 = loadSound("Audio/theClub.ogg");
  buttonSound1 = loadSound("Audio/confirm_style_2_001.wav");
  gameFont = loadFont("images/Teqto-Demo.otf");
  buttonImage1 = loadImage("images/untitled.png");
  buttonHighlight = createImage(100, 100);
}

function setup() {
  //backgroundImage = blackAndWhiteFilter(backgroundImage);
  createCanvas(windowWidth, windowHeight);

  // define buttons
  settingsButton = newButton(width - 250, 350, 200, 50, "Settings", "", true);
  playGameButton = newButton(width - 250, 200, 200, 50, "Play Game", "", true);
  keyBindsButton = newButton(width/2 - 100, height/2 - 100, 200, 50, "Keybinds", "", true);
  newGameButton = newButton(width/2 - 115, 100, 230, 50, "Create Game", "", true);
  backButton = newButton(50, 50, 40, 40, "⟲", "", true);

  // call necesary functions for the menu screen.
  bgVideo.play();
  bgVideo.hide();
  bgVideo.loop();
  if(doMusic == true){
    menuMusic1.play();
    menuMusic1.loop();
  }
  saveFile1 = loadJSON("SaveFiles/saveFile1.json");
  saveFile2 = loadJSON("SaveFiles/saveFile2.json");
  saveFile3 = loadJSON("SaveFiles/saveFile3.json");
  saveFile4 = loadJSON("SaveFiles/saveFile4.json");

  // onboard processing tech tree
  onBoardProcessnigTree = jsonToTreeClass("TechTreeeJsons/onboardProcesingTechTree.json");
}

function draw() {
  textFont(gameFont);
  switch (gameState){
    case "In Menu": drawMenuUI(); break;
    case "In Settings": drawSettingsUI(); break;
    case "In Keybinds": drawKeybindsUI(); break;
    case "In New Game Menu": drawNewGameUI(); break;
    case "In Game": drawGameUI(); break;
  }
  if(debugModeOn == true) drawDebug();
  if(mouseIsPressed == false && keyIsDown(27) == false) goneBack = false;
  fill(230);
  text(onBoardProcessnigTree, 300, 300);
}

function drawDebug(){
  fill(255);
  stroke(0);
  textSize(30);
  text(round(frameRate()), width - 100, 50);
  text(round(mouseX) + ", " + round(mouseY), mouseX, mouseY);
}