
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var PLAY=1
var END = 0
var gameState=PLAY
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
   createCanvas(600, 600);
  
  monkey = createSprite(50,580,20,50);
  
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(600,580,1200,20);
  ground.x = ground.width /2;
  ground.velocityX = -6;
  
 
  invisibleGround = createSprite(200,580,400,10);
  invisibleGround.visible = false;
  
  foodGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;

  
}


function draw() {
//trex.debug = true;
  background(255);
  text("Score: "+ score, 500,50);
  
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -6;
  
    if(keyDown("space") ) {
      monkey.velocityY = -12;
    }
  
    monkey.velocityY = monkey.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = 600;
    }
  
    monkey.collide(invisibleGround);
    spawnBananas();
    spawnObstacles();
  
    if(obstaclesGroup.isTouching(monkey)){
        gameState = END;
    }
  }
  else if (gameState === END) {
   
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    monkey.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);
    
    //change the trex animation
   
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
    
    
  
  }
  drawSprites();
  
}

function spawnBananas() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var banana = createSprite(600,400,40,10);
    banana.y = Math.round(random(350,500));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //add each banana to the group
    foodGroup.add(banana);
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,550,10,40);
    //obstacle.debug = true;
    obstacle.velocityX = -6;
    
    
   obstacle.addImage(obstacleImage)
     
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.1;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}




