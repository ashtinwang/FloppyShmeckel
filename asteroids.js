var SCISSORS = {
  level : 1,
  activeCount : 3,
  scissors : [],
  spawnSize : {
      height : 50,
  },
  baseSpeed : 3,
};


function AddScissor(size) {
  size = 200;
  // Generate scissors location
  var locationXY = GetNewScissorLocation();
  var direction = GetNewScissorDirection();

  // Add scissors
  SCISSORS.scissors.push(
    {
      x : locationXY[0],
      angle : direction,
      size : size,
      remove : false
    }
  );
}

/** GetNewScissorLocation
 *
 *  Generates a new scissors location and returns it in array form [x,y]
 *  This returns an scissors a certain distance from the spaceship
 */
function GetNewScissorLocation() {
  return SHMECKEL.latest.x;

}

/** GetNewScissorDirection
 *
 *  Create new scissors direction which is between 0-360 degrees
 */
function GetNewScissorDirection() {
  return Math.floor(Math.random() * Math.floor(SCISSORS.maxDirectionAngle));
}

function RenderScissors(context) {
  // This function is run for each scissors
  SCISSORS.scissors.forEach(
    function(scissors, index, object) {
        context.moveTo(scissors.x, scissors.y);
        context.strokeStyle = 'black';
        context.lineWidth = 2;
       ctx.drawImage(scissorsprite,scissors.x,scissors.y)(
          ,
          ,
          scissors.size * SCISSORS.pixelScaleBySize,
          scissors.size * SCISSORS.pixelScaleBySize
        );
  });
}
