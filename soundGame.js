// Name any p5.js functions we use in `global` so Glitch can recognize them.
/* global
 *    push,textAlign,CENTER,pop,useQuadTree,removeSprites,removeSprite,updateSprites,camera,Group,keyWentDown,drawSprites,createSprite,Clickable,drawIntroScreen,SceneManager,loadImage,ESCAPE,textSize,image,VIDEO,createCapture,ml5,HSB, background, color, collideRectRect, colorMode, createCanvas, fill, frameRate, keyCode, height,
 *    loop, noFill, noLoop, noStroke, random, rect, round, stroke, sqrt, text, width
 *    p5,frameCount,UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW,Gameover
 */
 		
		

function soundGame() {
  let MariolastX, GRAVITY, JUMP;
  let platform,ledges,mario,ledgeImg,longledgeImg,bgImg,gameIsOver,coins,score,spriteToBeKilled;
  
 
var marioJumpText = "Move mario"
  this.enter = function() {
    score = 0;
    MariolastX = 0;
    gameIsOver = false;
    GRAVITY = 1;
    //How high mario jump
    JUMP = 10;
    // Load Images
    bgImg = loadImage("https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2Fbg.png?v=1595800295790");
    longledgeImg = loadImage("https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2Flongledge.png?v=1595801236364");

    // Create Mario
    mario = createSprite(width / 2 - 70, 300);
    mario.scale = 2.2;
    mario.addAnimation(
      "normal",
      "https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2FRunning-mario_01.png?v=1595741137506",
      "https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2FRunning-mario_02.png?v=1595799759140",
      "https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2FRunning-mario_03.png?v=1595799765213",
      "https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2FStanding-mario.png?v=1595741033822"
    );
    mario.addAnimation(
      "move",
      "https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2FStanding-mario.png?v=1595741033822",
      "https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2FRunning-mario_01.png?v=1595741137506",
      "https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2FJumping-mario.png?v=1595741095055",
      "https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2FStanding-mario.png?v=1595741033822"
    );

    // Create Mario
    platform = createSprite(260, 570);
    platform.addAnimation(
      "normal",
      "https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2Fstartledge.png?v=1595801238081"
    );

    // Create Ledges Group
    ledges = new Group();
    coins = new Group();
    spriteToBeKilled = new Group();

    // Mario will move forward at the speed of 4
    mario.velocity.x = 4;
    camera.position.y = mario.position.y;
    useQuadTree(false);
    
    /*
    myRec.onResult = showResult;
 		myRec.start();*/
    
     // Sound commands variables
  
//   var myRec = new p5.SpeechRec('en-US', parseResult);
//  myRec.continuous = true
//  myRec.intrimResults = true
    
    // Sound commands Setup
    
    // myRec.start();
    
  };

  this.draw = function() {
    background(210, 90, 100);
    if (!gameIsOver) {
      checkAlive();
      marioMove();
      mario.overlap(coins, collectCoins);
      checkGravity();
      spawnLedges();
      camera.position.x = mario.position.x;
      camera.off();
      image(bgImg, -mario.position.x % 1024, 200);
      displayInfo();
      camera.on(); // scrolling and zooming for scenes extending beyond the canvas
      drawSprites();
      logLastMarioX();
      // parseResult();
    } else {
      this.sceneManager.showScene(Gameover);
      resetGame();
    }
  };
  
  function parseResult() {
    
    // recognition system will often append words into phrases.
		// so hack here is to only use the last word:
		var mostrecentword = myRec.resultString.split(' ').pop();
		if(mostrecentword.indexOf("jump")!==-1) {
      text(myRec.resultString, width/2, height/2-50); 
      //Insert Mario Commands here
     
    }
		
    else if(mostrecentword.indexOf("double")!==-1) { 
      
       text(myRec.resultString, width/2, height/2+50); 
      //Insert Mario Commands Here
      
    }
    else if(mostrecentword.indexOf("triple")!==-1){
      text(myRec.resultString, width/2, height/2+100)
    }
    console.log(mostrecentword);
  }
  
  function displayInfo() {
    text("score: " + score, width - 70, 30);
    push();
    textSize(32);
 		textAlign(CENTER);
		text("Command Mario", width/2, height/2);
    pop();
  }
  function collectCoins(mario, collectedCoin) {
    console.log("coin collected");
    score += 1;

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
  function marioMove() {
    // While receibe user input, Mario jumps
      if (keyWentDown(" ")) {
      mario.changeAnimation("move");
      mario.animation.rewind();
      mario.position.y -= JUMP;
      mario.velocity.y = -JUMP;
      
    }
  }
  function spawnLedges() {
    //spawn ledges and coins
    if (frameCount % 90 === 0 && mario.position.x > MariolastX) {
      // if Mario stuck at the ledge side, don't create new ledge
      let longledge = createSprite(
        mario.position.x + width - 10,
        random(520, 630)
      );
      longledge.addImage(longledgeImg);
      ledges.add(longledge);
      spriteToBeKilled.add(longledge);
      for (let i = 0; i < 3; i++) {
        let coin = createSprite(
          longledge.position.x + 170 + i * 20,
          longledge.position.y - 200 - i * 20
        );
        coin.addAnimation(
          "normal",
          "https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2Fcoins_01.png?v=1595864834355",
          "https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2Fcoins_02.png?v=1595864834664",
          "https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2Fcoins_03.png?v=1595864834265",
          "https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2Fcoins_04.png?v=1595864834678"
        );
        coins.add(coin);
        spriteToBeKilled.add(coin);
      }
      for (let i = 0; i < 4; i++) {
        let coin = createSprite(
          longledge.position.x + 230 + i * 20,
          longledge.position.y - 260 + i * 20
        );
        coin.addAnimation(
          "normal",
          "https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2Fcoins_01.png?v=1595864834355",
          "https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2Fcoins_02.png?v=1595864834664",
          "https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2Fcoins_03.png?v=1595864834265",
          "https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2Fcoins_04.png?v=1595864834678"
        );
        coins.add(coin);
      }
    }
    //get rid of passed ledges and coins
    for (let i = 0; i < ledges.length; i++) {
      if (ledges[i].position.x < mario.position.x - width / 2 - 10) {
        ledges[i].remove();
      }
    }
    for (let i = 0; i < coins.length; i++) {
      if (coins[i].position.x < mario.position.x - width / 2 - 10) {
        coins[i].remove();
      }
    }
  }
  function resetGame() {
    camera.position.x = width / 2;
    score = 0;
    updateSprites(false);
    console.log(ledges.size());
    ledges.removeSprites();
    console.log(ledges.size());
    console.log(coins.size());
    coins.removeSprites();
    console.log(coins.size());
    for (let i = 0; i < spriteToBeKilled.length; i++) {
      spriteToBeKilled[i].remove();
    }
  }
  function logLastMarioX() {
    // Record last Mario,to check if Mario stuck at the ledge side
    MariolastX = mario.position.x;
  }
  
}

