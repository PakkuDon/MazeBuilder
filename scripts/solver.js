function Solver(graphics) {
    this.strategies = {
        "dfs" : {
            "name" : "Depth-first Search",
            "algorithm" : new DepthSolver()
        },
        "bfs" : {
            "name" : "Breadth-first Search",
            "algorithm" : new BreadthSolver()
        }
    };
    this.graphics = graphics;
    this.strategy = null;

    this.setStrategy = function(strategy) {
        this.strategy = this.strategies[strategy].algorithm;
    };

    this.solve = function(maze, startX, startY, endX, endY) {
        // If solve operation currently being executed,
        // clear previous interval
        if (typeof this.intervalID != "undefined"
            && !this.strategy.done) {
            clearInterval(this.intervalID);
        }

        // TODO: Validation
        var startPoint = { x: startX, y: startY };
        var endPoint = { x: endX, y: endY };

        // Initialise strategy, maze and canvas
        this.strategy.initialise(maze, startPoint, endPoint);

        // Initialise for graphics
        this.graphics.initialise(maze.width, maze.height);

        var self = this;

        this.intervalID = setInterval(function() {
            // Perform next step of selected algorithm
            self.strategy.solve(maze);

            // Draw visited edge
            var edge = self.strategy.visitedEdges[self.strategy.visitedEdges.length - 1];
            if (typeof edge !== "undefined") {
                self.graphics.drawEdge(edge, "#F00");
            }

            // TODO: Draw marker

            // Remove marker and clear interval when done
            if (self.strategy.done) {
                maze.setMarker(-1, -1);
                clearInterval(self.intervalID);

                var solution = self.strategy.solution;
                self.graphics.drawSolution(solution);
            }
        }, 25);
    }
}
