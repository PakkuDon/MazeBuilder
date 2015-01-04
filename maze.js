function Cell(x, y) {
    this.x = x;
    this.y = y;
    this.neighbours = [];

    this.toString = function() {
        return x + "," + y;
    };
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
    this.marker = {
        prevX: 0,
        prevY: 0,
        currX: 0,
        currY: 0
    };

    this.setMarker = function(x, y) {
        this.marker.prevX = this.marker.currX;
        this.marker.prevY = this.marker.currY;
        this.marker.currX = x;
        this.marker.currY = y;
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

    this.initialize = function(width, height) {
        this.width = width;
        this.height = height;

        // Clear existing grid contents
        while (this.grid.length > 0) {
            this.grid.pop();
        }

        // Create cells
        for (var x = 0; x < width; x++) {
            this.grid.push([]);
            for (var y = 0; y < height; y++) {
                this.grid[x].push(new Cell(x, y));
            }
        }
    }
    this.initialize(width, height);
}
