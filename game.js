var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

// load images

var baby = new Image();
var scinorth = new Image();
var scisouth = new Image();

baby.src = "images/boss baby.png";
scinorth.src = "images/scissornorth.png";
scisouth.src = "images/scissorsouth.png";


// some variables

var gap = 85;
var constant;

var bX = 10;
var bY = 150;

var gravity = 1.8;

var score = 0;

// audio files

document.addEventListener("keydown",moveUp);

function moveUp(){
    bY -= 35;
    fly.play();
}

// pipe coordinates

var scissor = [];

scissor[0] = {
    x : cvs.width,
    y : 0
};

// draw images

function draw(){


    for(var i = 0; i < scissor.length; i++){

        constant = scinorth.height+gap;
        ctx.drawImage(scinorth,scissor[i].x,scissor[i].y);
        ctx.drawImage(scisouth,scissor[i].x,scissor[i].y+constant);

        pipe[i].x--;

        if( pipe[i].x == 125 ){
            pipe.push({
                x : cvs.width,
                y : Math.floor(Math.random()*pipeNorth.height)-pipeNorth.height
            });
        }

        // detect collision

          if( bX + baby.width >= scissor[i].x && bX <= scissor[i].x + scissorNorth.width && (bY <= scissor[i].y + scissorNorth.height || bY+baby.height >= scissor[i].y+constant) || bY + baby.height >=  cvs.height){
            location.reload(); // reload the page
        }

        if(scissor[i].x == 5){
            score++;
            scor.play();
        }


    }

    ctx.drawImage(scinorth,0,cvs.height - scisouth.height);

    ctx.drawImage(baby,bX,bY);

    bY += gravity;

    ctx.fillStyle = "#000";
    ctx.font = "20px Verdana";
    ctx.fillText("Score : "+score,10,cvs.height-20);

    requestAnimationFrame(draw);

}

draw();
