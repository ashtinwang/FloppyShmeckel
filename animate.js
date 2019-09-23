function handleShmeckelAnimation() {
  if (CONTROLS.shmeckel.up) {
    SHMECKEL.y += SHMECKEL.speed;
  }
  if (CONTROLS.shmeckel.down) {
    SHMECKEL.y -=  SHMECKEL.speed;
  }
}

function handleScissorAnimation() {
    SCISSORS.scissors.forEach(function(scissors, index, object) {

        // Move the scissors forwar
          scissors.x += SCISSORS.baseSpeed;
          // Check if scissors is leaving the boundary, if so, remove
          if (scissors.x < 0) {
            scissors.remove = true;
          }
    }
}

function shmeckelScissorCollisionCheck() {
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
