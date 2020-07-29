// Name any p5.js functions we use in `global` so Glitch can recognize them.
/* global
 *    textFont,removeSprite,updateSprites,camera,Group,keyWentDown,drawSprites,createSprite,Clickable,drawIntroScreen,SceneManager,loadImage,ESCAPE,textSize,image,VIDEO,createCapture,ml5,HSB, background, color, collideRectRect, colorMode, createCanvas, fill, frameRate, keyCode, height,
 *    loop, noFill, noLoop, noStroke, random, rect, round, stroke, sqrt, text, width
 *    textAlign,CENTER,frameCount,UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW,Intro
 */

function Gameover() {
  let bgX,loseImg,winImage,again,choice,fireWorkImg; 
  this.enter = function(){
    bgX = 0
    choice = ""
    loseImg = loadImage("https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2Fover.png?v=1596002455442")
    winImage = loadImage("https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2FWin.png?v=1596002455545")
    fireWorkImg = loadImage("https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2F531854_001e1.gif?v=1596004203476")
    again = new Clickable();
    again.locate(width / 2 - 50, 450);
    again.text = "Play Again";
    again.onHover = function() {
      this.color = "#808080";
      choice = "again";
    };
    again.onOutside = function() {
      this.color = "#FFFFFF";
      choice = "";
    };
  }
  this.draw = function() {
    background(210, 90, 100);
    this.showBackground();
    this.moveBackground();
    if(this.sceneArgs>10){
      image(winImage, 70, 100, 350, 200);
      image(fireWorkImg,70,100,350,200)
    }else{
      image(loseImg, 70, 100, 350, 200);
    }
    textAlign(CENTER);
    textFont("VT323");
    textSize(25);
    text("You Scored",width/2, height/2+50)
    text(this.sceneArgs,width/2, height/2+80)
    again.draw()
  }
    this.mousePressed = function() {
      if(choice ==="again"){
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
  
}