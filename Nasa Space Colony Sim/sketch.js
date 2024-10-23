let debugModeOn = false;
let mouseScrolled = 0;
let gameState = "In Menu";
let gameStateHistory = [];
// In Menu, In Settings, In Keybinds, Loading Game, In New Game Menu, In Game, Paused Game, Creating Game

// variables for multi-media
let bgVideo;
let menuMusic1;
let menuMusic2;
let buttonSound1;
let buttonImage1;
let gameFont;
let logoImage;
let doMusic = false;

// variables for buttons
let goneBack = false;
let settingsButton;
let playGameButton;
let keyBindsButton;
let newGameButton;
let resumeGameButton;
let mainMenuButton;
let createGameButton;
let backButton;
let newGameEDiffSlider;
let newGamePDiffSlider;
let newGameScenarioButton;
let newGameWorldSizeSlider;
let debugModeButton;

// tech tree variables
var onBoardProcessnigTree;

var saveFile1;
var saveFile2;
var saveFile3;
var saveFile4;
var defaultJson;

var curLoadedGame;
var curLoadedGameFileName;

// employee Vars
let employeeID = 0;

// arrays to hold the employees 
let allEmployees = [];
let employee1;

// in game time vars
let totalTime = 0;
let dayTimer = 0;
let dayLength = 100;
let isDayTime = true;
// x time for day is reppeated as the night time timer as well

let scenarios = ["Coundown Clock", "Last Chance For Change"];
let curDisplayingScenario = 0;

function preload()
{
  bgVideo = createVideo("images/AdobeStock_335419604_Video_HD_Preview.mov");
  menuMusic1 = loadSound("Audio/storymatic.ogg");
  menuMusic2 = loadSound("Audio/theClub.ogg");
  buttonSound1 = loadSound("Audio/confirm_style_2_001.wav");
  gameFont = loadFont("images/Teqto-Demo.otf");
  buttonImage1 = loadImage("images/untitled.png");
  logoImage = loadImage("images/untitled (3).png");
  buttonHighlight = createImage(100, 100);

  saveFile1 = loadJSON("SaveFiles/saveFile1.json");
  saveFile2 = loadJSON("SaveFiles/saveFile2.json");
  saveFile3 = loadJSON("SaveFiles/saveFile3.json");
  saveFile4 = loadJSON("SaveFiles/saveFile4.json");
  defaultJson = loadJSON("defaultGameSave.json");

  onBoardProcessnigTree = loadJSON("TechTreeJsons/onboardProcesingTechTree.json");
}

function setup()
{
  // define a tile size for the floor grid
  tileSize = 100;
  // make resolution more acceptable for tiling
  let canvasWidth = (floor(windowWidth / tileSize) * tileSize);
  let canvasHeight = (floor(windowHeight / tileSize) * tileSize);

  createCanvas(canvasWidth, canvasHeight);

  // define buttons
  settingsButton = newButton(width - 250, 350, 200, 50, "Settings", "", true);
  playGameButton = newButton(width - 250, 200, 200, 50, "Play Game", "", true);
  keyBindsButton = newButton(width / 2 - 100, height / 2 - 100, 200, 50, "Keybinds", "", true);
  newGameButton = newButton(width / 2 - 115, 100, 230, 50, "Create Game", "", true);
  resumeGameButton = newButton(width / 2 - 100, height/2 - 150, 200, 50, "Resume Game", "", true);
  mainMenuButton = newButton(width / 2 - 100, height/2 - 80, 200, 50, "Main Menu", "", true);
  createGameButton = newButton(width / 2 - 100, 525, 200, 50, "Create Game", "", true);
  debugModeButton = newButton(width / 2 - 100, height/2, 200, 50, "Debug Mode", "", true);
  backButton = newButton(50, 50, 40, 40, "⟲", "", true);

  newGameEDiffSlider = createSlider(1, 5, 3, 1);
  newGameEDiffSlider.position(width/2 - 100, 225);
  newGameEDiffSlider.size(200);
  newGameEDiffSlider.hide();

  newGamePDiffSlider = createSlider(1, 5, 3, 1);
  newGamePDiffSlider.position(width/2 - 100, 300);
  newGamePDiffSlider.size(200);
  newGamePDiffSlider.hide();

  newGameWorldSizeSlider = createSlider(50, 1000, 200, 50);
  newGameWorldSizeSlider.position(width/2 - 100, 440);
  newGameWorldSizeSlider.size(200);
  newGameWorldSizeSlider.hide();

  newGameScenarioButton = newButton(width/2- 200, 350, 400, 50, "", "", true);
  newGameJson = defaultJson;

  // define inputs for creating a new game
  newGameNameInp = createInput("New Game");
  newGameNameInp.hide();
  newGameNameInp.position(width/2 - 150, 150);
  newGameNameInp.size(100);

  newGameSeedInp = createInput(round(random(100000, 200000)));
  newGameSeedInp.hide();
  newGameSeedInp.position(width/2 + 50, 150);
  newGameSeedInp.size(100);

  // call necesary functions for the menu screen.
  bgVideo.play();
  bgVideo.hide();
  bgVideo.loop();
  if (doMusic == true)
  {
    menuMusic1.play();
    menuMusic1.loop();
  }

  // onboard processing tech tree
  onBoardProcessnigTree = jsonToTreeClass(onBoardProcessnigTree);
}

function draw()
{
  // formatting
  textFont(gameFont);
  textAlign(CENTER);
  // game-state engine to determine what is called
  switch (gameState)
  {
    case "In Game": drawGameUI(); break;
    case "Loading Game": createGameFloor(); break;
    case "Paused Game": drawGameUI(); break;
    case "In Menu": drawMenuUI(); break;
    case "In New Game Menu": drawNewGameUI(); break;
    case "In Settings": drawSettingsUI(); break;
    case "In Keybinds": drawKeybindsUI(); break;
    case "Creating Game": drawCreateGameUI(); break;
  }
  // debug modes and reseting the goneBack variable for buttons
  if (debugModeOn == true) drawDebug();
  if (mouseIsPressed == false && keyIsDown(27) == false) goneBack = false;
  mouseScrolled = 0;
}

function drawDebug()
{
  textAlign(LEFT);
  fill(255);
  stroke(0);
  textSize(30);
  text(round(frameRate()), width - 100, 50);
  text(round(mouseX) + ", " + round(mouseY), mouseX, mouseY);
  text("Camera Pos: " + -round(cameraX) + ", " + -round(cameraY) + ", " + cameraScale, 100, 100);
}

function updateGame()
{
  for (let i = 0; i < allEmployees.length; i++)
  {
    allEmployees[i].handleMovement();
  }
}