
// Javascript Asteroids!


function Start() {

  // Initialize Spaceship
  InitializeShmekel();

  // Initialize Asteroids
  for (var i = 0; i < SCISSORS.activeCount; i++) {
    AddScissor();
  }
}
