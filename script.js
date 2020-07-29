// Name any p5.js functions we use in `global` so Glitch can recognize them.
/* global
 *    bodyGame,soundGame,removeSprite,updateSprites,camera,Group,keyWentDown,drawSprites,createSprite,Clickable,drawIntroScreen,SceneManager,loadImage,ESCAPE,textSize,image,VIDEO,createCapture,ml5,HSB, background, color, collideRectRect, colorMode, createCanvas, fill, frameRate, keyCode, height,
 *    loop, noFill, noLoop, noStroke, random, rect, round, stroke, sqrt, text, width
 *    frameCount,UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW,Game
 */

let foregroundImg, backgroundImg, groundImg, title;
let soundMode, bodyMode,howToPlay;
let startGround, ground, endGroud;

function preload() {
  // load background Images
  foregroundImg = loadImage("https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2Fsky_2.png?v=1595568118809");
  backgroundImg = loadImage("https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2Fsky.png?v=1595568225904");
  groundImg = loadImage("https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2Ftop_ground.png?v=1595568970498");
  title = loadImage("https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2FSuper.png?v=1595626658046");
  startGround = loadImage("https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2Fstarting.png?v=1595721097175");
}
function setup() {
  createCanvas(500, 600);
  colorMode(HSB, 360, 100, 100);
  // set up the screen manager
  var mgr = new SceneManager();
  mgr.fImage = foregroundImg;
  mgr.bImage = backgroundImg;
  mgr.gImage = groundImg;
  mgr.title = title;
  mgr.wire();
  mgr.showScene(Intro);
}

function Intro() {
  let bgX = 0; // To scroll the background
  let choice = "";
  this.setup = function() {
    // set up clickable - Button Howtoplay
    howToPlay = new Clickable();
    howToPlay.locate(width / 2 - 50, 330);
    howToPlay.text = "How To Play";
    howToPlay.onHover = function() {
      this.color = "#808080";
      choice = "HowToPlay";
    };
    // set up clickable - Button soundMode
    soundMode = new Clickable();
    soundMode.locate(width / 2 - 50, 390);
    soundMode.text = "Sound Mode";
    soundMode.onHover = function() {
      this.color = "#808080";
      choice = "sound";
    };
    soundMode.onOutside = function() {
      this.color = "#FFFFFF";
      choice = "";
    };
    // set up clickable - Button bodyMode
    bodyMode = new Clickable();
    bodyMode.locate(width / 2 - 50, 450);
    bodyMode.text = "Body Mode";

    bodyMode.onHover = function() {
      this.color = "#808080";
      choice = "body";
    };
    bodyMode.onOutside = function() {
      this.color = "#FFFFFF";
      choice = "";
    };
  };

  this.draw = function() {
    background(210, 90, 100);
    this.showBackground();
    this.moveBackground();
    howToPlay.draw();
    soundMode.draw();
    bodyMode.draw();
  };
  this.mousePressed = function() {
    // Switch to Game scene when user click any of the buttons
    if (choice === "sound") {
      // Make sure user's is on the buttons
      this.sceneManager.showScene(soundGame);
    } else if (choice === "body") {
      this.sceneManager.showScene(bodyGame);
    }else if(choice ==="HowToPlay"){
      //this.sceneManager.showScene(howToPlay);
    }
  };
  this.showBackground = function() {
    image(this.sceneManager.fImage, bgX, 227);
    image(this.sceneManager.bImage, bgX, 255);
    image(this.sceneManager.gImage, bgX, 540);
    image(this.sceneManager.title, 70, 100, 350, 200);
    if (Math.floor(frameCount / 30) % 2 == 0) {
      // A blinking Info
      text("Select mode to start game", width / 2 - 70, height - 20);
    }
  };
  this.moveBackground = function() {
    // Reset bgX when it runs out
    bgX -= 2;
    bgX %= 1024;
  };
}
