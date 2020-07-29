// Name any p5.js functions we use in `global` so Glitch can recognize them.
/* global
 *    loadSound,textFont,textAlign,CENTER,push,pop,useQuadTree,removeSprites,removeSprite,updateSprites,camera,Group,keyWentDown,drawSprites,createSprite,Clickable,drawIntroScreen,SceneManager,loadImage,ESCAPE,textSize,image,VIDEO,createCapture,ml5,HSB, background, color, collideRectRect, colorMode, createCanvas, fill, frameRate, keyCode, height,
 *    loop, noFill, noLoop, noStroke, random, rect, round, stroke, sqrt, text, width
 *    frameCount,UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW,Gameover
 */

function bodyGame() {
  let MariolastX, GRAVITY, JUMP;
  let platform,ledges,mario,ledgeImg,longledgeImg,bgImg,gameIsOver,coins,score,spriteToBeKilled,scoreImg;
  let coinSound;
  
  /****Set up teachable machine stuff****/
  let classifier; // Classifier Variable
  // Model URL
  let imageModelURL ="https://teachablemachine.withgoogle.com/models/GEQao0cv0/";
  // Video
  let video;
  let flippedVideo;
  // To store the classification
  let label = "";
  this.setup = function(){
    
    
    
  }
  this.enter = function() {
    score = 0;
    MariolastX = 0;
    gameIsOver = false;
    GRAVITY = 1;
    JUMP = 15;
    
    classifier = ml5.imageClassifier(imageModelURL + "model.json");
    // Load Images
    bgImg = loadImage("https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2Fbg.png?v=1595800295790");
    longledgeImg = loadImage("https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2Flongledge.png?v=1595801236364");
    scoreImg = loadImage("https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2Fcoins_01.png?v=1595864834355")
    
    // Load Sound
    coinSound = loadSound("https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2FCoin.mp3?v=1596004574113")

    // Create Mario
    mario = createSprite(width / 2 - 70, 300);
    mario.scale = 2.2;
    mario.addAnimation("normal","https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2FRunning-mario_01.png?v=1595741137506","https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2FRunning-mario_02.png?v=1595799759140","https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2FRunning-mario_03.png?v=1595799765213","https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2FStanding-mario.png?v=1595741033822");
    mario.addAnimation("move","https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2FStanding-mario.png?v=1595741033822","https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2FRunning-mario_01.png?v=1595741137506",
      "https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2FJumping-mario.png?v=1595741095055",
      "https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2FStanding-mario.png?v=1595741033822"
    );

    // Create the first Ledge for mario to stand
    platform = createSprite(260, 570);
    platform.addAnimation(
      "normal",
      "https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2Fstartledge.png?v=1595801238081"
    );
    // Create Groups for coins, ledges
    ledges = new Group();
    coins = new Group();
    spriteToBeKilled = new Group();
  
    mario.velocity.x = 2;                  // Mario will move forward at the speed of 4
    camera.position.y = mario.position.y;  // Make Camera follow Mario
    useQuadTree(false);                    // Turn off the 'optimizing collision detection',so it won't skip any coin without checking it

    video = createCapture(VIDEO);
    video.size(120, 90);
    video.hide() 
    flippedVideo = ml5.flipImage(video);
    // Start classifying
    classifyVideo();
  };

  this.draw = function() {
    background(210, 90, 100);
    if (!gameIsOver) {
      checkGameState();
      marioMove();
      mario.overlap(coins, collectCoins);
      checkGravity();
      spawnLedges();
      camera.position.x = mario.position.x;
      camera.off();
      
      image(bgImg, -mario.position.x % 1024, 200);
      displayInfo();image(flippedVideo, 0, 0);
      image(flippedVideo, 0, 0);
      camera.on(); // scrolling and zooming for scenes extending beyond the canvas
      drawSprites();
      logLastMarioX();
    } else {
      this.sceneManager.showScene(Gameover,score);
      resetGame();
    }
  };
  function displayInfo() {
    textFont("VT323");
    textSize(25);
    text("x " + score, width - 60, 42);
    image(scoreImg,width-80,28)
    noStroke()
    push();
    fill(0)
    rect(0,0,120,110)
    fill(255)
    textAlign(CENTER)
    textSize(13);
    text(label,60,103);
    pop();
    
  }
  function collectCoins(mario, collectedCoin) {
    coinSound.play()
    score += 1;
    collectedCoin.remove();
  }
  function checkGameState() {
    if (mario.position.y > height + 50) {// if Mario is out of window,lose
      gameIsOver = true;
    }
    if(score>=100){ // if Mario scores more than 100, win
      gameIsOver = true;
    }
  }
  function checkGravity() {
    // If Mario is on the platform or ledges, y value stays the same
    mario.velocity.y += GRAVITY;
    if (mario.collide(platform) || mario.collide(ledges)) {
      if (mario.position.x > MariolastX) {// If Mario stuck at the side of the ledges, let him fall
        mario.velocity.y = 0;
        mario.changeAnimation("normal");
      } else {
        mario.velocity.y = 1;
      }
    }
  }
  function marioMove() {
    // While receibe user input, Mario jumps
   if (label==="jump"&& mario.position.y>100) {
      mario.velocity.x = 3;
      JUMP = 2
      mario.changeAnimation("move");
      mario.animation.rewind();
      mario.position.y -= JUMP;
      mario.velocity.y = -JUMP;
    } else {
      if (keyWentDown(" ")) {
      mario.changeAnimation("move");
      mario.animation.rewind();
      mario.position.y -= JUMP;
      mario.velocity.y = -JUMP;
      }
    }
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
        coin.addAnimation("normal","https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2Fcoins_01.png?v=1595864834355","https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2Fcoins_02.png?v=1595864834664","https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2Fcoins_03.png?v=1595864834265","https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2Fcoins_04.png?v=1595864834678");
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
    video.stop()
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
  
  /**************Classifying functions for Teachable Machine*********************/
  function classifyVideo() {
    flippedVideo = ml5.flipImage(video);
    classifier.classify(flippedVideo, gotResult);
    flippedVideo.remove();
  }

  // When we get a result
  function gotResult(error, results) {
    // If there is an error
    if (error) {
      console.error(error);
      return;
    }
    // The results are in an array ordered by confidence.
    console.log(results[0]);
    label = results[0].label;
    // Classifiy again!
    setTimeout(classifyVideo, 1000);
  }
}
