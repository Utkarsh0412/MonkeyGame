
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score;
var play=1,end=0;
var gamestate=play;
var forestImage;
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  forestImage = loadImage("forestImage.png")
 
}



function setup() {
  score=0;
  FoodGroup=new Group();
  obstacleGroup=new Group();
  createCanvas(400,400);
 monkey=createSprite(50,350,20,20);
 monkey.addAnimation("moving",monkey_running);
 monkey.scale=0.1;


 ground=createSprite(100,400,800,20);
 ground.velocityX = -4;
 ground.x = ground.width /2;  
  
  
}


function draw() {
  
  background(225);
    text("Score: "+ score, 50,50);
  if(gamestate===play){
    if(FoodGroup.isTouching(monkey)){
    FoodGroup.destroyEach();   
     }
  if(obstacleGroup.isTouching(monkey)){
  gamestate=end; 
     }
  spawnBananas();
  spawnObstacles();

     if (ground.x < 0){
      ground.x = ground.width/2;
    }
  if(keyDown("space")){
   monkey.velocityY=-7;    
     }
    monkey.velocityY = monkey.velocityY + 0.8;
    score = score + Math.round(getFrameRate()/30);
    monkey.debug=true;
   
     }else if(gamestate===end){
      FoodGroup.setVelocityXEach(0);
     obstacleGroup.setVelocityXEach(0);  
      ground.velocityX=0;
      monkey.velocityY=0;
       FoodGroup.setLifetimeEach(-1);
       obstacleGroup.setLifetimeEach(-1);
      text("GameOver Press Space to restart",140,200)
      if(keyDown("space")){
       score=0;
        gamestate=play;
        obstacleGroup.destroyEach();
        FoodGroup.destroyEach(); 
         }
     }
    monkey.collide(ground);
  
  
drawSprites();
  
}
function spawnBananas() {
  if (frameCount % 60 === 0) {
    banana = createSprite(400,200,40,10);
    banana.y = Math.round(random(100,200));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
    banana.lifetime = 200;
    FoodGroup.add(banana);
    }
}
function spawnObstacles(){
  if(frameCount%80===0){
      obstacle=createSprite(400,370,10,40);
     obstacle.velocityX = -6;
     obstacle.addImage(obstacleImage);
     obstacle.scale=0.2;
     obstacle.lifetime=300;
     obstacleGroup.add(obstacle);
    
     }
}
