/**
 * Generates a maze solution using the A* Search Algorithm.
 */
function AStarSolver() {
    this.startPoint = null;
    this.endPoint = null;
    this.visitFlags = [[]];
    this.done = false;
    this.queue = new PriorityQueue();
    this.visitedEdges = [];
    this.nodeCost = [[]];
    this.set = new Tree();
    this.solution = [];

    /**
     * Clears data from previous run and initialises components
     * for next attempt.
     */
    this.initialise = function(maze, startPoint, endPoint) {
        this.done = false;
        this.startPoint = maze.grid[startPoint.x][startPoint.y];
        this.endPoint = maze.grid[endPoint.x][endPoint.y];
        this.set.clear();

        // Clear queue
        this.queue.clear();

        // Clear other data from previous run
        Utility.clearArray(this.nodeCost);
        Utility.clearArray(this.visitFlags);
        Utility.clearArray(this.visitedEdges);
        Utility.clearArray(this.solution);

        // Initialise node cost array
        for (var x = 0; x < maze.width; x++) {
            this.nodeCost.push([]);
            for (var y = 0; y < maze.height; y++) {
                this.nodeCost[x].push(0);
            }
        }

        // Initialize visit flags array
        for (var x = 0; x < maze.width; x++) {
            this.visitFlags.push([]);
            for (var y = 0; y < maze.height; y++) {
                this.visitFlags[x].push(false);
            }
        }

        // Add starting edge to queue
        var initialDistance =
            this.getDistance(this.startPoint, this.endPoint);
        this.queue.add(
            new Edge(null, null, startPoint.x, startPoint.y),
            initialDistance
        );

        // Set code of starting point to 0
        this.nodeCost[startPoint.x][startPoint.y] = 0;
    }

    /**
     * Executes next step from last saved state.
     */
    this.solve = function(maze) {
        var currentEdge = this.queue.poll();
        var previous = null;
        if (currentEdge.aX != null) {
            previous = maze.grid[currentEdge.aX][currentEdge.aY];
        }
        var current = maze.grid[currentEdge.bX][currentEdge.bY];

        // If end point reached, set flag and reconstruct path from start to end
        if (current == this.endPoint) {
            this.done = true;
            this.set.merge(previous, current);
            var path = this.set.getAncestors(current);

            for (var i = 1; i < path.length; i++) {
                var cellA = path[i - 1];
                var cellB = path[i];

                var edge = new Edge(cellA.x, cellA.y, cellB.x, cellB.y);
                this.solution.push(edge);
            }
        }

        var currentNodeCost = this.nodeCost[current.x][current.y];

        // Get unvisited neighbours of current cell
        for (var i = 0; i < current.neighbours.length; i++) {
            var neighbour = current.neighbours[i];
            if (this.visitFlags[neighbour.x][neighbour.y] === false) {
                // Calculate travel costs for each neighbour and
                // add them to the queue using this cost as its priority
                this.nodeCost[neighbour.x][neighbour.y]
                    = currentNodeCost + this.getDistance(current, neighbour);
                var distanceFromEnd = this.getDistance(neighbour, this.endPoint);
                var priority = this.nodeCost[neighbour.x][neighbour.y]
                    + distanceFromEnd;

                this.queue.add(new Edge(
                    current.x, current.y,
                    neighbour.x, neighbour.y
                ), priority);
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

    /**
     * Returns the difference between the given cells.
     * Distance is currently calculated in Manhattan distance.
     */
    this.getDistance = function(cellA, cellB) {
        return Math.abs(cellB.x - cellA.x)
            + Math.abs(cellB.y - cellA.y);
    }
}
