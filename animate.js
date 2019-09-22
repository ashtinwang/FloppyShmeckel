function handleShmeckelAnimation() {
  if (CONTROLS.shmeckel.up) {
    SHMECKEL.y += SHMECKEL.speed;
  }
  if (CONTROLS.ship.down) {
    SHMECKEL.y -=  SHMECKEL.speed;
  }

  // Check if scissors is leaving the boundary, if so, switch sides
  if (SHMECKEL.x > GAME.canvas.width) {
    SHMECKEL.x = 0;
  } else if (SHMECKEL.x < 0) {
    SHMECKEL.x = 600;
  } else if (SHMECKEL.y > GAME.canvas.height) {
    SHMECKEL.y = 0;
  } else if (SHMECKEL.y < 0) {
    SHMECKEL.y = 300;
  }
}

function handleScissorAnimation() {
    SCISSORS.scissors.forEach(function(scissors, index, object) {

        // Move the scissors forwar
          scissors.x += SCISSORS.baseSpeed;

          // Check if scissors is leaving the boundary, if so, switch sides
          if (scissors.x > GAME.canvas.width) {
            scissors.x = 0;
          } else if (scissors.x < 0) {
            scissors.x = 600;
          } else if (scissors.y > GAME.canvas.height) {
            scissors.y = 0;
          } else if (scissors.y < 0) {
            scissors.y = 300;
          }
    });

}

function spaceShipAsteroidCollisionCheck() {
    var SHMECKEL_SIZE_BOX = 15; // 10px;
    var hit = false;

    SCISSORS.scissors.forEach(function(scissors) {
      if (
        SHMECKEL.latest.x + SHMECKEL_SIZE_BOX > scissors.x &&
        SHMECKEL.latest.x - SHMECKEL_SIZE_BOX < scissors.x &&
        SHMECKEL.latest.y + SHMECKEL_SIZE_BOX > scissors.y &&
        SHMECKEL.latest.y - SHMECKEL_SIZE_BOX < scissors.y)
        {
          hit = true;
        }
    });

    if (hit) {
      SCISSORS.scissors = SCISSORS.scissors.filter(
        (scissors) => {
        return (scissors.remove == false);
      });

      if (SHMECKEL.health < 0) {
        GAME.started = false;
      }
    }

    if (SCISSORS.scissors.length == 0) {
      GAME.level++;
      SCISSORS.activeCount++;
      for (var i = 0; i < SCISSORS.activeCount; i++) {
        AddScissor();
      }
    }
}

function runGame() {
  var canvas = document.getElementById('mainCanvas');
  var context = canvas.getContext('2d');
  if (GAME.started) {
    handleShmeckelAnimation();
    handleScissorAnimation();

    // Check for collisions
    ShmeckelScissorCollisionCheck();

    context.clearRect(0, 0, 600, 300);
    RenderShmeckel(context);
    RenderScissors(context);
  } else {
    context.font = "30px Arial";
    context.fillText("Game Over      Age " + GAME.level, 135, 200);
  }
  window.requestAnimationFrame(runGame);

}

window.requestAnimationFrame(runGame);
