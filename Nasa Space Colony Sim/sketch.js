let debugModeOn = true;
let gameState = "In Menu";
// In Menu, In Settings, In Game, Paused Game
let settingsButton;

function preload(){
  backgroundImage = loadImage("Images/Screenshot 2024-10-04 114058.png");
  buttonHighlight = createImage(100, 100);
}

function setup() {
  //backgroundImage = blackAndWhiteFilter(backgroundImage);
  createCanvas(1080, 580);
  settingsButton = new buttonUI(100, 100, 200, 50, "Test Button", "Test Subtext", true);
}

function draw() {
  if(gameState == "In Menu") drawMenuUI();
  if(gameState == "In Settings") drawSettingsUI();
}
