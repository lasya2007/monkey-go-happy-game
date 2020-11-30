//initiating global variables
var monkey , monkey_running;
var ground;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;

function preload(){
  
  //loading animations
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  //loading images
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  //creating canvas
  createCanvas(400,400);
  
  //creating monkey sprite and adding animation
  monkey=createSprite(30,330,10,10);
  monkey.addAnimation("running",monkey_running);
  monkey.scale=0.1;

  //creating ground
  ground=createSprite(300,380,600,40);
  ground.shapeColor="brown";
  
  //food and obstacle groups
  FoodGroup=new Group();
  obstacleGroup=new Group();
  
  //score
  score=0;
  
}


function draw() {
  //background color
  background("darkgreen");
  
  //scoring
  text("Survival time: "+score,200,10);
  score=score+Math.round(getFrameRate()/60);
  //moving and resetting ground
  ground.velocityX=-6;
  if(ground.x<100) {
    ground.x=300;
  }
  
  //jumping monkey
  if(keyDown("space")&&monkey.y>300) {
    //monkey.y=monkey.y-80;
    monkey.velocityY=-15;
  }
  
  //gravity
  monkey.velocityY=monkey.velocityY+0.9;
  
  //creating food
  food();
  
  //creating obstacle
  stone();
  
  //creating sprite edges and making them collide
  createEdgeSprites();
  monkey.collide(ground);
  
  //drawing sprites
  drawSprites();
}

function food() {
  //creating banana every 80 frames
  if(frameCount%80===0) {
    banana=createSprite(400,Math.round(random(210,280)),5,5);
    //assigning properties and adding image
    banana.addImage(bananaImage);
    banana.scale=0.09;
    banana.velocityX=-6;
    banana.lifetime=70;
    FoodGroup.add(banana);
  }
}

function stone() {
  //creating stone every 300frames
  if(frameCount%300===0) {
    obstacle=createSprite(400,330,10,10);
    //assigning properties and adding image
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.2;
    obstacle.velocityX=-6;
    obstacle.lifetime=70;
    obstacleGroup.add(obstacle);
  }
}


