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
    var canvasWidth = canvas.width;
    var canvasHeight = canvas.height;
    var context = canvas.getContext("2d");

    context.fillStyle = "#000";
    context.fillRect(0, 0, canvasWidth, canvasHeight);

    // Draw edges
    context.strokeStyle = "#FFF";

    for (var i = 0; i < this.edges.length; i++) {
      var edge = this.edges[i];
      var aX = edge.aX / this.width * canvasWidth;
      var aY = edge.aY / this.height * canvasHeight;
      var bX = edge.bX / this.width * canvasWidth;
      var bY = edge.bY / this.height * canvasHeight;

      context.moveTo(aX, aY);
      context.lineTo(bX, bY);
      context.stroke();
    }

    // Draw marker
    context.strokeStyle = "#F00";
    context.fillStyle = "#F00";
    context.beginPath();
    context.arc(this.marker.x / this.width * canvasWidth,
                this.marker.y / this.height * canvasHeight,
                1, 0, 2 * Math.PI);
    context.fill();
  }
}
