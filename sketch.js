var drops=[];

var w = 1000;
var h = 650;
var cellsize=30;
var rows=w/cellsize-1;
var cols=h/cellsize-2;
let grid = [];
var listOfColors = [];
var start=false;
var count = 51;
var notinf=0;
var counter = setInterval(timer, 1000); //1000 will  run it every 1 second
var playendf=false;
var good_perc=0;
var inf_perc=0;
var covposx=w;
var covposx1=0;
var covposy=h;
var covposy1=0;
var coffimgx=w/4;
var coffimgy=h/2+100;
let offset = w;
let easing = 0.009;
let asmid;
function timer()
{
  if(start)
  count = count - 1;
  if (count <= 0)
  {
     clearInterval(counter);
     //createP("Time's up!");

     count = 0;
     playendf=true;
    //counter ended, do something here
    //return;
  }
  //Do code for showing the number of seconds here
}
function preload(){
  startimg = loadImage('startimg1.png'); // Load the image
  soapimg = loadImage('soap.png'); // Load the image

sucimg=loadImage('suc.png'); // Load the image
failedimg=loadImage('failedimg1.png'); // Load the image
coffimg=loadImage('coffin1.png'); // Load the image
covidcellimg=loadImage('covidcell1.png'); // Load the image
asmid = loadSound('astronomia.mp3');
coronago = loadSound('coronago.mp3');
enta = loadSound('enta.mp3');
te2dr = loadSound('te2dr.mp3');
asf = loadSound('asf.mp3');

}
function setup() {
  //print(window.innerWidth);
  //print(window.innerHeight);
  clear();
  listOfColors = [color('#ffdbac'), color('#f1c27d'), color('#e0ac69')];
  canvas=createCanvas(w, h);
  var x = (windowWidth - width) / 2;
var y = (windowHeight - height) / 2;
canvas.position(x, y);
  background(255,227,159);
   fill(0);
   noStroke();
   for (let x = 0; x < rows; x++) {
    grid[x] = []; // create nested array
    for (let y = 1; y < cols; y++) {
      grid[x][y] = 1;
    }
  }
  for(var i=0;i<480;i++)//for drops winner
    {
        drops[i] = new Drop();
    }
    if(!coronago.isPlaying()){
      coronago.play();
    }
}

function draw() {
    noCursor();
  if(!playendf&&!coronago.isPlaying()&&!(te2dr.isPlaying()||enta.isPlaying()||asmid.isPlaying())){
    coronago.play();
  }
  if(start==true&&!playendf){
//setAlpha(128 + 128 * sin(millis() / 1000));

  play();

}else{
  //    imageMode(CENTER);
if(!playendf){
  image(startimg, 10,1, w,h);
  textAlign(CENTER);
  textSize(getRndInteger(27,30));
  fill(getRndInteger(0,255),getRndInteger(0,255),0);
  text('Press Space to Start\n',w-w/4+(getRndInteger(-2,2)),h-h/10+(getRndInteger(-2,2)));

}

  else {
    clear();
    playend();
    scores();
  }
}
}
function playend(){

    image(startimg, 0,1, w,h);

    //text('Game Over',w/2,h/2);
}
function play(){
  clear();
  soapimg.resize(90, 90);

  for (var row=0; row<rows; row = row + 1){ //

      for (var col=1; col<cols; col = col + 1){ //
//grid[row][col]=row*col;
if(grid[row][col]==0){
    fill(listOfColors[int(random(0, listOfColors.length))]);
         stroke(1);
}if(grid[row][col]==1){
  fill(40,getRndInteger(80,100),40); // odd columns are white
    stroke(1);

}

     rect((row*cellsize), (col*cellsize)+30,cellsize,cellsize+25,7,7);
      } // end of the columns loop

   } // end of the rows loop
   image(soapimg,pmouseX-cellsize,pmouseY-cellsize,cellsize*3,cellsize*3);

   if(covposx<-10)
   covposx=w;

   image(covidcellimg,covposx--,covposy-150,cellsize*5,cellsize*5);
   if(covposx1>w+10)
   covposx1=0;
   image(covidcellimg,covposx1++,covposy1+150,cellsize*5,cellsize*5);

coffineimgup();
   scores();
}
function coffineimgup(){
  if(count<31&&inf_perc>=60){
  //image(coffimg, 0, 0); // Display at full opacity
   let dx = count - coffimg.width / 2 - offset;
   offset += dx * easing;
   tint(255, 150); // Display at half opacity
   image(coffimg, offset+(1/count), 0,rows*cellsize,h);
   if (!asmid.isPlaying()&&!asf.isPlaying()) {
coronago.stop();
     //coronago=asmid;
     asmid.play();
     //asmid.play();
   }

 }
  if(count<31&&good_perc>=40){
       if(!te2dr.isPlaying()){
       coronago.stop();
       asmid.stop();
       asmid.stop();
       coronago.stop();
       enta.stop();
       te2dr.play();
     }
 }
  noTint(); // Disable tint
}


