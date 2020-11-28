var sword;
var fruit, fruit1, fruit2, fruit3, fruit4;
var PLAY=1;
var END=0;
var gameState = PLAY;
var score = 0;
var fruitGroup, enemyGroup;
var monster;
var position;

function preload(){
swordImage = loadImage("sword.png");
fruit1 = loadImage("fruit1.png");
fruit2 = loadImage("fruit2.png");
fruit3 = loadImage("fruit3.png");
fruit4 = loadImage("fruit4.png");
monsterImage = loadImage("alien1.png");
gameOverImage = loadImage("gameover.png");  
  
knifeSound = loadSound("knifeSwooshSound.mp3");
gameOverSound = loadSound("gameover.mp3");
}


function setup(){

sword = createSprite(40,200,20,20);
sword.addImage(swordImage);
sword.scale = 0.7;

  fruitGroup = new Group();
  enemyGroup = new Group();
}


function draw(){
 background("lightblue");
  text("Score: "+ score, 300,50);

  if(gameState === PLAY){
sword.x = World.mouseX;
sword.y = World.mouseY;
drawfruit();
drawenemy();  
    
if(fruitGroup.isTouching(sword)){
 fruitGroup.destroyEach();
score = score+1;
knifeSound.play();
}
   if(enemyGroup.isTouching(sword)){
    enemyGroup.destroyEach();
   sword.addImage(gameOverImage);
   sword.x = 200;
   sword.y = 200; 
   gameOverSound.play();
     gameState = END;
}
}   
  
  else if (gameState === END){
    fruitGroup.destroyEach();
     enemyGroup.destroyEach();
    
  } 

  drawSprites();

}
function drawfruit(){
  if(World.frameCount%80 === 0){
  fruit = createSprite(400,200,20,20);
    
  position = Math.round(random(1,2));
    
   if(position === 1){
   fruit.x = 400;  
  fruit.velocityX = -(7 + score/4); 
   }
    else if (position === 2){
      fruit.x = 0;
      fruit.velocityX = +(7 + score/4);
    }

    fruit.scale = 0.2;
  r = Math.round (random(1,4))
  
  if (r === 1){
    fruit.addImage(fruit1);
  }
  else if (r === 2){
      fruit.addImage(fruit2);
    }
  else if (r === 3){
    fruit.addImage(fruit3);
  }
  else if (r === 4){
    fruit.addImage(fruit4);
  }
  
  fruit.y = Math.round(random(50,340));
  
  fruit.setLifetime=100;   
  fruitGroup.add(fruit);

    
}
}
function drawenemy(){
  if(World.frameCount%200 === 0){
    monster = createSprite(400,200,20,20);
    monster.addAnimation("moving",monsterImage);
    monster.y=Math.round(random(100,300));
    monster.velocityX = -(8 + score/10);
    monster.setLifetime = 50;
    
    
    enemyGroup.add(monster);
    
  }
  
}
