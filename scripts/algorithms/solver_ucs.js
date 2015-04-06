function UniformCostSolver() {
    this.done = false;
    this.endPoint = null;
    this.set = new Tree();
    this.queue = new PriorityQueue();
    this.solution = [];
    this.visitedEdges = [];
    this.visitFlags = [[]];
    this.nodeCost = [[]];

    this.initialise = function(maze, startPoint, endPoint) {
        this.done = false;
        this.endPoint = maze.grid[endPoint.x][endPoint.y];

        // Clear data from previous run
        Utility.clearArray(this.solution);
        Utility.clearArray(this.nodeCost);
        Utility.clearArray(this.visitedEdges);
        Utility.clearArray(this.visitFlags);
        this.queue.clear();
        this.set.clear();

        // Initialise visit flags
        for (var x = 0; x < maze.width; x++) {
            this.visitFlags.push([]);
            for (var y = 0; y < maze.height; y++) {
                this.visitFlags[x].push(false);
            }
        }

        // Initialise node costs
        for (var x = 0; x < maze.width; x++) {
            this.nodeCost.push([]);
            for (var y = 0; y < maze.height; y++) {
                this.nodeCost[x].push(0);
            }
        }

        // Add starting edge to queue
        this.queue.add(new Edge(null, null,
            startPoint.x, startPoint.y), 0);

        // Set cost of starting point to 0
        this.nodeCost[startPoint.x][startPoint.y] = 0;
    }

    this.solve = function(maze) {
        var currentEdge = this.queue.poll();
        var previous = null;
        if (currentEdge.aX != null) {
            previous = maze.grid[currentEdge.aX][currentEdge.aY];
        }
        var current = maze.grid[currentEdge.bX][currentEdge.bY];

        // If end point reached, set flag and reconstruct solution
        if (current == this.endPoint) {
            this.done = true;
            this.set.merge(previous, current);
            var path = this.set.getAncestors(current);

            // Reconstruct solution
            for (var i = 1; i < path.length; i++) {
                var cellA = path[i - 1];
                var cellB = path[i];

                var edge = new Edge(cellA.x, cellA.y, cellB.x, cellB.y);
                this.solution.push(edge);
            }
        }
        // Else, proceed with algorithm as normal
        else {
            var cost = this.nodeCost[current.x][current.y];

            // Process current node's neighbours
            for (var i = 0; i < current.neighbours.length; i++) {
                var neighbour = current.neighbours[i];

                // If neighbour not yet visited, either add or update its
                // place in the priority queue
                if (this.visitFlags[neighbour.x][neighbour.y] === false) {
                    var neighbourCost = cost + 1;
                    this.nodeCost[neighbour.x][neighbour.y] = neighbourCost;
                    var priority = this.queue.getPriority(neighbour);

                    // If neighbour not yet in queue, add to queue
                    if (priority === -1) {
                        this.queue.add(new Edge(current.x, current.y,
                                neighbour.x, neighbour.y), neighbourCost);
                    }
                    // Else, if previous recorded cost is higher than current cost,
                    // replace existing node for current neighbour
                    else {
                        if (priority > neighbourCost) {
                            this.queue.delete(neighbour);
                            this.queue.add(new Edge(current.x, current.y,
                                neighbour.x, neighbour.y), neighbourCost);
                        }
                    }
                }
            }

            // Add current edge to list of visited edges
            if (previous !== null) {
                this.visitedEdges.push(currentEdge);
                this.set.merge(previous, current);
            }

            // Mark current cell as visited
            this.visitFlags[current.x][current.y] = true;
        }
    }
}