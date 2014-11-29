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
}