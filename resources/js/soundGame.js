// Name any p5.js functions we use in `global` so Glitch can recognize them.
/* global
 *    p5,loadSound,textFont,textAlign,CENTER,push,pop,useQuadTree,removeSprites,removeSprite,updateSprites,camera,Group,keyWentDown,drawSprites,createSprite,Clickable,drawIntroScreen,SceneManager,loadImage,ESCAPE,textSize,image,VIDEO,createCapture,ml5,HSB, background, color, collideRectRect, colorMode, createCanvas, fill, frameRate, keyCode, height,
 *    loop, noFill, noLoop, noStroke, random, rect, round, stroke, sqrt, text, width
 *    frameCount,UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW,Gameover
 */
 		
function soundGame() {
  let MariolastX, GRAVITY, JUMP, gameIsOver, score;
  let spriteToBeKilled,platform,ledges,mario,ledgeImg,longledgeImg,bgImg,coins;
  let coin1Img,coin2Img,coin3Img,coin4Img;
  let coinGameSound, jumpGameSound;
  //let mostrecentword
  
  let myRec
  
  
  this.enter = function() {
    myRec = new p5.SpeechRec('en-US', marioMove);
    myRec.continuous = true;
    myRec.intrimResults = true;
    // Initialize values
    //mostrecentword = "";
    score = 0;
    MariolastX = 0;
    gameIsOver = false;
    GRAVITY = 1;
    JUMP = 15;
    
    frameRate(40);
    
    // Load Images
    bgImg = this.sceneManager.gameBackgroungImg;
    longledgeImg = this.sceneManager.gameLedgeImage;
    coin1Img = this.sceneManager.gameCoin1Img;
    coin2Img = this.sceneManager.gameCoin2Img;
    coin3Img = this.sceneManager.gameCoin3Img;
    coin4Img = this.sceneManager.gameCoin4Img;

    // Load Sound
    coinGameSound = this.sceneManager.coinSound;
    jumpGameSound = this.sceneManager.jumpSound;

    // Create Mario
    mario = createSprite(width / 2 - 70, 300);
    mario.scale = 2.2;
    mario.addAnimation("normal", this.sceneManager.gameMarioRun1Img,this.sceneManager.gameMarioRun2Img,this.sceneManager.gameMarioRun3Img,this.sceneManager.gameMarioRun4Img);
    mario.addAnimation("move", this.sceneManager.gameMarioJumpImg);

    // Create the first Ledge for mario to stand
    platform = createSprite(260, 570);
    platform.addAnimation(
      "normal",this.sceneManager.gamePlatformImg);
    // Create Groups for coins, ledges
    ledges = new Group();
    coins = new Group();
    spriteToBeKilled = new Group();

    mario.velocity.x = 3; // Mario will move forward at the speed of 4
    camera.position.y = mario.position.y; // Make Camera follow Mario
    useQuadTree(false); // Turn off the 'optimizing collision detection',so it won't skip any coin without checking it

    myRec.start();
  };

  this.draw = function() {
    background(210, 90, 100);
    if (!gameIsOver) {
      // if (mostrecentword != "") {
        checkGameState();
        // marioMove();
        mario.overlap(coins, collectCoins);
        checkGravity();
        spawnLedges();
        camera.position.x = mario.position.x;
        camera.off();
        image(bgImg, -mario.position.x % 1024, 200);
        displayInfo();
        camera.on(); // scrolling and zooming for scenes extending beyond the canvas
        drawSprites();
        checkLastSate();
      // } else {
      //   loadingPage();
      //}
    } else {
      this.sceneManager.showScene(Gameover, score);
      resetGame();
    }
  };
  
  /**************Functions For Display Scene/Info***********************/
  function loadingPage(){
    camera.off();
    push();
    image(bgImg, -mario.position.x % 1024, 200);
    textFont("VT323");
    textSize(25);
    textAlign(CENTER);
    text("Loading...", width / 2, height / 2);
    pop();
  }

  function displayInfo() {
    textFont("VT323");
    textSize(25);
    text("x " + score, width - 60, 42);
    image(coin1Img, width - 80, 28);
  }
  
  /**************Functions For Checking statements of objects***********************/
  function checkLastSate() {
    // Record previous state
    MariolastX = mario.position.x; // check if Mario stuck at the ledge side
  }
  
  function collectCoins(mario, collectedCoin) {
    coinGameSound.play();
    score += 1;
    collectedCoin.remove();
  }
  function checkGameState() {
    if (mario.position.y > height + 50) {
      // if Mario is out of window,lose
      gameIsOver = true;
    }
    if (score >= 100) {
      // if Mario scores more than 100, win
      gameIsOver = true;
    }
  }
  function checkGravity() {
    // If Mario is on the platform or ledges, y value stays the same
    mario.velocity.y += GRAVITY;
    if (mario.collide(platform) || mario.collide(ledges)) {
      if (mario.position.x > MariolastX) {
        // If Mario stuck at the side of the ledges, let him fall
        mario.velocity.y = 0;
        mario.changeAnimation("normal");
      } else {
        mario.velocity.y = 1;
      }
    }
  }
  
  function marioMove() {
    mostrecentword = myRec.resultString.split(' ').pop();
    // While receibe user input, Mario jumps
    
     if(mostrecentword.indexOf("single")!==-1) {
      jumpGameSound.play();
      text(myRec.resultString, width/2, height/2-50);
      console.log(mostrecentword);
      //Mario Commands
      mario.changeAnimation("move");
      mario.animation.rewind();
      mario.position.y -= JUMP;
      mario.velocity.y = -JUMP;
    } else if(mostrecentword.indexOf("double")!==-1) {
      jumpGameSound.play();
      text(myRec.resultString, width/2, height/2-50);
      console.log(mostrecentword);
      //Mario Commands
      mario.changeAnimation("move");
      mario.animation.rewind();
      mario.position.y -= JUMP*2;
      mario.velocity.y = -JUMP*2;
    } else if(mostrecentword.indexOf("triple")!==-1) {
      jumpGameSound.play();
      text(myRec.resultString, width/2, height/2-50);
      console.log(mostrecentword);
      //Mario Commands
      mario.changeAnimation("move");
      mario.animation.rewind();
      mario.position.y -= JUMP*5;
      mario.velocity.y = -JUMP*5;
    }
    
    // if (/*conditions*/) {
    //   if (lastLabel != "jump") {  // Make sure the jump sound be played for only once 
    //     
    //   }
    //   mario.velocity.x = 3;
    //   JUMP = 2;
    //   mario.changeAnimation("move");
    //   mario.animation.rewind();
    //   mario.position.y -= JUMP;
    //   mario.velocity.y = -JUMP;
    
  }
  
  function spawnLedges() {
    //spawn ledges and coins
    if (frameCount % 120 === 0 && mario.position.x > MariolastX) {
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
        coin.addAnimation("normal",coin1Img,coin2Img,coin3Img,coin4Img);
        coins.add(coin);
        spriteToBeKilled.add(coin);
      }
      for (let i = 0; i < 4; i++) {
        let coin = createSprite(
          longledge.position.x + 230 + i * 20,
          longledge.position.y - 260 + i * 20
        );
        coin.addAnimation("normal",coin1Img,coin2Img,coin3Img,coin4Img);
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
    mostrecentword = "";
    updateSprites(false);
    ledges.removeSprites();
    coins.removeSprites();
    spriteToBeKilled.removeSprites();
  }
  
}

