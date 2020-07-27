// Name any p5.js functions we use in `global` so Glitch can recognize them.
/* global
 *    removeSprite,updateSprites,camera,Group,keyWentDown,drawSprites,createSprite,Clickable,drawIntroScreen,SceneManager,loadImage,ESCAPE,textSize,image,VIDEO,createCapture,ml5,HSB, background, color, collideRectRect, colorMode, createCanvas, fill, frameRate, keyCode, height,
 *    loop, noFill, noLoop, noStroke, random, rect, round, stroke, sqrt, text, width
 *    frameCount,UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW,Gameover
 */

function Game() {
  let MariolastX,GRAVITY,JUMP;
  let platform, ledges, mario, ledgeImg, longledgeImg, bgImg, gameIsOver,coins,score;
  this.enter = function() {
    score = 0;
    MariolastX = 0;
    gameIsOver = false;
    GRAVITY = 1;
    JUMP = 20
    // Load Images
    bgImg = loadImage("https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2Fbg.png?v=1595800295790");
    longledgeImg = loadImage("https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2Flongledge.png?v=1595801236364");
    
    // Create Mario
    mario = createSprite(width / 2 - 70, 300);
    mario.scale = 2.2;
    mario.addAnimation("normal",
      "https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2FRunning-mario_01.png?v=1595741137506",
      "https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2FRunning-mario_02.png?v=1595799759140",
      "https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2FRunning-mario_03.png?v=1595799765213",
      "https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2FStanding-mario.png?v=1595741033822"
    );
    mario.addAnimation("move",
      "https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2FStanding-mario.png?v=1595741033822",
      "https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2FRunning-mario_01.png?v=1595741137506",
      "https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2FJumping-mario.png?v=1595741095055",
      "https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2FStanding-mario.png?v=1595741033822"
    );

    // Create Mario
    platform = createSprite(260, 570);
    platform.addAnimation("normal","https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2Fstartledge.png?v=1595801238081");

    // Create Ledges Group
    ledges = new Group();
    coins = new Group();

    // Mario will move forward at the speed of 4
    mario.velocity.x = 4;
    camera.position.y = mario.position.y;
  };

  this.draw = function() {
    background(210, 90, 100);
    if (!gameIsOver) {
      
      checkAlive();
      mario.overlap(coins, collectCoins);
      marioMove();
      checkGravity();
      spawnLedges(); 
      camera.position.x = mario.position.x;
      camera.off();
      image(bgImg, -mario.position.x % 1300, 200);
      text(mario.position.x,width/2,height/2);
      displayInfo()
      camera.on(); // scrolling and zooming for scenes extending beyond the canvas
      drawSprites(); 
      logLastMarioX();
    } else {
      this.sceneManager.showScene(Gameover);
      resetGame();
    }    
  };
  function displayInfo(){
    text("score: "+score,width-70,30)
  }
  function collectCoins(mario,collectedCoin){
    score +=1;
    collectedCoin.remove();
  }
  function checkAlive() {
    // Check if Mario is out of window
    if (mario.position.y > height + 50) {
      gameIsOver = true;
    }
  }
  function checkGravity() {
    // If Mario is on the platform or ledges, y value stays the same
    mario.velocity.y += GRAVITY;
    if (mario.collide(platform) || mario.collide(ledges)) {
      if (mario.position.x > MariolastX) {
        mario.velocity.y = 0;
        mario.changeAnimation("normal");
      } else {
        mario.velocity.y = 1;
      }
    }
  }
  /*Implementation of sound or body mode in function marioMove()
if(this.sceneArgs==="sound"){

}else{

}
*/
  function marioMove() {
    // While receibe user input, Mario jumps
    if (keyWentDown(" ")) {
      mario.changeAnimation("move");
      mario.animation.rewind();
      mario.velocity.y = -JUMP;
    }
  }
  function spawnLedges() {
    //spawn ledges
    if (frameCount % 100 === 0 && mario.position.x > MariolastX) {
      // if Mario stuck at the ledge side, don't create new ledge
      let longledge = createSprite(mario.position.x +width-120, random(520, 610));
      for(let i=0;i<3;i++){
        let coin = createSprite(longledge.position.x+170+i*20,longledge.position.y-200-i*20);
        coin.addAnimation("normal","https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2Fcoins_01.png?v=1595864834355","https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2Fcoins_02.png?v=1595864834664","https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2Fcoins_03.png?v=1595864834265","https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2Fcoins_04.png?v=1595864834678");
        coins.add(coin)
      }
      for(let i=0;i<4;i++){
        let coin = createSprite(longledge.position.x+230+i*20,longledge.position.y-260+i*20);
        coin.addAnimation("normal","https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2Fcoins_01.png?v=1595864834355","https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2Fcoins_02.png?v=1595864834664","https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2Fcoins_03.png?v=1595864834265","https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2Fcoins_04.png?v=1595864834678");
        coins.add(coin)
      }
      
      
     
      longledge.addImage(longledgeImg);
      ledges.add(longledge);
      console.log(ledges)
    }
    //get rid of passed ledges
    for (let i = 0; i < ledges.length; i++) {
      if (ledges[i].position.x < mario.position.x - width / 2) {
        ledges[i].remove();
      }
    }
  }
    function resetGame() { 
    camera.position.x = width/2 
    updateSprites(false);
    ledges.removeSprites ()
    score = 0;
  }

  function logLastMarioX() {
    // Record last Mario,to check if Mario stuck at the ledge side
    MariolastX = mario.position.x;
  }
}