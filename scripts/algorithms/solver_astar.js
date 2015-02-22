/**
 * Heuristic used: Euclidean distance.
 */
function AStarSolver() {
    this.endPoint = null;
    this.visitFlags = [[]];
    this.done = false;
    this.queue = new PriorityQueue();
    this.visitedEdges = [];
    this.set = new Tree();
    this.solution = [];

    this.initialise = function(maze, startPoint, endPoint) {
        this.done = false;
        this.endPoint = maze.grid[endPoint.x][endPoint.y];
        this.set.clear();

        // Clear queue
        // TODO

        // Clear existing visit flags
        while (this.visitFlags.length > 0) {
            this.visitFlags.pop();
        }

        // Initialize visit flags array
        for (var x = 0; x < maze.width; x++) {
            this.visitFlags.push([]);
            for (var y = 0; y < maze.height; y++) {
                this.visitFlags[x].push(false);
            }
        }

        // Clear stack
        while (this.stack.length > 0) {
            this.stack.pop();
        }

        // Clear visited edges
        while (this.visitedEdges.length > 0) {
            this.visitedEdges.pop();
        }

        // Clear solution
        while (this.solution.length > 0) {
            this.solution.pop();
        }

        // Add starting cell to queue
        // TODO
    }

    this.solve = function(maze) {

    }
}
