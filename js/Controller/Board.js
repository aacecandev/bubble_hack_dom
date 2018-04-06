function Board() {
  
  this.bubbleMultiArray = [];
}

Board.prototype.createBubbleMultiArray = function () {
  for (var i = 0; i < NUM_ROWS; i++) {
    var row = [];

    for (var i = 0; i < NUM_ROWS; i++) {
      var row = [];
      var startCol = i % 2 == 0 ? 1 : 0;
      for (var j = startCol; j < NUM_COLS; j += 2) {
        var bubble = new Bubble();
        bubble.createBubble(i, j);
        row[j] = bubble;
      };
      this.bubbleMultiArray.push(row);
    };
  }
}




