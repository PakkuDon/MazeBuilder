function Cell(x, y) {
	this.x = x;
	this.y = y;
	this.neighbours = [];
}

function Edge(cellA, cellB) {
	this.cellA = cellA;
	this.cellB = cellB;
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
		marker.x = x;
		marker.y = y;
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
      var cellA = this.edges[i].cellA;
      var cellB = this.edges[i].cellB;

      context.moveTo(cellA.x, cellA.y);
      context.lineTo(cellB.x, cellB.y);
      context.stroke();
    }

    // Draw marker
    context.fillStyle = "#F00";
    context.beginPath();
    context.arc(this.marker.x, this.marker.y, 2, 0, 2 * Math.PI);
    context.fill();
  }
}
