function Builder(canvasId) {
    this.strategies = {
        "dfs" : {
            "name" : "Depth-first Search",
            "algorithm" : new DepthBuilder()
        },
        'kruskal' : {
            "name" : "Randomized Kruskal's",
            "algorithm" : new KruskalBuilder()
        }
    };
    this.canvasId = canvasId;
    this.strategy = null;

    this.setStrategy = function(strategy) {
        this.strategy = this.strategies[strategy].algorithm;
    };

    this.build = function(maze, width, height) {
        // If build operation currently being executed,
        // clear previous interval
        if (typeof this.intervalID == "undefined"
            && !this.strategy.done) {
            clearInterval(this.intervalID);
        }

        // Initialise strategy, maze and canvas
        this.strategy.initialise(width, height);
        maze.initialize(width, height);
        var canvas = document.getElementById(canvasId);
        var context = canvas.getContext("2d");

        // Erase canvas contents
        context.fillStyle = "#000";
        context.fillRect(0, 0, canvas.width, canvas.height);

        // Because lol closures
        var self = this;

        context.strokeStyle = "#FFF";
        context.beginPath();

        var cellWidth = canvas.width / maze.width;
        var cellHeight = canvas.height / maze.height;
        var xOffset = cellWidth / 2;
        var yOffset = cellHeight / 2;

        this.intervalID = setInterval(function() {
            // Perform next step of selected algorithm
            self.strategy.build(maze);

            // Draw new edge
            var edge = maze.edges[maze.edges.length - 1];
            var aX = edge.aX * cellWidth + xOffset;
            var aY = edge.aY * cellHeight + yOffset;
            var bX = edge.bX * cellWidth + xOffset;
            var bY = edge.bY * cellHeight + yOffset;
            context.moveTo(aX, aY);
            context.lineTo(bX, bY);
            context.stroke();

            // TODO: Draw marker

            // Remove marker and clear interval when done
            if (self.strategy.done) {
                maze.setMarker(-1, -1);
                clearInterval(self.intervalID);
            }
        }, 25);
    };
}
