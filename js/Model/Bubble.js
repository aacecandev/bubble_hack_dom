
function Bubble() {

  this.id = {};
  this.color = "";

  this.bubbleColors = {
    0: "bubble-blue",
    1: "bubble-yellow",
    2: "bubble-green",
    3: "bubble-pink"
  }
}

Bubble.prototype.createBubble = function (row, col) {
  // remove?
  this.id.row = row;
  this.id.col = col;

  
  this.x = row;
  this.y = col;
  var random = Math.floor(Math.random() * 4);
  this.color = this.bubbleColors[random];
}

Bubble.prototype.getNextCurrentBubble = function () {

  var random = Math.floor(Math.random() * NUMBER_OF_COLORS);
  this.color = this.bubbleColors[random];

}

Bubble.prototype.getCoords = function () {
  var coords = {
    left: this.id.col * (50 / 2) + (50 / 2),
    top: this.id.row * (50 / 2) + (50 / 2)
  }
  return coords;
}
