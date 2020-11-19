
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var ground;

var PLAY=1;
var END=0;
var gameState=PLAY;

var score=0;
var survivaltime=0;
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(400,400);
  
  monkey =createSprite(50,300,20,20);
  monkey.addAnimation("running",monkey_running);
  monkey.scale=0.1;
 
  ground= createSprite(50,350,800,10);
  
  ground.x=ground.width/2;

  obstacleGroup=new Group();
  FoodGroup = new Group();

}


function draw() {
  background("skyblue");
 
   
 
  //monkey collides
 monkey.collide(ground);
  text("SCORE:"+score,310,50);
  text("SurvivalTime:"+survivaltime,200,50); 
  
  if (gameState===PLAY){
  if (monkey.isTouching(FoodGroup)){
    FoodGroup.destroyEach();
    score=score+2;
  }
 ground.velocityX=-2;
    survivaltime=survivaltime+Math.round(getFrameRate()/60);
    
    if (keyDown("space")&& monkey.y>219){
    monkey.velocityY=-12;
  }
 //add gravity
  monkey.velocityY=monkey.velocityY+0.8;
  
  
 obstacles();
  bananas();
  
    if (monkey.isTouching(obstacleGroup)){
    gameState=END;
      
  }
  
  
  }
  else if (gameState===END){
    
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
    
   ground.velocityX=0; 
    monkey.velocityY=0;
 
    monkey.y=300;
    
    fill("red");
      textSize(30);
      text("GAMEOVER!!!",100,160);
      text("press R to restart",100,200);
    
    if(keyDown("R")){
      reset();
    }
  }
 
  


  if (ground.x<0){
     ground.x=ground.width/2; 
  }
  drawSprites();
}


function bananas(){
  if(frameCount%80===0){
    banana= createSprite(300,200,20,20);
    banana.y=Math.round(random(120,200));
     banana.velocityX=-(8+score/100);
    banana.addImage("banana",bananaImage);
    banana.scale=0.1;
    banana.Lifetime=35;
   FoodGroup.add(banana);
    
  }
}

function obstacles(){
  if (frameCount%100===0){
    obstacle= createSprite(300,310,20,20);
    obstacle.addImage("obstacle",obstaceImage);
    obstacle.scale=0.2;
    obstacle.velocityX=-(8+score/100);
    obstacle.Lifetime=30;
      obstacle.depth=monkey.depth;
    monkey.depth=monkey.depth+1;   
    obstacleGroup.add(obstacle);
  }  
}

function reset(){
 gameState=PLAY;
  obstacleGroup.destroyEach();
  FoodGroup.destroyEach();
  score=0;
  survivaltime=0;
 
}

