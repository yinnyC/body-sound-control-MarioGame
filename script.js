// Name any p5.js functions we use in `global` so Glitch can recognize them.
/* global
 *    Intro,loadSound,soundFormats,Gameover,textAlign,CENTER,textFont,Instruction,bodyGame,soundGame,removeSprite,updateSprites,camera,Group,keyWentDown,drawSprites,createSprite,Clickable,drawIntroScreen,SceneManager,loadImage,ESCAPE,textSize,image,VIDEO,createCapture,ml5,HSB, background, color, collideRectRect, colorMode, createCanvas, fill, frameRate, keyCode, height,
 *    loop, noFill, noLoop, noStroke, random, rect, round, stroke, sqrt, text, width
 *    frameCount,UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW,Game
 */

let foregroundImg, backgroundImg, groundImg, title;
let introSong,coinSound,jumpSound
let gameBackgroungImg,gameLedgeImage,gameCoin1Img,gameCoin2Img,gameCoin3Img,gameCoin4Img,gameClassifier;
let gameMarioJumpImg,gameMarioRun1Img,gameMarioRun2Img,gameMarioRun3Img,gameMarioRun4Img,gamePlatformImg;
let imageModelURL ="https://teachablemachine.withgoogle.com/models/GEQao0cv0/";
let demoNothingImg,demoJumpImg;
let gameoverLoseImg,gameoverWinImg,gameoverFireworkImg;
function preload() {
  // set the global sound format
  soundFormats('mp3')
  introSong = loadSound("https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2F1%20-%20Title%20Bgm.mp3?v=1596018063130");
  // Materials for Intro scene
  foregroundImg = loadImage("https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2Fsky_2.png?v=1595568118809");
  backgroundImg = loadImage("https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2Fsky.png?v=1595568225904");
  groundImg = loadImage("https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2Ftop_ground.png?v=1595568970498");
  title = loadImage("https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2FSuper.png?v=1595626658046");
  // Materials for Game scene
  // jingle/music
  coinSound = loadSound("https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2FCoin.mp3?v=1596004574113");
  jumpSound = loadSound("https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2FJump.mp3?v=1596005029268");
  gameBackgroungImg = loadImage("https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2Fbg.png?v=1595800295790");
  gameLedgeImage = loadImage("https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2Flongledge.png?v=1595801236364");
  gameCoin1Img = loadImage("https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2Fcoins_01.png?v=1595864834355");
  gameCoin2Img = loadImage("https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2Fcoins_02.png?v=1595864834664");
  gameCoin3Img = loadImage("https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2Fcoins_03.png?v=1595864834265");
  gameCoin4Img = loadImage("https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2Fcoins_04.png?v=1595864834678");
  gameMarioJumpImg= loadImage("https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2FJumping-mario.png?v=1595741095055");
  gameMarioRun1Img = loadImage("https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2FRunning-mario_01.png?v=1595741137506");
  gameMarioRun2Img = loadImage("https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2FRunning-mario_02.png?v=1595799759140");
  gameMarioRun3Img = loadImage("https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2FRunning-mario_03.png?v=1595799765213");
  gameMarioRun4Img = loadImage("https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2FStanding-mario.png?v=1595741033822");
  gamePlatformImg = loadImage("https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2Fstartledge.png?v=1595801238081");
  gameClassifier = ml5.imageClassifier(imageModelURL + "model.json");
  // Materials for Instruction scene
  demoNothingImg = loadImage("https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2FIMG_8147.JPG?v=1595994325897");
  demoJumpImg = loadImage("https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2FIMG_8148.JPG?v=1595994325171"); 
  // Materials for GameOver Scene
  gameoverLoseImg = loadImage("https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2Fover.png?v=1596002455442");
  gameoverWinImg = loadImage("https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2FWin.png?v=1596002455545");
  
}
function setup() {
  createCanvas(500, 600);
  colorMode(HSB, 360, 100, 100);
  introSong.loop();
  // set up the screen manager
  // for Intro scene
  var mgr = new SceneManager();
  mgr.fImage = foregroundImg;
  mgr.bImage = backgroundImg;
  mgr.gImage = groundImg;
  mgr.title = title;
  // for game scene
  mgr.coinSound = coinSound;
  mgr.jumpSound = jumpSound;
  mgr.gameBackgroungImg = gameBackgroungImg;
  mgr.gameLedgeImage = gameLedgeImage;
  mgr.gameCoin1Img = gameCoin1Img;
  mgr.gameCoin2Img = gameCoin2Img;
  mgr.gameCoin3Img = gameCoin3Img;
  mgr.gameCoin4Img = gameCoin4Img;
  mgr.gameMarioJumpImg = gameMarioJumpImg;
  mgr.gameMarioRun1Img = gameMarioRun1Img;
  mgr.gameMarioRun2Img = gameMarioRun2Img;
  mgr.gameMarioRun3Img = gameMarioRun3Img;
  mgr.gameMarioRun4Img = gameMarioRun4Img;
  mgr.gamePlatformImg = gamePlatformImg;
  mgr.gameClassifier = gameClassifier;
  // for Instruction scene
  mgr.demoNothingImg = demoNothingImg;
  mgr.demoJumpImg = demoJumpImg;
  mgr.wire();
  mgr.showScene(Intro);
  
}
  