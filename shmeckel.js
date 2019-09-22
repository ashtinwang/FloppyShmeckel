
// Create a global variable for the spaceship
var SHMECKEL;

function InitializeShmeckel() {
  var canvas = document.getElementById('mainCanvas');
  var context = canvas.getContext('2d');
  context.scale(1,1);
  SHMECKEL = {
    x : 300,
    y : 150,
    latest : {
        x : SHMECKEL.x,
        y : SHMECKEL.y,
    },
    scale : 5,
    initialized : true
  };
}
// RotateAroundOrigin
// x, y     :   The coordinates of point to be rotatedPoint
// angle    :   Angle in degrees of rotation
function RotateAroundOrigin(x, y, angle) {
  return Rotate(0, 0, x, y, angle);
}

/**  RenderSpaceship
 *
 *  Renders all spaceship points after adjusting them for the rotation and position
 *    in space
 */
function RenderShmeckel(context) {
  if (!SHMECKEL.initialized) {
    return;
  }\
  context.moveTo(SHMECKEL.x ,SHMECKEL.y);
  SHMECKEL.latest.x = SHMECKEL.x;
  SHMECKEL.latest.y = SHMECKEL.y;
  // Begin rendering the space ship points (rotating them each time)
  context.beginPath();
  for (var i = 0; i < SHMECKEL.positions.length; i++) {
    var rotatedPoint = RotateAroundOrigin(
      SHMECKEL.positions[i].x,
      SHMECKEL.positions[i].y,
    );
    context.lineTo(
      SHMECKEL.x + (rotatedPoint[0] * SHMECKEL.scale),
      SHMECKEL.y + (rotatedPoint[1] * SHMECKEL.scale)
    );
  }
}
