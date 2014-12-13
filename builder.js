function Builder(canvasId) {
    this.strategies = {
        "rbt" : new DepthBuilder(),
        'kruskal' : null
    };
    this.canvasId = canvasId;
    this.strategy = null;

    this.setStrategy = function(strategy) {
        this.strategy = this.strategies[strategy];
    };

    this.build = function(width, height) {
        // Initialise strategy, maze and canvas
        this.strategy.initialise(width, height);
        var maze = new Maze(width, height);
        var canvas = document.getElementById(canvasId);
        var context = canvas.getContext("2d");

        // Erase canvas contents
        context.fillStyle = "#000";
        context.fillRect(0, 0, canvas.width, canvas.height);

        // Because lol closures
        var self = this;

        context.strokeStyle = "#FFF";
        context.beginPath();

        var intervalID = setInterval(function() {
            self.strategy.build(maze);

            // Draw new edge
            maze.draw(canvas);

            // Remove marker and clear interval when done
            if (self.strategy.done) {
                maze.marker.x = -1;
                maze.marker.y = -1;
                clearInterval(intervalID);
            }
        }, 25);
    };
}
