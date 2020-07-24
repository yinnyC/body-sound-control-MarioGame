// Name any p5.js functions we use in `global` so Glitch can recognize them.
/* global
 *    Clickable,drawIntroScreen,SceneManager,loadImage,ESCAPE,textSize,image,VIDEO,createCapture,ml5,HSB, background, color, collideRectRect, colorMode, createCanvas, fill, frameRate, keyCode, height,
 *    loop, noFill, noLoop, noStroke, random, rect, round, stroke, sqrt, text, width
 *    UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW
 */

let foregroundImg,backgroundImg,groundImg,title;
let soundMode,bodyMode;

function preload(){
  // load background Images
  foregroundImg = loadImage("https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2Fsky_2.png?v=1595568118809");
  backgroundImg = loadImage("https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2Fsky.png?v=1595568225904"); 
  groundImg = loadImage("https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2Ftop_ground.png?v=1595568970498");
  title = loadImage("https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2FSuper.png?v=1595626658046");
}

function setup(){
  createCanvas(500,600)
  colorMode(HSB, 360, 100, 100)
  background(200,66,100)
  // set up the screen manager
  var manager = new SceneManager();
  manager.fImage = foregroundImg;
  manager.bImage = backgroundImg;
  manager.gImage = groundImg;
  manager.title = title;
  manager.wire();
  manager.showScene(Intro);
  // set up clickable 
  soundMode = new Clickable();
  bodyMode = new Clickable();
}

function Intro(){
  let bgX = 0
  this.draw = function(){
    background(200,66,100)
    this.showBackground()
    this.moveBackground()
    
  }
  this.showBackground= function(){
    image(foregroundImg,bgX,225)
    image(backgroundImg,bgX,255)
    image(groundImg,bgX,540)
    image(title,70,100,350,200)
  }
  this.moveBackground= function(){
    bgX-=5
    if(bgX<=width-foregroundImg.width){
      bgX = -5
    }
  }
}