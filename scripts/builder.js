function Builder(maze, graphics) {
    this.strategies = {
        "dfs" : {
            "name" : "Depth-first Search",
            "algorithm" : new DepthBuilder()
        },
        "kruskal" : {
            "name" : "Randomized Kruskal's",
            "algorithm" : new KruskalBuilder()
        },
        "prim" : {
            "name" : "Randomized Prim's",
            "algorithm" : new PrimBuilder()
        },
        "eller" : {
            "name" : "Eller's",
            "algorithm" : new EllerBuilder()
        }
    };
    this.graphics = graphics;
    this.strategy = null;
    this.delay = 25;
    this.maze = maze;

    // self - defined to allow functions to refer to instance
    var self = this;

    this.isRunning = function() {
        return typeof this.intervalID !== "undefined"
            && !this.strategy.done;
    }

    this.setStrategy = function(strategy) {
        this.strategy = this.strategies[strategy].algorithm;
    };

    this.build = function(width, height) {
        // If build operation currently being executed,
        // clear previous interval
        if (this.isRunning()) {
            clearInterval(this.intervalID);
        }

        // Initialise strategy, maze and canvas
        this.strategy.initialise(width, height);
        maze.initialize(width, height);

        // Clear canvas and initialise values for graphics
        this.graphics.clear();
        this.graphics.initialise(width, height);

        // Start algorithm
        this.intervalID = setInterval(self.step, this.delay);
    }

    // Perform next step of algorithm and update view
    this.step = function() {
        self.strategy.build(self.maze);

        // Draw new edge
        if (self.maze.edges.length > 0) {
            self.graphics.drawMazeEdge(
                self.maze.edges[self.maze.edges.length - 1]);
        }

        // TODO: Draw marker

        // Remove marker and clear interval when done
        if (self.strategy.done) {
            self.maze.setMarker(-1, -1);
            clearInterval(self.intervalID);
            this.intervalID = undefined;
        }
    }

    this.setDelay = function(delay) {
        // If builder currently executing, stop algorithm
        if (this.isRunning()) {
            clearInterval(this.intervalID);
        }
        // Restart algorithm with new delay
        this.delay = delay;
        if (this.isRunning()) {
            this.intervalID = setInterval(self.step, this.delay);
        }
    }
}
