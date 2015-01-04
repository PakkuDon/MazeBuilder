function DepthBuilder () {
    this.width = 0;
    this.height = 0;
    this.visited = [[]];
    this.done = false;
    this.current = {};
    this.stack = [];
    this.visitedCount = 0;

    // TODO: Pass in start and end points
    this.initialise = function(width, height) {
        this.width = width;
        this.height = height;
        this.done = false;

        // Clear visited flags array
        while (this.visited.length > 0) {
            this.visited.pop();
        }

        // Initialise visit flags
        for (var x = 0; x < width; x++) {
            this.visited.push([]);
            for (var y = 0; y < height; y++) {
                this.visited[x].push(false);
            }
        }

        // Set current position to start position
        this.current.x = 0;
        this.current.y = 0;

        // Mark current as visited
        this.visitedCount = 0;
        this.visited[this.current.x][this.current.y] = true;
        this.visitedCount++;

        // Clear stack
        while (this.stack.length > 0) {
            this.stack.pop();
        }
    };

    this.getUnvisitedNeighbours = function(maze, x, y) {
        var grid = maze.grid;
        var neighbours = [];

        // Check north cell
        if (x < maze.width && x >= 0
            && y - 1 < maze.height && y - 1 >= 0
            && !this.visited[x][y - 1]) {
            neighbours.push({
                x: x,
                y: y - 1
            });
        }
        // Check east cell
        if (x + 1 < maze.width && x + 1 >= 0
            && y < maze.height && y >= 0
            && !this.visited[x + 1][y]) {
            neighbours.push({
                x: x + 1,
                y: y
            });
        }
        // Check south cell
        if (x < maze.width && x >= 0
            && y + 1 < maze.height && y + 1>= 0
            && !this.visited[x][y + 1]) {
            neighbours.push({
                x: x,
                y: y + 1
            });
        }
        // Check west cell
        if (x - 1 < maze.width && x - 1 >= 0
            && y < maze.height && y >= 0
            && !this.visited[x - 1][y]) {
            neighbours.push({
                x: x - 1,
                y: y
            });
        }
        return neighbours;
    }

    this.build = function(maze) {
        // If all cells visited, set flag and stop processing grid
        if (this.visitedCount == this.width * this.height) {
            this.done = true;
        }
        else {
            var adjacentCells = this.getUnvisitedNeighbours(
                maze, this.current.x, this.current.y);

            // If current cell has unvisited neighbours, select one,
            // link cells, push cell onto stack and update visited stats
            if (adjacentCells.length > 0) {
                var next = adjacentCells[Math.floor(Math.random() * adjacentCells.length)];
                maze.addEdge(new Edge(this.current.x, this.current.y, next.x, next.y));
                this.stack.push(next);
                this.current = next;

                // Mark current cell as visited
                this.visited[this.current.x][this.current.y] = true;
                this.visitedCount++;
            }
            // Else, backtrack to previous cell
            else {
                this.stack.pop();
                this.current = this.stack[this.stack.length - 1];
            }
        }
        // Move marker
        maze.setMarker(this.current.x, this.current.y);
    };
}
