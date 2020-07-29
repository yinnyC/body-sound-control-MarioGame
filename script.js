// Name any p5.js functions we use in `global` so Glitch can recognize them.
/* global
 *    Intro,loadSound,soundFormats,Gameover,textAlign,CENTER,textFont,Instruction,bodyGame,soundGame,removeSprite,updateSprites,camera,Group,keyWentDown,drawSprites,createSprite,Clickable,drawIntroScreen,SceneManager,loadImage,ESCAPE,textSize,image,VIDEO,createCapture,ml5,HSB, background, color, collideRectRect, colorMode, createCanvas, fill, frameRate, keyCode, height,
 *    loop, noFill, noLoop, noStroke, random, rect, round, stroke, sqrt, text, width
 *    frameCount,UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW,Game
 */

let foregroundImg, backgroundImg, groundImg, title;
let introSong,coinSound,jumpSound
function preload() {
  // set the global sound format
  soundFormats('mp3')
  // load background Images
  foregroundImg = loadImage("https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2Fsky_2.png?v=1595568118809");
  backgroundImg = loadImage("https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2Fsky.png?v=1595568225904");
  groundImg = loadImage("https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2Ftop_ground.png?v=1595568970498");
  title = loadImage("https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2FSuper.png?v=1595626658046");
  //
  coinSound = loadSound("https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2FCoin.mp3?v=1596004574113")
  jumpSound = loadSound("https://cdn.glitch.com/075b311a-0371-463a-a6ba-c4f6c09e32cb%2FJump.mp3?v=1596005029268")
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
  mgr.wire();
  mgr.showScene(Intro);
}
  