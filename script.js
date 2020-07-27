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
  mgr.showScene(Game);
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
      this.sceneManager.showScene(Game, choice);
    }
  };
  this.showBackground = function() {
    image(this.sceneManager.fImage, bgX, 227);
    image(this.sceneManager.bImage, bgX, 255);
    image(this.sceneManager.gImage, bgX, 540);
    image(this.sceneManager.title, 70, 100, 350, 200);
    if (Math.floor(frameCount / 30) % 2 == 0) {
      // A blinking Info
      text("Select mode to start game", width / 2 - 70, height - 20);
    }
  };
  this.moveBackground = function() {
    // Reset bgX when it runs out
    bgX -= 1;
    if (bgX <= width - foregroundImg.width) {
      bgX = 0;
    }
  };
}

function Game() {
  let bgX = 0,MariolastX=0;
  let GRAVITY = 1,
    JUMP = 15;
  let platform, ledges, mario, ledgeImg, longledgeImg, bgImg;
  this.setup = function() {
    bgImg = loadImage("https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2Fbg.png?v=1595800295790");
    ledgeImg = loadImage("https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2Fledge.png?v=1595738720120");
    longledgeImg = loadImage("https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2Flongledge.png?v=1595801236364");
    mario = createSprite(width / 2, 515);
    mario.scale = 2.2;
    mario.addAnimation("normal","https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2FRunning-mario_01.png?v=1595741137506","https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2FRunning-mario_02.png?v=1595799759140","https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2FRunning-mario_03.png?v=1595799765213","https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2FStanding-mario.png?v=1595741033822");
    mario.addAnimation("move","https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2FStanding-mario.png?v=1595741033822","https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2FRunning-mario_01.png?v=1595741137506","https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2FJumping-mario.png?v=1595741095055","https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2FStanding-mario.png?v=1595741033822");

    platform = createSprite(450, 570);
    platform.addAnimation("normal","https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2Fstartledge.png?v=1595801238081");

    ledges = new Group();
    camera.position.y = height / 2;
    mario.velocity.x = 4; // Mario ca
  };

  this.draw = function() {
    camera.position.x = mario.position.x + width / 4;
    background(210, 90, 100);
    camera.off();
    this.showBackground();
    camera.on();
    chickCollision();
    marioMove();
    spawnLedges();
    text(MariolastX,mario.position.x,200)
    text(mario.position.x,mario.position.x,250)
    text(MariolastX,mario.position.x,200)
    text(mario.position.x>MariolastX,mario.position.x,260)
    drawSprites();
    drawSprites(ledges);
    logLastMarioX()
  };

  function logLastMarioX(){ 
    // Record last Mario,to check if Mario stuck at the ledge side
    MariolastX = mario.position.x
  }
  function chickCollision() {
    mario.velocity.y += GRAVITY;  
    if (mario.collide(platform) || mario.collide(ledges)) {
      if(mario.position.x>MariolastX){
        mario.velocity.y = 0;
        mario.changeAnimation("normal");
      }
    }
  }
  function marioMove() {
    // Use space key to move mario
    if (keyWentDown(" ")) {
      mario.changeAnimation("move");
      mario.animation.rewind();

      mario.velocity.y = -JUMP;
      if (mario.position.x < 220) {
        mario.velocity.x = 30;
      }

      if (bgX - 50 > width - foregroundImg.width) {
        bgX -= 50;
      }
    }
  }
  function spawnLedges() {
    //spawn ledges
    if (frameCount % 100 === 0 &&  mario.position.x>MariolastX) { // if Mario stuck at the ledge side, don't create new ledge
      let longledge = createSprite(mario.position.x + width, random(520,610));
      longledge.addImage(longledgeImg);
      ledges.add(longledge);
    }
    //get rid of passed ledges
    for (let i = 0; i < ledges.length; i++) {
      if (ledges[i].position.x < mario.position.x - width / 2) {
        ledges[i].remove();
      }
    }
    console.log(ledges);
  }

  this.showBackground = function() {
    image(bgImg, -mario.position.x%1600, 200);

    //image(this.sceneManager.fImage, bgX, 227);
    //image(this.sceneManager.bImage, bgX, 265);
  };
}

/*text(this.sceneArgs + " Mode", 210, 300);
    text(mario.position.x, 210, 380);*/
