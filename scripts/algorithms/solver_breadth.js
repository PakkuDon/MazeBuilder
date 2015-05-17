/**
 * Generates a maze solution using the Breadth-First Search Algorithm.
 */
function BreadthSolver() {
    this.endPoint = null;
    this.visitFlags = [[]];
    this.done = false;
    this.stack = [];
    this.visitedEdges = [];
    this.set = new Tree();
    this.solution = [];

    /**
     * Clears data from previous run and initialises components
     * for next attempt.
     */
    this.initialise = function(maze, startPoint, endPoint) {
        this.done = false;
        this.endPoint = maze.grid[endPoint.x][endPoint.y];
        this.set.clear();

        // Clear data from previous run
        Utility.clearArray(this.visitFlags);
        Utility.clearArray(this.visitedEdges);
        Utility.clearArray(this.stack);
        Utility.clearArray(this.solution);

        // Initialize visit flags array
        for (var x = 0; x < maze.width; x++) {
            this.visitFlags.push([]);
            for (var y = 0; y < maze.height; y++) {
                this.visitFlags[x].push(false);
            }
        }

        // Add starting cell to stack
        this.stack.push(new Edge(null, null, startPoint.x, startPoint.y));
    }

    /**
     * Executes next step from last saved state.
     */
    this.solve = function(maze) {
        var currentEdge = this.stack.shift();
        var previous = null;
        if (currentEdge.aX != null) {
            previous = maze.grid[currentEdge.aX][currentEdge.aY];
        }
        var current = maze.grid[currentEdge.bX][currentEdge.bY];

        // If end point reached, set flag and generate path from start to end
        if (current == this.endPoint) {
            this.done = true;
            this.set.merge(previous, current);
            var path = this.set.getAncestors(current);

            // TODO: Come up with better variable names here
            for (var i = 1; i < path.length; i++) {
                var cellA = path[i - 1];
                var cellB = path[i];

                var edge = new Edge(cellA.x, cellA.y, cellB.x, cellB.y);
                this.solution.push(edge);
            }
        }

        // Get unvisited neighbours of current cell
        for (var i = 0; i < current.neighbours.length; i++) {
            var neighbour = current.neighbours[i];
            if (this.visitFlags[neighbour.x][neighbour.y] === false) {
                this.stack.push(new Edge(current.x, current.y, neighbour.x, neighbour.y));
            }
        }

        // Store edge between current and previous cell
        if (previous !== null) {
            this.visitedEdges.push(currentEdge);
            this.set.merge(previous, current);
        }

        // Mark current cell as visited
        this.visitFlags[current.x][current.y] = true;
    }
}
