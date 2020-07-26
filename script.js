// Name any p5.js functions we use in `global` so Glitch can recognize them.
/* global
 *    Clickable,drawIntroScreen,SceneManager,loadImage,ESCAPE,textSize,image,VIDEO,createCapture,ml5,HSB, background, color, collideRectRect, colorMode, createCanvas, fill, frameRate, keyCode, height,
 *    loop, noFill, noLoop, noStroke, random, rect, round, stroke, sqrt, text, width
 *    frameCount,UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW
 */

let foregroundImg, backgroundImg, groundImg, title;
let soundMode, bodyMode;
let startGround,ground,endGroud;

function preload() {
  // load background Images
  foregroundImg = loadImage("https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2Fsky_2.png?v=1595568118809");
  backgroundImg = loadImage("https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2Fsky.png?v=1595568225904");
  groundImg = loadImage("https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2Ftop_ground.png?v=1595568970498");
  title = loadImage("https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2FSuper.png?v=1595626658046");
  startGround = loadImage("https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2Fstarting.png?v=1595721097175")

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
  mgr.showScene(Game);
}

function Intro() {
  let bgX = 0;
  let choice  = "1"
  this.setup = function() {
    // set up clickable - Button soundMode
    soundMode = new Clickable();
    soundMode.locate(width / 2 - 50, 350);
    soundMode.text = "Sound Mode";
    soundMode.onHover = function() {
      this.color = "#808080";
      choice="sound"
    };
    soundMode.onOutside = function() {
      this.color = "#FFFFFF";
      choice=""
    };
    // set up clickable - Button bodyMode
    bodyMode = new Clickable();
    bodyMode.locate(width / 2 - 50, 420);
    bodyMode.text = "Body Mode";
   
    bodyMode.onHover = function() {
      this.color = "#808080";
      choice = "body"
    };
    bodyMode.onOutside = function() {
      this.color = "#FFFFFF";
      choice=""
    };
  };
  this.draw = function() {
    background(200, 66, 100);
    this.showBackground();
    this.moveBackground();
    soundMode.draw();
    bodyMode.draw();
  };
  this.mousePressed = function(){
    if(choice!=""){
      this.sceneManager.showScene(Game,choice)
    }
    
  }
  this.showBackground = function() {
    image(this.sceneManager.fImage, bgX, 227);
    image(this.sceneManager.bImage, bgX, 255);
    image(this.sceneManager.gImage, bgX, 540);
    image(this.sceneManager.title, 70, 100, 350, 200);
    if ( Math.floor(frameCount / 30) % 2 == 0 ) 
        {
            text("Select mode to start game", width / 2-70, height -20);
        }
  };
  this.moveBackground = function() {
    bgX -= 1;
    if (bgX <= width - foregroundImg.width) {
      bgX = 0;
    }
  };
}

function Game() {
  let bgX = 0;
  
  this.preload = function(){
    
  }
  this.setup = function() {
    
  };

  this.draw = function() {
    background(200, 66, 100);
    image(this.sceneManager.fImage, bgX, 227);
    image(this.sceneManager.bImage, bgX, 265);
    //image(this.sceneManager.gImage, 16, 540);
    image(startGround, 0, 540);
    text(this.sceneArgs+" Mode",210,300);
  };
    this.keyPressed = function(){
    if(keyCode === UP_ARROW){
      
    }
  }
  
}
