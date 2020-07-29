// Name any p5.js functions we use in `global` so Glitch can recognize them.
/* global
 *    soundFormats,Gameover,textAlign,CENTER,textFont,Instruction,bodyGame,soundGame,removeSprite,updateSprites,camera,Group,keyWentDown,drawSprites,createSprite,Clickable,drawIntroScreen,SceneManager,loadImage,ESCAPE,textSize,image,VIDEO,createCapture,ml5,HSB, background, color, collideRectRect, colorMode, createCanvas, fill, frameRate, keyCode, height,
 *    loadSound,loop, noFill, noLoop, noStroke, random, rect, round, stroke, sqrt, text, width
 *    frameCount,UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW,Game
 */

// Variables for Intro
let foregroundImg, backgroundImg, groundImg, title;
let soundMode, bodyMode,howToPlay; // Buttons
let introSong
// Variables for Game
let coin1Img,coin2Img,coin3Img,coin4Img,marioJumpImg,marioRun1Img,marioRun2Img,marioRun3Img,marioRun4Img;
//let imageModelURL ="https://teachablemachine.withgoogle.com/models/GEQao0cv0/";
function preload() {
  // set the global sound format
  soundFormats('mp3')
  // load background Images for Intro Scene
  foregroundImg = loadImage("https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2Fsky_2.png?v=1595568118809");
  backgroundImg = loadImage("https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2Fsky.png?v=1595568225904");
  groundImg = loadImage("https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2Ftop_ground.png?v=1595568970498");
  title = loadImage("https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2FSuper.png?v=1595626658046");
  // Load Materials for bodyGame and soundGame scene 
  coin1Img = loadImage("https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2Fcoins_01.png?v=1595864834355")
  coin2Img = loadImage("https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2Fcoins_02.png?v=1595864834664")
  coin3Img = loadImage("https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2Fcoins_03.png?v=1595864834265")
  coin4Img = loadImage("https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2Fcoins_04.png?v=1595864834678")
  marioJumpImg = loadImage("https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2FJumping-mario.png?v=1595741095055")
  marioRun1Img = loadImage("https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2FRunning-mario_01.png?v=1595741137506");
  marioRun2Img = loadImage("https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2FRunning-mario_02.png?v=1595799759140");
  marioRun3Img = loadImage("https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2FRunning-mario_03.png?v=1595799765213");
  marioRun4Img = loadImage("https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2FStanding-mario.png?v=1595741033822");
}
function setup() {
  createCanvas(500, 600);
  colorMode(HSB, 360, 100, 100);
  // set up the screen manager
  var mgr = new SceneManager();
  // For Intro Scene
  mgr.fImage = foregroundImg;
  mgr.bImage = backgroundImg;
  mgr.gImage = groundImg;
  mgr.title = title;
  // For Game Scene
  mgr.coin1Img = coin1Img;
  mgr.coin2Img = coin2Img;
  mgr.coin3Img = coin3Img;
  mgr.coin4Img = coin4Img;
  mgr.marioJumpImg = marioJumpImg;
  mgr.marioRun1Img = marioRun1Img
  mgr.marioRun2Img = marioRun2Img
  mgr.marioRun3Img = marioRun3Img
  mgr.marioRun4Img = marioRun4Img
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
    howToPlay.onOutside = function() {
      this.color = "#FFFFFF";
      choice = "";
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
    ///This is the intro song :)
    introSong = loadSound('https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2F1%20-%20Title%20Bgm.mp3?v=1596018063130')
    //introSong.play();
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
      this.sceneManager.showScene(Instruction);
    }
  };
  this.showBackground = function() {
    image(this.sceneManager.fImage, bgX, 227);
    image(this.sceneManager.bImage, bgX, 255);
    image(this.sceneManager.gImage, bgX, 540);
    image(this.sceneManager.title, 70, 100, 350, 200);
    if (Math.floor(frameCount / 30) % 2 == 0) {
      // A blinking Info
      textAlign(CENTER)
      textFont("VT323");
      textSize(20);
      text("Select mode to start game", width/2, height - 20);
    }
  };
  this.moveBackground = function() {
    // Reset bgX when it runs out
    bgX -= 2;
    bgX %= 1024;
  };
}
