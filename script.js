// Name any p5.js functions we use in `global` so Glitch can recognize them.
/* global
 *    camera,Group,keyWentDown,drawSprites,createSprite,Clickable,drawIntroScreen,SceneManager,loadImage,ESCAPE,textSize,image,VIDEO,createCapture,ml5,HSB, background, color, collideRectRect, colorMode, createCanvas, fill, frameRate, keyCode, height,
 *    loop, noFill, noLoop, noStroke, random, rect, round, stroke, sqrt, text, width
 *    frameCount,UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW
 */

let foregroundImg, backgroundImg, groundImg, title;
let soundMode, bodyMode;
let startGround, ground, endGroud;

function preload() {
  // load background Images
  foregroundImg = loadImage(
    "https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2Fsky_2.png?v=1595568118809"
  );
  backgroundImg = loadImage(
    "https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2Fsky.png?v=1595568225904"
  );
  groundImg = loadImage(
    "https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2Ftop_ground.png?v=1595568970498"
  );
  title = loadImage(
    "https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2FSuper.png?v=1595626658046"
  );
  startGround = loadImage(
    "https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2Fstarting.png?v=1595721097175"
  );
}

function setup() {
  createCanvas(500, 600);
  colorMode(HSB, 360, 100, 100);
  // set up the screen manager
  var mgr = new SceneManager();
  mgr.fImage = foregroundImg;
  mgr.bImage = backgroundImg;
  mgr.gImage = groundImg;
  mgr.title = title;
  mgr.wire();
  mgr.showScene(Intro);
}

function Intro() {
  let bgX = 0; // To scroll the background
  let choice = "1";
  this.setup = function() {
    // set up clickable - Button soundMode
    soundMode = new Clickable();
    soundMode.locate(width / 2 - 50, 350);
    soundMode.text = "Sound Mode";
    soundMode.onHover = function() {
      this.color = "#808080";
      choice = "sound";
    };
    soundMode.onOutside = function() {
      this.color = "#FFFFFF";
      choice = "";
    };
    // set up clickable - Button bodyMode
    bodyMode = new Clickable();
    bodyMode.locate(width / 2 - 50, 420);
    bodyMode.text = "Body Mode";

    bodyMode.onHover = function() {
      this.color = "#808080";
      choice = "body";
    };
    bodyMode.onOutside = function() {
      this.color = "#FFFFFF";
      choice = "";
    };
  };

  this.draw = function() {
    background(210, 90, 100);
    this.showBackground();
    this.moveBackground();
    soundMode.draw();
    bodyMode.draw();
  };
  this.mousePressed = function() {
    // Switch to Game scene when user click any of the buttons
    if (choice != "") {
      // Make sure user's is on the buttons
      this.sceneManager.showScene(Game,choice);
    }
  };
  this.showBackground = function() {
    image(this.sceneManager.fImage, bgX, 227);
    image(this.sceneManager.bImage, bgX, 255);
    image(this.sceneManager.gImage, bgX, 540);
    image(this.sceneManager.title, 70, 100, 350, 200);
    text(choice, 70, 420);
    if (Math.floor(frameCount / 30) % 2 == 0) {
      // A blinking Info
      text("Select mode to start game", width / 2 - 70, height - 20);
    }
  };
  this.moveBackground = function() {
    // Reset bgX when it runs out
    bgX -= 2;
    if (bgX <= width - foregroundImg.width) {
      bgX = 0;
    }
  };
}

function Game() {
  let MariolastX = 0,
    GRAVITY = 1,
    JUMP = 20;
  let platform, ledges, mario, ledgeImg, longledgeImg, bgImg, gameIsOver;
  this.setup = function() {
    gameIsOver = false;
    // Load Images
    bgImg = loadImage(
      "https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2Fbg.png?v=1595800295790"
    );
    ledgeImg = loadImage(
      "https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2Fledge.png?v=1595738720120"
    );
    longledgeImg = loadImage(
      "https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2Flongledge.png?v=1595801236364"
    );

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
    platform = createSprite(-300, 570);
    platform.addAnimation(
      "normal",
      "https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2Fplatform.png?v=1595813439873"
    );

    // Create Ledges Group
    ledges = new Group();

    // Mario will move forward at the speed of 4
    mario.velocity.x = 4;
    camera.position.y = mario.position.y;
  };

  this.draw = function() {
    background(210, 90, 100);
    camera.position.x = mario.position.x;
    camera.off();
    image(bgImg, -mario.position.x % 1300, 200);
    if (!gameIsOver) {
      camera.on(); // scrolling and zooming for scenes extending beyond the canvas
      marioMove();
      checkCollision();
      spawnLedges();
      test()
      drawSprites(); // Draw Mario and platform
      drawSprites(ledges); // Draw ledges

      logLastMarioX();
      checkAlive();
    } else {
      mario.velocity.x = 0
      text(camera.active, width/2, 230);
      resetGame();
      this.sceneManager.showScene(result);
    }    
  };

  function checkAlive() {
    if (mario.position.y > height + 50) {
      gameIsOver = true;
    }
  }
  function resetGame() {
    gameIsOver = false;
    camera.position.x = 250
    mario.position.x = width / 2 - 70;
    mario.position.y = 300;
    mario.velocity.x = 4;
    camera.position.x = width/2
  }

  function logLastMarioX() {
    // Record last Mario,to check if Mario stuck at the ledge side
    MariolastX = mario.position.x;
  }
  function checkCollision() {
    // If Mario is on the platform or ledges, y value stays the same
    mario.velocity.y += GRAVITY;
    if (mario.collide(platform) || mario.collide(ledges)) {
      if (mario.position.x > MariolastX) {
        mario.velocity.y = 0;
        mario.changeAnimation("normal");
      } else {
        mario.velocity.y = 1000;
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
    if (frameCount % 110 === 0 && mario.position.x > MariolastX) {
      // if Mario stuck at the ledge side, don't create new ledge
      let longledge = createSprite(mario.position.x + width, random(520, 610));
      longledge.addImage(longledgeImg);
      ledges.add(longledge);
    }
    //get rid of passed ledges
    for (let i = 0; i < ledges.length; i++) {
      if (ledges[i].position.x < mario.position.x - width / 2) {
        ledges[i].remove();
      }
    }
  }

  function test() {
    text(MariolastX, mario.position.x, 200);
    text(mario.position.y, mario.position.x, 220);
    text(camera.active, mario.position.x, 230);
  }
}


function result() {
  this.draw = function() {
    background(0, 90, 100);
  }
    this.mousePressed = function() {
      this.sceneManager.showScene(Intro);
  };
  
}