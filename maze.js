function Cell(x, y) {
	this.x = x;
	this.y = y;
	this.neighbours = [];
}

function Edge(aX, aY, bX, bY) {
  this.aX = aX;
  this.aY = aY;
  this.bX = bX;
  this.bY = bY;
}

function Maze(width, height) {
	this.width = width;
	this.height = height;
	this.grid = [];
	this.edges = [];
	this.marker = {};
  this.marker.x = 0;
  this.marker.y = 0;

	// Populate contents of grid
	for (var x = 0; x < width; x++) {
		this.grid.push([]);
		for (var y = 0; y < height; y++) {
			this.grid[x].push(new Cell(x, y));
		}
	}

	this.setMarker = function(x, y) {
		this.marker.x = x;
		this.marker.y = y;
	};

  this.draw = function(canvasId) {
    var canvas = document.getElementById(canvasId);
    var cellWidth = canvas.width / this.width;
    var cellHeight = canvas.height / this.height;
    var context = canvas.getContext("2d");

    context.fillStyle = "#000";
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Draw edges
    context.strokeStyle = "#FFF";

    for (var i = 0; i < this.edges.length; i++) {
      var edge = this.edges[i];
      var aX = edge.aX * cellWidth + (cellWidth / 2);
      var aY = edge.aY * cellHeight + (cellHeight / 2);
      var bX = edge.bX * cellWidth + (cellWidth / 2);
      var bY = edge.bY * cellHeight + (cellHeight / 2);

      context.moveTo(aX, aY);
      context.lineTo(bX, bY);
      context.stroke();
    }

    // Draw marker
    context.strokeStyle = "#F00";
    context.fillStyle = "#F00";
    context.beginPath();
    context.arc(this.marker.x * cellWidth + (cellWidth / 2),
                this.marker.y * cellHeight + (cellHeight / 2),
                1, 0, 2 * Math.PI);
    context.fill();
  }
}
