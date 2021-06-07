var man,target,obs_1,obs_2,bullet,play,won,gameOver,reset,instructions,back;

var manImg,targetImg,obs_1Img,obs_2Img,bulletImg,playButton,wonImg,gameOverImg;

var resetImg,instructionsImg,backImg;

var bg,bg_2,bg_3;

var touches=0;

var edges;

var gameState="serve";

function preload(){

  manImg=loadImage("Images/Man.png");
  obs_1Img=loadImage("Images/Wood.png");
  obs_2Img=loadImage("Images/Wood_2.png");
  playButton=loadImage("Images/Play.png");
  bg=loadImage("Images/Background.png");
  bg_2=loadImage("Images/Bg.png");
  bulletImg=loadImage("Images/Bullet.png");
  manImg=loadImage("Images/Man_1.png");
  targetImg=loadImage("Images/Target.png");
  wonImg=loadImage("Images/Youwon.png");
  gameOverImg=loadImage("Images/Gameover.png");
  resetImg=loadImage("Images/Reset.png");
  instructionsImg=loadImage("Images/Instrucitions.png");
  bg_3=loadImage("Images/Bg-2.png");
  backImg=loadImage("Images/Back.png");

}

function setup() {
  createCanvas(1500,1000);

  play=createSprite(600,700);
  play.addImage(playButton);
  play.scale=0.5;
  play.debug=false;
  play.setCollider("circle",0,0,200);

  reset=createSprite(750,200);
  reset.addImage(resetImg);
  reset.scale=0.5;
  reset.debug=false;
  reset.setCollider("circle",0,0,200);
  reset.visible=false;

  instructions=createSprite(1000,700);
  instructions.addImage(instructionsImg);
  instructions.scale=0.5;
  instructions.debug=false;
  instructions.setCollider("circle",0,0,200);

  back=createSprite(800,900);
  back.addImage(backImg);
  back.scale=0.5;
  back.debug=false;
  back.setCollider("circle",0,0,200);

  edges=createEdgeSprites();

  obs_1=createSprite(830,500);
  obs_1.addImage(obs_1Img);
  obs_1.scale=0.5;
  obs_1.velocityY=25;

  obs_2=createSprite(1200,500);
  obs_2.addImage(obs_2Img);
  obs_2.scale=0.5;
  obs_2.velocityY=-25;

  bullet=createSprite(150,500);
  bullet.addImage(bulletImg);
  bullet.scale=0.5;

  man=createSprite(150,700);
  man.addImage(manImg);
  man.scale=1.5;

  target=createSprite(1480,580);
  target.addImage(targetImg);
  target.scale=1;
  // target.debug=true;
  target.setCollider("circle",-10,0,25);

  won=createSprite(700,500);
  won.addImage(wonImg);
  won.scale=1;
  won.visible=false;

  gameOver=createSprite(750,550);
  gameOver.addImage(gameOverImg);
  gameOver.scale=0.5;
  gameOver.visible=false;

}

function draw() {  

  if(mousePressedOver(play)){

    gameState="play";

  }

  if(mousePressedOver(instructions)){
    gameState="ins";
  }

  if(mousePressedOver(back)){
    gameState="serve";
  }

  if(mousePressedOver(reset)){
    gameState="serve";

    bullet.x=man.x;
    bullet.y=man.y-100;
    bullet.velocityX=0;
  }

  obs_1.bounceOff(edges,2);
  obs_1.bounceOff(edges,3);

  obs_2.bounceOff(edges,2);
  obs_2.bounceOff(edges,3);

  if(gameState==="serve"){

    background(bg_2);
    play.visible=true;
    obs_1.visible=false;
    obs_2.visible=false;
    man.visible=false;
    bullet.visible=false;
    target.visible=false;
    back.visible=false;
    instructions.visible=true;
    gameOver.visible=false;
    reset.visible=false;
    won.visible=false;

  }

  if(gameState==="play"){

    background(bg);

    bullet.y=man.y-100;

    play.visible=false;
    obs_1.visible=true;
    obs_2.visible=true;
    man.visible=true;
    bullet.visible=true;
    target.visible=true;
    back.visible=false;
    instructions.visible=false;
    reset.visible=false;
    won.visible=false;

    if(keyDown("space")){
      bullet.velocityX=50;
    }


    if(bullet.isTouching(target)){
      gameState="finish";
    }

    if(gameState==="finish"){
      obs_1.visible=false;
      obs_2.visible=false;
      bullet.visible=false;
      back.visible=false;
      console.log("helloWorld");
      man.visible=false;
      won.visible=true;
      reset.visible=true;
    }


    if(obs_1.isTouching(bullet)||obs_2.isTouching(bullet)){
      gameState="end";
    }

    if(gameState==="end"){
      obs_1.visible=false;
      obs_2.visible=false;
      man.visible=false;
      bullet.visible=false;
      target.visible=false;
      gameOver.visible=true;
      back.visible=false;
      reset.visible=true;
      won.visible=false;
    }

  }

  if(gameState==="ins"){
    back.visible=true;
    play.visible=false;
    instructions.visible=false;
    background(bg_3);
    reset.visible=false;
    won.visible=false;
    gameOver.visible=false;
  }

  drawSprites();

  if(gameState==="ins"){
    strokeWeight(5);
    textSize(50);
    stroke("cyan");
    fill("teal");
    text("Hit The Target",650,100);
    textSize(30);
    stroke("violet");
    strokeWeight(4);
    fill("darkmagenta")
    text("Story:-",40,200);
    text("A man wants to participate in a shooting competition.",60,240);
    text("He wishes to win the game.",60,280);
    text("But there is a challenge that the obstacles are moving in the way to target.",60,320);
    text("So help the man to shoot the target.",60,360);
    stroke("dodgerblue");
    fill("magenta");
    text("Rules:-",40,550);
    text("Use space to shoot the target.",60,590);
    text("Do not touch the moving obstacles, if you touch you will lose.",60,630);
  }

}