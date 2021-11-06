var PLAY = 1;
var END = 0;
var gameState = PLAY;
var score = 0;

var girl, girlRunning, girlLost, bg, groundInvisible, bgImage, invisibleGround, edges;

var obst1, obst2, obst3, obst4, obst5, obst6, obstacles;

var coin1, coin2, coin3, coin4, coin5, coin6, coins, coinImage;
var coin;

var gameOver, gameOverImg, restart, restartImg;

var obstaclesGroup, coinsGroup;

function preload() {

  bgImage = loadImage("19333403.jpg");

  girlRunning = loadAnimation("girl1.png", "girl2.png", "girl3.png", "girl4.png", "girl5.png", "girl6.png", "girl7.png");

  coinImage = loadAnimation("coin1.png", "coin2.png", "coin3.png", "coin4.png", "coin5.png", "coin6.png", "coin7.png", "coin8.png");
  
  //girlLost = loadAnimation("");

  /*obst1 = loadImage("obstacle1.png");
  obst2 = loadImage("obstacle2.png");
  obst3 = loadImage("obstacle3.png");
  obst4 = loadImage("obstacle4.png");
  obst5 = loadImage("obstacle5.png");
  obst6 = loadImage("obstacle6.png");*/

  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");

}

function setup() {

  createCanvas(800, 500);

  coinsGroup = new Group();
  obstaclesGroup = new Group();

  bg = createSprite(1050, 200);
  bg.addImage("bg", bgImage);
  bg.scale = 0.23;


  invisibleGround = createSprite(0, 500, 800, 10);
  invisibleGround.visible = false;

  girl = createSprite(100, 400,50,50);
  girl.addAnimation("girl",girlRunning);
  girl.scale = 0.1;




}

function draw() {

  background(255, frameCount, 15);

  if (bg.x < 0) {
    bg.x = 1050;
  }

  if (gameState == PLAY) {

    gameover = false;
    restart = false;
    bg.velocityX = -2;

    if (bg.x < 0) {
      bg.x = 1050;
    }

    if (keyDown("space")) {
      girl.velocityY = -10;
    }
    girl.velocityY = girl.velocityY + 0.8;

    girl.collide(invisibleGround);
    
    //if(frameCount % 100 == 0){
     // spawnObstacles;
    //}

    if(frameCount%60 == 0){
      spawnCoin();
    }

    if(girl.isTouching(coinsGroup)){
      score +=5;
      coin.remove();
      
    }
    
    if(obstaclesGroup.isTouching(girl)){
      gameOver = true;
      gameState = END;
    }
    
  } else if(gameState == END){
    restart = true;
    girl.velocityX  = 0;
    girl.velocityY = 0;
    bg.velocityX = 0;
    
  }

  drawSprites();

  text("Score: " + score, 700, 30);

}

function spawnCoin() {
  console.log("ok");

  coin = createSprite(600,Math.round(random(60,570)));
  coin.addAnimation("coinAnimation",coinImage);
  coin.scale = 0.2;
  coinsGroup.add(coin);
  coin.velocityX = -2;
  coin.lifeTime = 300;
}

/*function spawnObstacles() {

  var obstNum = Math.round(random(1, 6));
  obstacles = createSprite(600, 165, 30, 30);
  obstacles.velocityX = -2;

  switch (obstNum) {
    case 1:
      obstacles.addImage(obst1);
      break;
    case 2:
      obstacles.addImage(obst2);
      break;
    case 3:
      obstacles.addImage(obst3);
      break;
    case 4:
      obstacles.addImage(obst4);
      break;
    case 5:
      obstacles.addImage(obst5);
      break;
    case 6:
      obstacles.addImage(obst6);
      break;
    default:
      break;

  }

  obstacles.scale = 0.5;
  obstacles.lifetime = 300;
  obstaclesGroup.add(obstacles);


}*/