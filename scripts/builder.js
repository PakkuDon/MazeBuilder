function Builder(graphics) {
    this.strategies = {
        "dfs" : {
            "name" : "Depth-first Search",
            "algorithm" : new DepthBuilder()
        },
        'kruskal' : {
            "name" : "Randomized Kruskal's",
            "algorithm" : new KruskalBuilder()
        },
        'prim' : {
            "name" : "Randomized Prim's",
            "algorithm" : new PrimBuilder()
        }
    };
    this.graphics = graphics;
    this.strategy = null;

    this.setStrategy = function(strategy) {
        this.strategy = this.strategies[strategy].algorithm;
    };

    this.build = function(maze, width, height) {
        // If build operation currently being executed,
        // clear previous interval
        if (typeof this.intervalID != "undefined"
            && !this.strategy.done) {
            clearInterval(this.intervalID);
        }

        // Initialise strategy, maze and canvas
        this.strategy.initialise(width, height);
        maze.initialize(width, height);

        // Clear canvas and initialise values for graphics
        this.graphics.clear();
        this.graphics.initialise(width, height);

        // Because lol closures
        var self = this;

        this.intervalID = setInterval(function() {
            // Perform next step of selected algorithm
            self.strategy.build(maze);

            // Draw new edge
            self.graphics.drawEdge(maze.edges[maze.edges.length - 1], "#FFF");

            // TODO: Draw marker

            // Remove marker and clear interval when done
            if (self.strategy.done) {
                maze.setMarker(-1, -1);
                clearInterval(self.intervalID);
            }
        }, 25);
    };
}