function scores(){
  check_not__Inf();
  s = "Seconds\n";
  good_perc=notinf/(rows*cols)*100;
  inf_perc=((rows*cols)-notinf)/(rows*cols)*100;
if(isNaN(good_perc))
good_perc=0;
if(isNaN(inf_perc))
inf_perc=0;
  if(playendf==false){
    fill('#9fbfdf');

    rect(0,0,width,h/11);
  fill(255,0,0);
  textSize(22);
      textStyle(BOLD);
      fill(getRndInteger(count*5,255-count),getRndInteger(count*5,255),getRndInteger(count*5,255));

   text(s+count, w/2, cellsize-10);
   fill(0,0,0);

      fill(25,getRndInteger(count*5,255),25);
   text("Good Cells", w/3, cellsize-10);
   text("\n"+nf(good_perc,2,2)+"%", w/3, cellsize-10);

   fill(getRndInteger(count*5,255),25,25);

   text("Infected Cells \n",w-w/3, cellsize-10);
   text("\n"+nf(inf_perc,2,2)+"%", w-w/3, cellsize-10);
   textSize(getRndInteger(16,17));
   fill(mouseY%256,mouseX%256,mouseX);
   text("CLICK MOUSE \n TO FIGHT", w-175, cellsize);
   textSize(getRndInteger(13,14));
   text(" SCORE MORE THAN 50% Good Cells\nTO WIN",w/7 , cellsize);


}else{
if(good_perc>=50){
  startimg=sucimg;
      if(!enta.isPlaying()&&playendf){
        coronago.stop();
        te2dr.stop();
        asmid.stop();
    enta.play();
    }
  fill(10,getRndInteger(110,255),10);
  textSize(getRndInteger(28,30));
  strokeWeight(0.1);
  textStyle(BOLDITALIC);
text("Good Cells\n"+nf(good_perc,2,2)+"%",w-w/7+10,getRndInteger(h-h/7-20,h-h/7-10));
for(var i=0;i<drops.length;i++)
  {
      drops[i].fall();
      drops[i].show();
  }
}else{
  startimg=failedimg;

  fill(getRndInteger(110,255),10,10);
  textSize(getRndInteger(28,30));
  strokeWeight(0.1);

  text("Infected Cells \n"+nf(inf_perc,2,2)+"%",w-w/7+10,getRndInteger(h-h/7-30,h-h/7-20));
  if (!asmid.isPlaying()&&!asf.isPlaying()&&playendf) {
  asmid.stop();
  coronago.stop();
  enta.stop();
  te2dr.stop()
  asf.play();

}
}
}
}
function check_not__Inf(){
  notinf=0;
  for (let x = 0; x < rows; x++) {
   for (let y = 1; y < cols; y++) {
if(grid[x][y]==0)
notinf++;
   }
 }

}

function mousePressed(){
  if(!start)
  start=true;
      if (mouseButton === LEFT&&start&&!playendf) {
  mx=  map(mouseX,0,w,0,rows);
  my=  map(mouseY,1,h,0,cols);
mx=round(mx);
my=round(my);
  print(mx+" "+my);
  grid[mx][my]=0;
  if(mx+1<=rows)
grid[mx+1][my]=0;
if(mx-1>=0)
grid[mx-1][my]=0
if(my+1<=rows);
grid[mx][my+1]=0;
if(my-1>=1)
grid[mx][my-1]=0;
//if(mx+1<=cols&&my+1)
}

}
window.onresize = function() {
  // assigns new values for width and height variables
  w = window.innerWidth;
  h = window.innerHeight;
  canvas.size(w,h);
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
function keyPressed() {
  if (keyCode === 32) {
start=true;
  }
}
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}
class Drop{

    constructor(){
        this.x = random(0,width);
        this.y = random(-200,-100);
        this.z = random(0,20);
        this.yspeed = map(this.z,0,20,4,10);
    }
    fall(){
        this.y = this.y + this.yspeed;
        var g = map(this.z,0,20,0,0.2);
        this.yspeed = this.yspeed + g;
        if(this.y > height){
            this.y = random(-200,-100);
            this.yspeed = random(30,40);
        }
    }
    show(){
        var l = map(this.z,0,20,10,20);
        var thickness = map(this.z,0,20,1,2);
        strokeWeight(thickness);
        stroke(random(100,255),random(100,255),random(100,255));
        line(this.x,this.y,this.x,this.y+20);
    }
}
