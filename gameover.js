// Name any p5.js functions we use in `global` so Glitch can recognize them.
/* global
 *    removeSprite,updateSprites,camera,Group,keyWentDown,drawSprites,createSprite,Clickable,drawIntroScreen,SceneManager,loadImage,ESCAPE,textSize,image,VIDEO,createCapture,ml5,HSB, background, color, collideRectRect, colorMode, createCanvas, fill, frameRate, keyCode, height,
 *    loop, noFill, noLoop, noStroke, random, rect, round, stroke, sqrt, text, width
 *    frameCount,UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW,Intro
 */

function Gameover() {
  let bgX 
  this.enter = function(){
    bgX = 0
  }
  this.draw = function() {
    background(0, 90, 100);
    this.showBackground();
    this.moveBackground();
    text("Game Over",width/2-20, height/2)
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