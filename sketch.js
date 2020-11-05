var towerImage,tower;

var doorsImage,doorsGroup,door;

var climberImage,climber,climbersGroup;

var ghostImage,ghost;

var invisbleGroup,invisbleblock;

var gamestate="play"

var spookysound;




function preload(){
towerImage=loadImage("tower.png") 
doorsImage=loadImage("door.png")
climberImage=loadImage("climber.png")  
ghostImage=loadImage("ghost-standing.png") 
  
spookysound=loadSound("spooky.wav")
  
doorsGroup=new Group();
climbersGroup=new Group(); 
invisbleGroup=new Group();
  
}


function setup(){
createCanvas (600,600)
 tower = createSprite(300,300)
spookysound.loop();  
tower.addImage(towerImage)
tower.velocityY=3 

ghost=createSprite(200,200,50,50)
ghost.addImage("ghost",ghostImage)
  
ghost.scale=0.5
}


function draw(){
  background("lightblue")
  
  if (gamestate === "play") {
    if(keyDown("left_arrow")){
      ghost.x = ghost.x - 3;
    }
    
    if(keyDown("right_arrow")){
      ghost.x = ghost.x + 3;
    }
    
    if(keyDown("space")){
      ghost.velocityY = -10;
    }
    
    ghost.velocityY = ghost.velocityY + 0.8
    
    if(tower.y > 400){
      tower.y = 300
    }
    spawndoors();

    
    //climbersGroup.collide(ghost);
    if(climbersGroup.isTouching(ghost)){
      ghost.velocityY = 0;
    }
if(invisbleGroup.isTouching(ghost) || ghost.y > 600){
      ghost.destroy();
      gamestate = "end"
    }
    
    drawSprites();
  }
  
  if (gamestate === "end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 230,250)
  }
  
}

function spawndoors(){
 if (frameCount % 240 === 0){
    door = createSprite(200, -50); 
    climber = createSprite(200,10);
    invisbleblock=createSprite(200,15);
    invisbleblock.width=climber.width
    invisbleblock.height=4
    door.x = Math.round(random(120,400));
    climber.x = door.x;
    door.addImage(doorsImage); 
    climber.addImage(climberImage);
    door.velocityY = 1;
    climber.velocityY = 1;
    ghost.depth = door.depth
    ghost.depth = ghost.depth+1
    door.lifetime = 800;
    climber.lifetime = 800;
    doorsGroup.add(door); 
    climbersGroup.add(climber);
   invisbleblock.debug=true
   invisbleGroup.add(invisbleblock);
 }
 
    


}