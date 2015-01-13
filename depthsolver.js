function DepthSolver() {
    this.endPoint = null;
    this.visitFlags = [[]];
    this.done = false;
    this.previous = null
    this.current = null;
    this.stack = [];
    this.visitedEdges = [];
    this.set = null;
    this.solution = [];

    this.initialise = function(maze, startPoint, endPoint) {
        this.done = false;
        this.previous = null;
        this.endPoint = maze.grid[endPoint.x][endPoint.y];
        this.set = new DisjointSet();

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

        // Add starting cell to stack
        this.stack.push(maze.grid[startPoint.x][startPoint.y]);
    }

    this.solve = function(maze) {
        // If end point reached, set flag and generate path from start to end
        if (this.current == this.endPoint) {
            this.done = true;
            this.solution = this.set.getAncestors(this.current);
        }
        this.previous = this.current;
        this.current = this.stack.pop();

        // Get unvisited neighbours of current cell
        for (var i = 0; i < this.current.neighbours.length; i++) {
            var neighbour = this.current.neighbours[i];
            if (this.visitFlags[neighbour.x][neighbour.y] === false) {
                this.stack.push(neighbour);
            }
        }

        // Store edge between current and previous cell
        if (this.previous !== null) {
            this.visitedEdges.push(new Edge(
                this.previous.x, this.previous.y,
                this.current.x, this.current.y));
            this.set.merge(this.previous, this.current);
        }

        // Mark current cell as visited
        this.visitFlags[this.current.x][this.current.y] = true;
    }
}
