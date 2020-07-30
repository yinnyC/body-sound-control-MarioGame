// Name any p5.js functions we use in `global` so Glitch can recognize them.
/* global
 *    Intro,loadSound,soundFormats,Gameover,textAlign,CENTER,textFont,Instruction,bodyGame,soundGame,removeSprite,updateSprites,camera,Group,keyWentDown,drawSprites,createSprite,Clickable,drawIntroScreen,SceneManager,loadImage,ESCAPE,textSize,image,VIDEO,createCapture,ml5,HSB, background, color, collideRectRect, colorMode, createCanvas, fill, frameRate, keyCode, height,
 *    loop, noFill, noLoop, noStroke, random, rect, round, stroke, sqrt, text, width
 *    frameCount,UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW,Game
 */

let foregroundImg, backgroundImg, groundImg, title;
let introSong,coinSound,jumpSound
let gameBackgroungImg,gameLedgeImage,gameCoin1Img,gameCoin2Img,gameCoin3Img,gameCoin4Img;
function preload() {
  // set the global sound format
  soundFormats('mp3')
  // Materials for Intro
  foregroundImg = loadImage("https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2Fsky_2.png?v=1595568118809");
  backgroundImg = loadImage("https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2Fsky.png?v=1595568225904");
  groundImg = loadImage("https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2Ftop_ground.png?v=1595568970498");
  title = loadImage("https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2FSuper.png?v=1595626658046");
  // Materials for Game
  // jingle/music
  coinSound = loadSound("https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2FCoin.mp3?v=1596004574113");
  jumpSound = loadSound("https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2FJump.mp3?v=1596005029268");
  gameBackgroungImg = loadImage("https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2Fbg.png?v=1595800295790");
  gameLedgeImage = loadImage("https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2Flongledge.png?v=1595801236364");
  gameCoin1Img = loadImage("https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2Fcoins_01.png?v=1595864834355");
  gameCoin2Img = loadImage("https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2Fcoins_02.png?v=1595864834664");
  gameCoin3Img = loadImage("https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2Fcoins_03.png?v=1595864834265")
  gameCoin4Img = loadImage("https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2Fcoins_04.png?v=1595864834678")
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
  mgr.coinSound = coinSound;
  mgr.jumpSound = jumpSound;
  mgr.gameBackgroungImg = gameBackgroungImg;
  mgr.gameLedgeImage = gameLedgeImage;
  mgr.gameCoin1Img = gameCoin1Img;
  mgr.gameCoin2Img = gameCoinImg;
  mgr.gameCoin3Img = gameCoin1Img;
  mgr.gameCoin4Img = gameCoin1Img;
  mgr.wire();
  mgr.showScene(Intro);
}
  