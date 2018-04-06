function CollisionDetector(board, ui) {
  this.board = board;
  this.ui = ui;
}
/*
CollisionDetector.prototype.findIntersection = function() {
  for (var i = 0; i < this.rows.length; i++) {
    var row = this.rows[i];
    for (var j = 0; j < row.length; j++) {
      var bubble = row[j];
      if (bubble) {
        var coords = bubble.getCoords();
        var distToBubble = {
          x: this.start.left - coords.left,
          y: this.start.top - coords.top
        };
        var t = this.dx * distToBubble.x + this.dy * distToBubble.y;
        var ex = -t * this.dx + this.start.left;
        var ey = -t * this.dy + this.start.top;
        var distEC = Math.sqrt(
          (ex - coords.left) * (ex - coords.left) +
            (ey - coords.top) * (ey - coords.top)
        );
        if (distEC < 50 * 0.75) {
          var dt = Math.sqrt(50 * 50 - distEC * distEC);
          var offset1 = {
            x: (t - dt) * this.dx,
            y: -(t - dt) * this.dy
          };
          var offset2 = {
            x: (t + dt) * this.dx,
            y: -(t + dt) * this.dy
          };
          var distToCollision1 = Math.sqrt(
            offset1.x * offset1.x + offset1.y * offset1.y
          );
          var distToCollision2 = Math.sqrt(
            offset2.x * offset2.x + offset2.y * offset2.y
          );
          if (distToCollision1 < distToCollision2) {
            var distToCollision = distToCollision1;
            var dest = {
              x: offset1.x + this.start.left,
              y: offset1.y + this.start.top
            };
          } else {
            var distToCollision = distToCollision2;
            var dest = {
              x: -offset2.x + this.start.left,
              y: offset2.y + this.start.top
            };
          }
          if (
            !this.collision ||
            this.collision.distToCollision > distToCollision
          ) {
            this.collision = {
              bubble: bubble,
              distToCollision: distToCollision,
              coords: dest
            };
          }
        }
      }
    }
  }
  return this.collision;
}; */
//-------------------------
CollisionDetector.prototype.detectCollision = function(
  currentBubbleX,
  currentBubbleY,
  arrayX,
  arrayY) {
  var currentBubble = {
    radius: BUBBLE_SIZE / 2,
    x: currentBubbleX,
    y: currentBubbleY
  };
  var arrayBubble = { 
    radius: BUBBLE_SIZE / 2, 
    x: arrayX, 
    y: arrayY };

  var dx = currentBubble.x - arrayBubble.x;
  var dy = currentBubble.y - arrayBubble.y;
  var distance = Math.sqrt(dx * dx + dy * dy);

  var collision = new Collision();
  collision.originX = currentBubbleX;
  collision.originY = currentBubbleY;
  collision.destinationX = arrayX;
  collision.destinationY = arrayY;

  if (distance < currentBubble.radius + arrayBubble.radius) {
    collision.collisioned = true;
    return collision;
  } else {
    collision.collisioned = false;
    return collision;
  }
};

CollisionDetector.prototype.getCollisionPoint = function(currentBubbleX, currentBubbleY) {
  var collisionValue = new Collision();
  collisionValue.originX = currentBubbleX;
  collisionValue.originY = currentBubbleY;

  for (var i = NUM_ROWS - 1; i >= 0; i--) {
    var row = this.board.bubbleMultiArray[i];
    for (var j = 0; j < NUM_COLS; j++) {
      var bubbleFromArray = this.board.bubbleMultiArray[i][j];
      if (bubbleFromArray) {
        if (bubbleFromArray.x != undefined && bubbleFromArray.y != undefined) {
          var arrayPositionId = bubbleFromArray.x + "-" + bubbleFromArray.y;
          var position = this.ui.getBubbleDivPosition(arrayPositionId);
          if (position) {
            var collision = this.detectCollision(currentBubbleX, currentBubbleY, position.left, position.top);
            if (collision && collision.collisioned) {
              collisionValue.collisioned = true;
              collisionValue.destinationX = position.left;
              collisionValue.destinationY = position.top;

              return collisionValue;
            }
          } else {
            alert("undefined array position");
          }
        }
        else{
          alert("undefined bubble");
        }
      }
    }
  }
  return collisionValue;
  collisionValue.destinationX = undefined;
  collisionValue.destinationY = undefined;
};
