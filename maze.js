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

    this.draw = function(canvas) {
        var cellWidth = canvas.width / this.width;
        var cellHeight = canvas.height / this.height;
        var context = canvas.getContext("2d");
        var xOffset = cellWidth / 2;
        var yOffset = cellHeight / 2;

        // Draw new edge
        context.strokeStyle = "#FFF";
        var edge = this.edges[this.edges.length - 1];
        var aX = edge.aX * cellWidth + xOffset;
        var aY = edge.aY * cellHeight + yOffset;
        var bX = edge.bX * cellWidth + xOffset;
        var bY = edge.bY * cellHeight + yOffset;
        context.moveTo(aX, aY);
        context.lineTo(bX, bY);
        context.stroke();

        // TODO: Draw marker
    }
}
