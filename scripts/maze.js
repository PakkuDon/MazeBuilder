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

    /**
     * toString() - Returns a String containing the end-points
     * of the edge in the form of colon-separated values.
     */
    this.toString = function() {
        return this.aX + ":" + this.aY + ":"
            + this.bX + ":" + this.bY;
    }
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

    // Initialise grid of cells and other fields
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

        // Clear existing edges
        while (this.edges.length > 0) {
            this.edges.pop();
        }
    }

    // Add edge and link end-points together
    this.addEdge = function(edge) {
        this.edges.push(edge);
        var firstCell = this.grid[edge.aX][edge.aY];
        var secondCell = this.grid[edge.bX][edge.bY];

        firstCell.neighbours.push(secondCell);
        secondCell.neighbours.push(firstCell);
    };

    // Set location of marker object
    this.setMarker = function(x, y) {
        this.marker.prevX = this.marker.currX;
        this.marker.prevY = this.marker.currY;
        this.marker.currX = x;
        this.marker.currY = y;
    };

    /**
     * toString() - Returns a String containing the maze's width,
     * height and edges in the form of colon-separated values.
     */
    this.toString = function() {
        var value = "";

        value += this.width + ":" + this.height;

        // Add edge end-points to string value
        for (var i = 0; i < this.edges.length; i++) {
            var currentEdge = this.edges[i];
            value += ":" + currentEdge.toString();
        }

        return value;
    }

    this.initialize(width, height);
}
