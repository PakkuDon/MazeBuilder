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
        if (typeof this.intervalID == "undefined"
            && !this.strategy.done) {
            clearInterval(this.intervalID);
        }

        // Initialise strategy, maze and canvas
        this.strategy.initialise(width, height);
        var canvas = document.getElementById(canvasId);
        var context = canvas.getContext("2d");

        var cellWidth = canvas.width / maze.width;
        var cellHeight = canvas.height / maze.height;
        var xOffset = cellWidth / 2;
        var yOffset = cellHeight / 2;

        var self = this;

        this.intervalID = setInterval(function() {
            // Perform next step of selected algorithm
            self.strategy.solve(maze);

            // Draw new edge


            // TODO: Draw marker

            // Remove marker and clear interval when done
            if (self.strategy.done) {
                maze.setMarker(-1, -1);
                clearInterval(self.intervalID);
            }
        }, 25);
    }
}