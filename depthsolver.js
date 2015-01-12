function DepthSolver() {
    this.endPoint = null;
    this.visitFlags = [[]];
    this.done = false;
    this.current = null;
    this.stack = [];

    this.initialise = function(maze, startPoint, endPoint) {
        this.done = false;
        this.endPoint = maze.grid[endPoint.x][endPoint.y];

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

        // Add starting cell to stack
        this.stack.push(maze.grid[startPoint.x][startPoint.y]);
    }

    this.solve = function(maze) {
        // If end point reached, set flag
        if (this.current == this.endPoint) {
            this.done = true;
        }
        this.current = this.stack.pop();
        // Get unvisited neighbours of current cell

    }
}
