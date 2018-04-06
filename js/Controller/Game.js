function Game() {
  this.currentBubble = new Bubble();
  this.bubbleArray = [];
  this.board = new Board();
  this.ui = new UserInteface(this.board, this.currentBubble);
  this.numBubbles = MAX_BUBBLES;
}

Game.prototype.init = function() {
  // SETS AN EVENT TO THE DIALOG START GAME BUTTON
  $(".btn-start-game").on(
    "click",
    function() {
      this.startGame();
    }.bind(this)
  );
};

Game.prototype.startGame = function() {
  // HIDE WELCOME DIALOG AND UNSET CLICK EVENT
  this.ui.hideDialog();

  // SET CLICK EVENT TO THE BOARD
  $("#board").on(
    "click",
    function() {
      this.clickBoardScreen(event);
    }.bind(this)
  );

  // CREATE BOTTOM BUBBLE
  this.currentBubble.getNextCurrentBubble();
  this.ui.drawCurrentBubble(this.currentBubble.color);
  // ------------------------> DRAW REMAINING 72 BUBBLES IN ASIDE

  // CREATE BOARD
  this.board.createBubbleMultiArray();
  this.ui.drawBoard(this.board);

  // EVENT LISTENER FIRED WHEN THE ANIMATION FOR BUBBLE FIRED HAS FINISHED
  // IT SETS A NEW TURN
  document.addEventListener(
    "nextTurn-event",
    function() {
      this.setNextTurn();
    }.bind(this)
  );
  document.addEventListener(
    "testCollision-event",
    function(e) {
      var collisionDetector = new CollisionDetector(this.board, this.ui);
      var collision = collisionDetector.getCollisionPoint(e.detail.x, e.detail.y);
      if(collision && collision.collisioned){

        // DETENER ANIMACIÓN BOLA
        this.ui.stopCurrentBubbleAnimation();
        // var event = new CustomEvent("nextTurn-event");
        // document.dispatchEvent(event);

        this.setNextTurn();
        // DETECT BOLAS ADYACENTES

        alert("he colisionado");
          // SI HAY MAS DE 2 BOLAS
            
            // ELIMINAR BOLAS

          // SI NO
          
            // AÑADIR BOLA
      }
    }.bind(this)
  );
};

Game.prototype.clickBoardScreen = function(event) {
  var currentBubbleDiv = $(".current-bubble");
  var currentBubblePosition = currentBubbleDiv.position();
  var currentBubbleX = currentBubblePosition.left;
  var currentBubbleY = currentBubblePosition.top;

  // var arrayX = currentBubbleX;
  // var arrayY = currentBubbleY;

  // var collisionDetector = new CollisionDetector(this.board);
  // var collision = collisionDetector.detectCollision(currentBubbleX, currentBubbleY, arrayX, arrayY);

  var angle = this.ui.getBubbleAngle(currentBubbleDiv, event);
  var duration = 1000;
  var distance = 1000;

  var distX = Math.sin(angle) * distance;
  var distY = Math.cos(angle) * distance;

  var bubbleCoords = this.ui.getBubbleCoords(currentBubbleDiv);

  var coords = {
    x: bubbleCoords.left + distX,
    y: bubbleCoords.top - distY
  };

  // var collisionDetector = new CollisionDetector(this.board);
  // var mouseCoords = this.ui.getMouseCoords(event);
  // var collision = collisionDetector.detectCollision(currentBubbleX, currentBubbleY, mouseCoords.x, mouseCoords.y);

  this.ui.fireBubble(currentBubbleDiv, coords, duration);
  this.numBubbles--;
};

Game.prototype.setNextTurn = function() {
  if (this.numBubbles > 0) {
    this.ui.removeCurrentBubble();
    this.currentBubble = new Bubble();
    this.currentBubble.getNextCurrentBubble();
    this.ui.drawCurrentBubble(this.currentBubble.color);
  } else {
    // GAME OVER
  }
};
