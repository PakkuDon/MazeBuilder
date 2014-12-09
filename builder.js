function Builder(canvasId) {
    this.strategies = {
        "rbt" : new DepthBuilder(),
        'kruskal' : null
    };
    this.canvasId = canvasId;
    this.strategy = null;

    this.setStrategy = function(strategy) {
        this.strategy = this.strategies[strategy];
    }

    this.build = function(width, height) {
        this.strategy.initialise(width, height);
        var maze = new Maze(width, height);
        // Because lol closures
        var self = this;

        var intervalID = setInterval(function() {
            self.strategy.build(maze);
            maze.draw(canvasId);
            if (self.strategy.done) {
                // Remove marker and clear interval when done
                maze.marker.x = -1;
                maze.marker.y = -1;
                maze.draw(canvasId);
                clearInterval(intervalID);
            }
        }, 50);
    }
}
