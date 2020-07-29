// Name any p5.js functions we use in `global` so Glitch can recognize them.
/* global
 *    textAlign,textFont,CENTER,removeSprite,updateSprites,camera,Group,keyWentDown,drawSprites,createSprite,Clickable,drawIntroScreen,SceneManager,loadImage,ESCAPE,textSize,image,VIDEO,createCapture,ml5,HSB, background, color, collideRectRect, colorMode, createCanvas, fill, frameRate, keyCode, height,
 *    loop, noFill, noLoop, noStroke, random, rect, round, stroke, sqrt, text, width
 *    frameCount,UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW,Intro
 */

function instruction() {
  let bgX 
  this.enter = function(){
    bgX = 0
  }
  this.draw = function() {
    background(210, 90, 100);
    this.showBackground();
    this.moveBackground();
    noStroke();
    rect(50,60,400,470,8,8,8,8);
    textFont("Rubik Mono One");
    textSize(30);
    textAlign(CENTER);
    text("How To Play", width / 2,110);
    fill('red')
    rect(85,150,120,30,20,20,20,20);
    textSize(12);
    fill(255)
    text("Sound Mode", 144,170);
    //text("Sound Mode", 143,167);
    
  }
    this.mousePressed = function() {
      this.sceneManager.showScene(Intro);
  };
   this.showBackground = function() {
    image(this.sceneManager.fImage, bgX, 227);
    image(this.sceneManager.bImage, bgX, 255);
    image(this.sceneManager.gImage, bgX, 540);
  };
  this.moveBackground = function() {
    // Reset bgX when it runs out
    bgX -= 2;
    bgX %=1024
  };
  
}