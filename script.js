// Name any p5.js functions we use in `global` so Glitch can recognize them.
/* global
 *    SceneManager,loadImage,ESCAPE,textSize,image,VIDEO,createCapture,ml5,HSB, background, color, collideRectRect, colorMode, createCanvas, fill, frameRate, keyCode, height,
 *    loop, noFill, noLoop, noStroke, random, rect, round, stroke, sqrt, text, width
 *    UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW
 */

let foregroundImg,backgroundImg;

function preload(){
  foregroundImg = loadImage("https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2Fsky_2.png?v=1595568118809");
  backgroundImg = loadImage("https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2Fsky.png?v=1595568225904"); 
}

function setup(){
  createCanvas(500,600)
  colorMode(HSB, 360, 100, 100)
  background(190,55,100)
  
  var manager = new SceneManager();
  manager.fImage = foregroundImg;
  manager.bImage = backgroundImg;
  manager.wire();
  manager.showScene(Intro);
}
function draw(){
  
}
function Intro(){
  this.setup = function(){
    image(foregroundImg,-450,200)
    image(backgroundImg,-450,200)
  }
  this.draw = function(){
    
  }
}