// Name any p5.js functions we use in `global` so Glitch can recognize them.
/* global
 *    rectMode,push,pop,textAlign,textFont,CENTER,removeSprite,updateSprites,camera,Group,keyWentDown,drawSprites,createSprite,Clickable,drawIntroScreen,SceneManager,loadImage,ESCAPE,textSize,image,VIDEO,createCapture,ml5,HSB, background, color, collideRectRect, colorMode, createCanvas, fill, frameRate, keyCode, height,
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
    rectMode(CENTER);
    noStroke();
    rect(width/2,height/2,400,470,8,8,8,8);

    textFont("Rubik Mono One");
    textSize(30);
    textAlign(CENTER);
    text("How To Play", width/2,120);
    fill('red')
    rect(width/2,175,120,30,20,20,20,20);
    fill('blue')
    rect(width/2,240,120,30,20,20,20,20);
    textSize(12);
    fill(255)
    text("Sound Mode",width/2,180);
    text("Body Mode", width/2,260);
    textSize(8);
    fill(0)
    text("You can control Mario with voice,\njust say: \"Jump! \"",width/2,215);
    
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