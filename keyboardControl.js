/**
 *  Keydown event listener runs every time ANY key is pressed!
 *
 */

var CONTROLS = {
  shmeckel : {
    up : false,
    down : false,
  }
};

document.addEventListener('keydown', function(event) {
  switch (event.key) {
    case " ":
      CONTROLS.shmeckel.up = true;
      break;
    default:
      break;
  }
});


document.addEventListener('keyup', function(event) {
  switch (event.key) {
    case " ":
      CONTROLS.shmeckel.up = false;
      break;
    default:
      break;
  }
});
