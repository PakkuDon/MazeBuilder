function PrimBuilder() {
    this.done = false;
    this.edges = [];
    this.set = new DisjointSet();

    this.initialise = function(width, height) {
        this.done = false;
        this.set.clear();

        // Empty edge list
        Utility.clearArray(this.edges);

        // Get coordinates of starting point / center of maze
        var startX = Math.floor(width / 2);
        var startY = Math.floor(height / 2);

        // Add edges containing cells adjacent to starting point to edge list
        this.edges.push(new Edge(startX, startY,
            startX, startY - 1));
        this.edges.push(new Edge(startX, startY,
            startX + 1, startY));
        this.edges.push(new Edge(startX, startY,
            startX, startY + 1));
        this.edges.push(new Edge(startX, startY,
            startX - 1, startY));
    }

    this.getNeighbours = function(maze, x, y) {
        var grid = maze.grid;
        var neighbours = [];

        // Check north cell
        if (x < maze.width && x >= 0
            && y - 1 < maze.height && y - 1 >= 0) {
            neighbours.push(new Cell(x, y - 1));
        }
        // Check east cell
        if (x + 1 < maze.width && x + 1 >= 0
            && y < maze.height && y >= 0) {
            neighbours.push(new Cell(x + 1, y));
        }
        // Check south cell
        if (x < maze.width && x >= 0
            && y + 1 < maze.height && y + 1>= 0) {
            neighbours.push(new Cell(x, y + 1));
        }
        // Check west cell
        if (x - 1 < maze.width && x - 1 >= 0
            && y < maze.height && y >= 0) {
            neighbours.push(new Cell(x - 1, y));
        }
        return neighbours;
    }

    this.build = function(maze) {
        // If list of edges exhausted, set flag and stop
        if (this.edges.length == 0) {
            this.done = true;
        }
        else {
            // Select random edge from list
            var index = Math.floor(Math.random() * this.edges.length);
            var edge = this.edges[index];

            // Attempt to merge cells in selected edge
            // If merge succeeds, add edge to maze
            var firstCell = maze.grid[edge.aX][edge.aY];
            var secondCell = maze.grid[edge.bX][edge.bY];

            if (this.set.merge(firstCell, secondCell) === true) {
                maze.addEdge(edge);

                // Add possible edges to edge list
                var adjacentCells = this.getNeighbours(
                    maze, edge.bX, edge.bY);

                for (var i = 0; i < adjacentCells.length; i++) {
                    var cell = adjacentCells[i];
                    var newEdge = new Edge(edge.bX, edge.bY,
                        cell.x, cell.y);
                    this.edges.push(newEdge);
                }
            }


            // Delete processed edge
            this.edges.splice(index, 1);
        }
    }
}
