var PLAY = 1;
var END = 0;
var gameState = PLAY;

var bee,beeImg,beeImage;
var score,gameover,gameoverImg;
var laserGroup;
var canvas


function preload(){
beeImg=loadAnimation("bee2.png","bee1.png");
  gameoverImg=loadAnimation("gameover1.png.png","gameover2.png.png")
  beeImage=loadAnimation("bee1.png");
}

function setup() {
  canvas=createCanvas(680, 290);
  
  
  bee=createSprite(50,145,10,10);
  bee.addAnimation("bee",beeImg);
  bee.addAnimation("stopped",beeImage);
  bee.scale=0.1;
  
  gameover=createSprite(canvas.Width/2,145,10,10);
  gameover.addAnimation("gameover",gameoverImg);
  gameover.scale=0.8
  
  
   score=0
  
  laserGroup= createGroup()
     
}

function draw() {
  background("skyblue");
  
 if(gameState===PLAY){
   
   gameover.visible=false

   bee.changeAnimation("bee",beeImg);
   
if(keyDown(UP_ARROW)){
      bee.velocityY = -10;
    }
  
    bee.velocityY = bee.velocityY + 0.8
  
   score = score + Math.round(getFrameRate()/60);
   
   if(laserGroup.isTouching(bee)||bee.y>290){
        gameState = END;
    }
  
    spawnLaser()
  spawnLaser1()
  
   
 }else if(gameState===END){
   
   textSize(20);
   fill("blue")
   text("Press space to restart",60,185)
   
   gameover.visible=true
   bee.changeAnimation("stopped",beeImage);
   
   bee.velocityY=0
   
 if(keyDown("space")){
reset()
 }
   
    laserGroup.setLifetimeEach(-1);
     laserGroup.setVelocityXEach(0)
   
 }

 camera.position.x=30;
 camera.position.y=145;

  
  drawSprites()
  
  textSize(15);
  fill(0)
  text("SCORE:"+score,30,30);
  
}

function reset(){
  gameState=PLAY;
  gameover.visible=false;
  
 laserGroup.destroyEach();
  bee.x=50
  bee.y=145
  
  score=0;

}

function spawnLaser() {
  
  if (frameCount % 60 === 0) {
    var laser = createSprite(680,120,10,Math.round(random(100,400)));
    laser.y = Math.round(20);
     laser.shapeColor=("magenta")
    laser.scale = 0.5;
    laser.velocityX = -3;
    
     //assign lifetime to the variable
    laser.lifetime = 320;
    
    
laserGroup.add(laser);
    
  }
}

function spawnLaser1() {
  
  if (frameCount % 90 === 0) {
    var laser = createSprite(680,120,10,Math.round(random(100,350)));
    laser.y = Math.round(260);
    laser.shapeColor=("magenta")
    laser.scale = 0.5;
    laser.velocityX = -3;
    
     //assign lifetime to the variable
    laser.lifetime = 320;
    
    laserGroup.add(laser);
  }
}