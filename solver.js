function Solver(canvasId) {
    this.strategies = {
        "dfs" : {
            "name" : "Depth-first Search",
            "algorithm" : new DepthSolver()
        }
    };
    this.canvasId = canvasId;
    this.strategy = null;

    this.setStrategy = function(strategy) {
        this.strategy = this.strategies[strategy].algorithm;
    };

    this.solve = function(maze) {
        // If solve operation currently being executed,
        // clear previous interval
        if (typeof this.intervalID != "undefined"
            && !this.strategy.done) {
            clearInterval(this.intervalID);
        }

        // TODO: Define these elsewhere
        var startPoint = { x: 0, y: 0 };
        var endPoint = { x: maze.width - 1, y: maze.height - 1 };

        // Initialise strategy, maze and canvas
        this.strategy.initialise(maze, startPoint, endPoint);
        var canvas = document.getElementById(canvasId);
        var context = canvas.getContext("2d");
        context.strokeStyle = "#F00";
        context.beginPath();

        var cellWidth = canvas.width / maze.width;
        var cellHeight = canvas.height / maze.height;
        var xOffset = cellWidth / 2;
        var yOffset = cellHeight / 2;

        var self = this;

        this.intervalID = setInterval(function() {
            // Perform next step of selected algorithm
            self.strategy.solve(maze);

            // Draw visited edge
            var edge = self.strategy.visitedEdges[self.strategy.visitedEdges.length - 1];
            // TODO: Make this check a little more robust. Somehow.
            // TODO: Fix drawing operation
            if (edge !== undefined) {
                var aX = edge.aX * cellWidth + xOffset;
                var aY = edge.aY * cellHeight + yOffset;
                var bX = edge.bX * cellWidth + xOffset;
                var bY = edge.bY * cellHeight + yOffset;
                context.moveTo(aX, aY);
                context.lineTo(bX, bY);
                context.stroke();
            }

            // TODO: Draw marker

            // Remove marker and clear interval when done
            // TODO: Draw solution
            if (self.strategy.done) {
                maze.setMarker(-1, -1);
                clearInterval(self.intervalID);

                context.strokeStyle = "#0F0";
                context.beginPath();
            }
        }, 25);
    }
}
