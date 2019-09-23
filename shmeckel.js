var cvs = document.getElementById("mainCanvas");
var ctx = cvs.getContext('2d');

// load images

var shmeckel = new Image();
var scissorNorth = new Image();
var scissorSouth = new Image();

shmeckel.src = "replaceme.jpg";
scissorNorth.src = "scissornorth.jpg";
scissorSouth.src = "scissorsouth.jpg";

// some variables

var gap = 85;
var constant;

var bX = 10;
var bY = 150;

var gravity = 1.5;

var score = 0;

// on key down

document.addEventListener("keydown",moveUp);

function moveUp(){
    bY -= 25;
    fly.play();
}

// scissor coordinates

var scissor = [];

scissor[0] = {
    x : cvs.width,
    y : 0
};

// draw images

function draw(){

    for(var i = 0; i < scissor.length; i++){

        constant = scissorNorth.height+gap;
        ctx.drawImage(scissorNorth,scissor[i].x,scissor[i].y);
        ctx.drawImage(scissorSouth,scissor[i].x,scissor[i].y+constant);

        scissor[i].x--;

        if( scissor[i].x == 125 ){
            scissor.push({
                x : cvs.width,
                y : Math.floor(Math.random()*scissorNorth.height)-scissorNorth.height
            });
        }

        // detect collision

        if( bX + shmeckel.width >= scissor[i].x && bX <= scissor[i].x + scissorNorth.width && (bY <= scissor[i].y + scissorNorth.height || bY+shmeckel.height >= scissor[i].y+constant) || bY + shmeckel.height >=  cvs.height){
            //location.reload(); // reload the page
        }

        if(scissor[i].x == 5){
            score++;
            scor.play();
        }
    }

    ctx.drawImage(shmeckel,bX,bY);

    bY += gravity;

    ctx.fillStyle = "#000";
    ctx.font = "20px Verdana";
    ctx.fillText("Age : "+score,10,cvs.height-20);

    requestAnimationFrame(draw);

}

draw();
