/**
 * Represents a node in the maze. Contains a location represented as x,y values
 * and a list of adjacent nodes.
 */
function Cell(x, y) {
    this.x = x;
    this.y = y;
    this.neighbours = [];

    /**
     * Returns a String representation of the cell.
     */
    this.toString = function() {
        return x + "," + y;
    };
}

/**
 * Represents a link between two cells.
 */
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

/**
 * Represents the maze itself. Contains maze dimensions, a grid of cells,
 * list of edges, and methods for manipulating the maze.
 */
function Maze(width, height) {
    this.width = width;
    this.height = height;
    this.grid = [];
    this.edges = [];

    /**
     * Initialise grid of cells and other fields
     */
    this.initialize = function(width, height) {
        this.width = width;
        this.height = height;

        // Clear existing grid and edge contents
        Utility.clearArray(this.grid);
        Utility.clearArray(this.edges);

        // Create cells
        for (var x = 0; x < width; x++) {
            this.grid.push([]);
            for (var y = 0; y < height; y++) {
                this.grid[x].push(new Cell(x, y));
            }
        }
    }

    /**
     * Add edge and link end-points together
     */
    this.addEdge = function(edge) {
        this.edges.push(edge);
        var firstCell = this.grid[edge.aX][edge.aY];
        var secondCell = this.grid[edge.bX][edge.bY];

        firstCell.neighbours.push(secondCell);
        secondCell.neighbours.push(firstCell);
    };

    /**
     * Initialises maze based on given string.
     */
    this.load = function(mazeString) {
        var values = mazeString.split(":");

        // Set width and height
        var width = values.shift();
        var height = values.shift();
        this.initialize(width, height);

        // Read edge data
        for (var i = 0; i < values.length; i += 4) {
            var aX = values[i];
            var aY = values[i + 1];
            var bX = values[i + 2];
            var bY = values[i + 3];

            var edge = new Edge(aX, aY, bX, bY);
            this.addEdge(edge);
        }
    }

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

    // Create maze with specified width and height.
    this.initialize(width, height);
}
