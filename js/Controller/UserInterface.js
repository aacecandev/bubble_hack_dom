function UserInteface(board, currentBubble) {
  this.board = board;
  this.currentBubble = currentBubble;
}

UserInteface.prototype.init = function() {};

UserInteface.prototype.hideDialog = function() {
  $(".dialog").slideUp(200);
  $(".btn-start-game").off("click");
};

UserInteface.prototype.getMouseCoords = function(event) {
  var mouseCoords = {
    x: event.pageX,
    y: event.pageY
  };

  return mouseCoords;
};

UserInteface.prototype.getBubbleCoords = function(bubble) {
  var bubbleCoords = bubble.position();
  bubbleCoords.left += BUBBLE_SIZE / 2;
  bubbleCoords.top += BUBBLE_SIZE / 2;
  return bubbleCoords;
};

UserInteface.prototype.getBubbleAngle = function(bubble, event) {
  var mouseCoords = this.getMouseCoords(event);
  var bubbleCoords = this.getBubbleCoords(bubble);
  var boardCoords = $("#board").position();
  var boardLeft = 370;

  var angle = Math.atan(
    (mouseCoords.x - bubbleCoords.left - boardLeft) /
      (bubbleCoords.top + boardCoords.top - mouseCoords.y)
  );

  if (mouseCoords.y > bubbleCoords.top + boardCoords.top) {
    angle += Math.PI;
  }
  return angle;
};

UserInteface.prototype.fireBubble = function(bubble, coords, duration) {
  bubble.animate(
    {
      left: coords.x - BUBBLE_SIZE / 2,
      top: coords.y - BUBBLE_SIZE / 2
    },
    {
      duration: duration,
      easing: "linear",
      step: function() {
        var actualBubblePosition = bubble.position();
        var event = new CustomEvent("testCollision-event", {
          detail: { // THIS NAME IS REQUIRED TO PASS ARGS TO EVENT
            x: actualBubblePosition.left,
            y: actualBubblePosition.top
          }
        });
        document.dispatchEvent(event);
      }
    }
  );
};

UserInteface.prototype.drawBoard = function() {
  var gameArea = $("#board");

  for (var i = 0; i < this.board.bubbleMultiArray.length; i++) {
    var row = this.board.bubbleMultiArray[i];
    var startCol = i % 2 == 0 ? 1 : 0;
    for (var j = startCol; j < row.length; j += 2) {
      var bubble = row[j];
      var bubbleId = i + "-" + j;

      var bubbleDiv = $(document.createElement("div"));
      bubbleDiv
        .addClass("bubble")
        .addClass(bubble.color)
        .attr("id", bubbleId);

      $("#board").append(bubbleDiv);

      // SET BUBBLE POSITION
      var left = j * BUBBLE_SIZE / 2;
      var top = i * ROW_HEIGHT;
      bubbleDiv.css({
        left: left,
        top: top
      });
    }
  }
};

UserInteface.prototype.drawCurrentBubble = function(color) {
  var currentBubbleDiv = $(document.createElement("div"));

  currentBubbleDiv
    .attr("id", "player")
    .addClass("bubble")
    .addClass("current-bubble")
    .addClass(color);
  $("#board").append(currentBubbleDiv);
};

UserInteface.prototype.removeCurrentBubble = function() {
  $("#player").remove();
};

UserInteface.prototype.getBubbleDivPosition = function(arrayPositionId) {
  var bubbleId = "#" + arrayPositionId;
  var bubbleDiv = $(bubbleId);
  if (bubbleDiv) {
    return $(bubbleId).position();
  } else {
    return undefined;
  }
};

UserInteface.prototype.stopCurrentBubbleAnimation = function() {
  $("#player").stop();
};
