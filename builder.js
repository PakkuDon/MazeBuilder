function Builder(canvasId) {
    this.strategies = {
        "dfs" : new DepthBuilder(),
        'kruskal' : new KruskalBuilder()
    };
    this.canvasId = canvasId;
    this.strategy = null;

    this.setStrategy = function(strategy) {
        this.strategy = this.strategies[strategy];
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

        this.intervalID = setInterval(function() {
            self.strategy.build(maze);

            // Draw new edge
            maze.draw(canvas);

            // Remove marker and clear interval when done
            if (self.strategy.done) {
                maze.setMarker(-1, -1);
                clearInterval(self.intervalID);
            }
        }, 25);
    };
}
