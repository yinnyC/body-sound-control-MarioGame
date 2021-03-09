// Name any p5.js functions we use in `global` so Glitch can recognize them.
/* global
 *    rectMode,push,pop,textAlign,textFont,CENTER,removeSprite,updateSprites,camera,Group,keyWentDown,drawSprites,createSprite,Clickable,drawIntroScreen,SceneManager,loadImage,ESCAPE,textSize,image,VIDEO,createCapture,ml5,HSB, background, color, collideRectRect, colorMode, createCanvas, fill, frameRate, keyCode, height,
 *    loop, noFill, noLoop, noStroke, random, rect, round, stroke, sqrt, text, width
 *    frameCount,UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW,Intro
 */

function Instruction() {
  let bgX,demoNothing,demoJump,back,choice; 
  this.enter = function(){
    choice = ""
    bgX = 0
    demoNothing = this.sceneManager.demoNothingImg;
    demoJump = this.sceneManager.demoJumpImg;
    back = new Clickable();
    back.locate(width / 2 - 50, 520);
    back.text = "Back";
    back.onHover = function() {
      this.color = "#808080";
      choice ="back"
    };
    back.onOutside = function() {
      this.color = "#FFFFFF";
      choice = "";
    };    
  }
  this.draw = function() {
    background(210, 90, 100);
    this.showBackground();
    this.moveBackground();
    this.info();
    back.draw();
  }
    this.mousePressed = function() {
      if(choice==="back"){
        this.sceneManager.showScene(Intro);
      } 
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
  this.info=function(){
    push();
    rectMode(CENTER);
    noStroke();
    fill('rgba(255,255,255, 0.85)')
    rect(width/2,height/2-20,400,450,8,8,8,8);
    textFont("Rubik Mono One");
    textSize(30);
    textAlign(CENTER);
    fill(0)
    text("How To Play", width/2,120);
    fill('red')
    rect(width/2,165,120,30,20,20,20,20);
    fill('blue')
    rect(width/2,250,120,30,20,20,20,20);
    textSize(12);
    fill(255)
    text("Sound Mode",width/2,170);
    text("Body Mode", width/2,255);
    textSize(10);
    fill(0)
    text("You can control Mario with voice,\njust say: \"single\",\"double\" or \"triple\"",width/2,205);
    text("You can control Mario \nwith Body Gestures",width/2,295);
    text("Try to collect 100 coins!",width/2,475);
    text("Do Nothing",183,445);
    text("Jump",308,445);
    image(demoNothing,135,320,100,100);
    image(demoJump,260,320,100,100);
    pop();
  }
  
}