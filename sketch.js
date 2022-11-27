let gravity = 0;
let acc = 0;
let start = false;
let stepPipe = 0;
let stepPipe1 = 0;
let stepPipe2 = 0;
let hit = false;
let score = 0;

function preload() {
  bg = loadImage('background.png');
  birdImage = loadImage("bird.png");
}
function setup() {
  createCanvas(400, 400);
  stroke(0);
  strokeWeight(2);
  topY = random(50,160);
  topY1 = random(50,160);
  topY2 = random(50,160);
}

function draw() {
  background(bg);
  ground();
  if (start == true) {
    acc+=0.35;
    gravity+=acc/2;
    stepPipe+=3;
    stepPipe1+=3;
    stepPipe2+=3;
  } else {
    fill(255);
    textSize(13);
    text("Press SPACE to Start",10,190);
  }
  bird();
  pipes();
  collideControl();
  if (hit == true) {
    gameOver();
  }
  playerScore();
}

function ground() {
  fill("#dab887");
  rect(0, height-40, width, height);
}

function bird() {
  birdY = constrain(height/2 + gravity, 0, height-80);
  if (birdY <= 0 || birdY >= height-80) gameOver();
  image(birdImage, 40, birdY, 50, 40);
}

function keyPressed() {
  if (keyCode == 32) {
    start = true;
    acc = -8;
  }
}

function pipes() {
  fill(0,255,0);
  //PIPE 1
  pipeX1 = width-70-stepPipe;
  if (pipeX1+40 <= 0) {
    //Reset Pipe 1
    stepPipe = -70;
    pipeX1 = width-70-stepPipe;
    topY = random(50,160);
  }
  //Top Pipe
  rect(pipeX1, 0, 40, topY); //posX, posY, sizeX, sizeY
  //Bottom Pipe
  rect(pipeX1, height-40, 40, -1*(height-180-topY));
  
  //PIPE 2
  pipeX2 = width+70-stepPipe1;
  if (pipeX2+40 <= 0) {
    //Reset Pipe 2
    stepPipe1 = 70;
    pipeX2 = width+70-stepPipe1;
    topY1 = random(50,160);
  }
  //Top Pipe
  rect(pipeX2, 0, 40, topY1); //posX, posY, sizeX, sizeY
  //Bottom Pipe
  rect(pipeX2, height-40, 40, -1*(height-180-topY1));
  
  //PIPE 3
  pipeX3 = width+210-stepPipe2;
  if (pipeX3+40 <= 0) {
    //Reset Pipe 3
    stepPipe2 = 210;
    pipeX3 = width+210-stepPipe2;
    topY2 = random(50,160);
  }
  //Top Pipe
  rect(pipeX3, 0, 40, topY2); //posX, posY, sizeX, sizeY
  //Bottom Pipe
  rect(pipeX3, height-40, 40, -1*(height-180-topY2));
  
}

function collideControl() {
  if (hit == false) {
    hit = 
    collideRectRect(40, birdY, 50, 40, pipeX1, 0, 40, topY)|| 
    collideRectRect(40, birdY, 50, 40, pipeX2, 0, 40, topY1)|| 
    collideRectRect(40, birdY, 50, 40, pipeX3, 0, 40, topY2)||
    collideRectRect(40, birdY, 50, 40, pipeX1, topY+160, 40, 240-topY)||
    collideRectRect(40, birdY, 50, 40, pipeX2, topY1+160, 40, 240-topY1)||
    collideRectRect(40, birdY, 50, 40, pipeX3, topY2+160, 40, 240-topY2);
  }
  if(collideRectRect(40, birdY, 1, 32, pipeX1-20, 0, 1, height) ||
    collideRectRect(40, birdY, 1, 32, pipeX2-20, 0, 1, height) ||
    collideRectRect(40, birdY, 1, 32, pipeX3-20, 0, 1, height)) {
    score++
  }
}

function playerScore() {
  fill(255);
  textSize(30);
  text(score,width/2,50);
}

function gameOver() {
  noLoop();
  restartGame();
}

function restartGame() {
  setTimeout(() => {
    gravity = 0;
    acc = 0;
    start = false;
    stepPipe = 0;
    stepPipe1 = 0;
    stepPipe2 = 0;
    hit = false;
    score = 0;
    loop();
  },2000)
}