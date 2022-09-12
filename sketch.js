var bg,bgImg;
var player, playerImg, shootingImg;
var zombie,zombie5Img;
var heart1,heart2,heart3,heart1Img,heart2Img,heart3Img
var zombieGroup;
var zombie1,zombie2,zombie3,zombie4,zombie1Img,zombie2Img,zombie3Img,zombie4Img;
var bullets = 70,bullet,bulletImg;
var gameState = "fight"
var score = 0
var life = 3
var win,lose,explosion


function preload(){
  
  playerImg = loadImage("assets/shooter_1.png","assets/shooter_2.png")
  shootingImg = loadImage("assets/shooter_3.png")
 
  heart1Img = loadImage("assets/heart_1.png")
  heart2Img = loadImage("assets/heart_2.png")
  heart3Img = loadImage("assets/heart_3.png")

  zombie1Img = loadImage("assets/zombie1.png")
  zombie2Img = loadImage("assets/zombie2.png")
  zombie3Img = loadImage("assets/zombie3.png")
  zombie4Img = loadImage("assets/zombie8.png")
  zombie5Img = loadImage("assets/zombie7.png")

  bulletImg = loadImage("assets/bullet.png")

  win = loadSound("assets/win.mp3")
  lose = loadSound("assets/lose.mp3")
  explosion = loadSound("assets/explosion.mp3")

  bgImg = loadImage("assets/bg.jpeg")

}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(playerImg)
   player.scale = 0.38
   //player.debug = true
   //player.setCollider("rectangle",0,0,300,500)

  heart1 = createSprite(displayWidth - 150, 40,20,20);
  heart1.visible = false
  heart1.addImage("heart1",heart1Img)
  heart1.scale = 0.4

  heart2 = createSprite(displayWidth - 100,40,20,20)
  heart2.visible = false
  heart2.addImage("heart2",heart2Img)
  heart2.scale = 0.4

  heart3 = createSprite(displayWidth - 150,40,20,20)
  heart3.visible = true
  heart3.addImage("heart3",heart3Img)
  heart3.scale = 0.4

  zombieGroup = new Group()
  bulletGroup = new Group()

}

function draw() {
  background(0); 

  if(gameState === "fight"){
    
    if(life === 3){
      heart3.visible = true
      heart2.visible = false
      heart1.visible = false
    }
    if(life === 2){
      heart3.visible = false
      heart2.visible = true
      heart1.visible = false
    }
    if(life === 1){
      heart3.visible = false
      heart2.visible = false
      heart1.visible = true
    }
    if(life === 0){
      gameState = "lost"
    }

    if(score === 100){
      gameState = "won"
      win.play()
    }


      //moving the player up and down and making the game mobile compatible using touches
    if(keyDown("UP_ARROW")||touches.length>0){
      player.y = player.y-30
    }
    if(keyDown("DOWN_ARROW")||touches.length>0){
     player.y = player.y+30
    }

    if(keyWentDown("space")){
      bullet = createSprite(displayWidth - 1150,player.y-30,20,10)
      bullet.addImage("bullet",bulletImg)
      bullet.scale = 0.15
      bullet.velocityX = 10
      bulletGroup.add(bullet)
      player.depth = bullet.depth
      player.depth = player.depth +2
      player.addImage(shootingImg);
      bullets = bullets - 1
      explosion.play()
    }
    else if(keyWentUp("space")){
      player.addImage(playerImg)
    }

    if(bullets == 0){
      gameState = "bullet"
      lose.play()
    }

    if(zombieGroup.isTouching(bulletGroup)){
      for(var i = 0;i < zombieGroup.length; i++){
        if(zombieGroup[i].isTouching(bulletGroup)){
          zombieGroup[i].destroy()
          bulletGroup.destroyEach()
          score += 2
        }
      }
    }

    if(zombieGroup.isTouching(player)){
      for(var i = 0;i < zombieGroup.length;i++){
        if(zombieGroup[i].isTouching(player)){
          zombieGroup[i].destroy()
          life -= 1
          lose.play()
       }   
      }
    }

    enemy()
  }



drawSprites();

  textSize(20)
  fill("white")
  text("Score = "+score,displayWidth - 250,displayHeight / 2 - 280)
  text("Lives = "+life,displayWidth - 250,displayHeight / 2 - 260)
  text("Bullets  = "+bullets,displayWidth - 250,displayHeight / 2 - 240)



  if(gameState === "lost"){
    textSize(100)
    fill("red")
    text("You Lost!!!",400,400)
    zombieGroup.destroyEach();
    player.destroy();
  }
  else if(gameState === "won"){
    textSize(100)
    fill("yellow")
    text("You Won!!!",400,400)
    zombieGroup.destroyEach();
    player.destroy();
  }
  else if(gameState === "bullet"){
    textSize(100)
    fill("orange")
    text("You Ran Out Of Bullets!!!",400,400)
    zombieGroup.destroyEach();
    player.destroy();
    bulletGroup.destroyEach()
  }



}

function enemy(){
  
  if(frameCount%90 === 0){
    zombie = createSprite(1700,random(100,displayHeight-100),50,50)
    //zombie.addImage("zombie",zombieImg);
    zombie.scale = 0.63
    zombie.velocityX = -3
   //zombie.debug = true
    //zombie.setCollider("rectangle",0,0,100,400)

    var rand = Math.round(random(1,5));
    switch(rand) {
      case 1: zombie.addImage(zombie1Img);
              break;
      case 2: zombie.addImage(zombie2Img);
              break;
      case 3: zombie.addImage(zombie3Img);
              break;
      case 4: zombie.addImage(zombie4Img);
              break; 
      case 5: zombie.addImage(zombie5Img);
              break;  
      default: break;
    }



    zombie.lifetime = 600
    zombieGroup.add(zombie);


    }

}
