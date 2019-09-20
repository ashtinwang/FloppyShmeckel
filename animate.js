function handleShmeckelAnimation() {
  if (CONTROLS.shmeckel.up) {
    SHMECKEL.y += SHMECKEL.speed;
  }
  if (CONTROLS.ship.down) {
    SHMECKEL.y -=  SHMECKEL.speed;
  }

  // Check if asteroid is leaving the boundary, if so, switch sides
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
    SCISSORS.scissors.forEach(function(asteroid, index, object) {

        // Move the bullet forward
          var radians = (Math.PI / 180) * asteroid.angle,
              cos = Math.cos(radians),
              sin = Math.sin(radians);
          asteroid.x += SCISSORS.baseSpeed * sin;
          asteroid.y +=  SCISSORS.baseSpeed * cos;

          // Check if asteroid is leaving the boundary, if so, switch sides
          if (asteroid.x > GAME.canvas.width) {
            asteroid.x = 0;
          } else if (asteroid.x < 0) {
            asteroid.x = 600;
          } else if (asteroid.y > GAME.canvas.height) {
            asteroid.y = 0;
          } else if (asteroid.y < 0) {
            asteroid.y = 300;
          }
    });

}

function spaceShipAsteroidCollisionCheck() {
    var SHMECKEL_SIZE_BOX = 15; // 10px;
    var hit = false;

    SCISSORS.scissors.forEach(function(asteroid) {
      if (
        SHMECKEL.latest.x + SHMECKEL_SIZE_BOX > asteroid.x &&
        SHMECKEL.latest.x - SHMECKEL_SIZE_BOX < asteroid.x &&
        SHMECKEL.latest.y + SHMECKEL_SIZE_BOX > asteroid.y &&
        SHMECKEL.latest.y - SHMECKEL_SIZE_BOX < asteroid.y)
        {
          // Destroy asteroid
          asteroid.remove = true;
          SHMECKEL.health = SHMECKEL.health - 1;
          hit = true;
        }
    });

    if (hit) {
      SCISSORS.scissors = SCISSORS.scissors.filter(
        (asteroid) => {
        return (asteroid.remove == false);
      });

      if (SHMECKEL.health < 0) {
        GAME.started = false;
      }
    }

    if (SCISSORS.scissors.length == 0) {
      GAME.level++;
      SCISSORS.activeCount++;
      for (var i = 0; i < SCISSORS.activeCount; i++) {
        AddAsteroid();
      }
    }
}

function bulletAsteroidCollisionCheck() {
    var collision = false;
    SHMECKEL.bullets.forEach(function(bullet, index, object) {
      SCISSORS.scissors.forEach(function(asteroid) {
        var asteroidSize = SCISSORS.pixelScaleBySize * asteroid.size / 2;
        var bulletSize = bullet.bulletSize;
        if (
          asteroid.x + asteroidSize > bullet.x &&
          asteroid.x - asteroidSize < bullet.x &&
          asteroid.y + asteroidSize > bullet.y &&
          asteroid.y - asteroidSize < bullet.y) {
          bullet.remove = true;
          asteroid.remove = true;
          collision = true;
        }
      });
    });

    if (collision) {
      SCISSORS.scissors = SCISSORS.scissors.filter(
        (asteroid) => {
        return (asteroid.remove == false);
      });
      SHMECKEL.bullets = SHMECKEL.bullets.filter(
        (bullet) => {
        return (bullet.remove == false);
      });
    }

}

function runGame() {
  var canvas = document.getElementById('mainCanvas');
  var context = canvas.getContext('2d');
  if (GAME.started) {
    handleShipAnimation();
    handleBulletAnimation();
    handleAsteroidAnimation();

    // Check for collisions
    spaceShipAsteroidCollisionCheck();
    bulletAsteroidCollisionCheck();

    context.clearRect(0, 0, 600, 300);
    RenderSpaceship(context);
    RenderBullets(context);
    RenderAsteroids(context);
  } else {
    context.font = "30px Arial";
    context.fillText("Game Over      Level " + GAME.level, 135, 200);
  }
  window.requestAnimationFrame(runGame);

}

window.requestAnimationFrame(runGame);
