/**
 * Handles maze solving process. Stores references to a group of
 * pre-defined maze solving algorithms, the graphics module and
 * the maze itself.
 */
function Solver(maze, graphics) {
    // Available maze solving algorithms
    this.strategies = {
        "dfs" : {
            "name" : "Depth-first Search",
            "algorithm" : new DepthSolver()
        },
        "bfs" : {
            "name" : "Breadth-first Search",
            "algorithm" : new BreadthSolver()
        },
        "astar" : {
            "name" : "A* Search",
            "algorithm" : new AStarSolver()
        },
        "ucs" : {
            "name" : "Uniform-cost Search",
            "algorithm" : new UniformCostSolver()
        }
    };
    this.graphics = graphics;
    this.strategy = null;
    this.delay = 25;
    this.maze = maze;

    // self - defined to allow functions to refer to instance
    var self = this;

    /**
     * Returns true if maze generation in process.
     */
    this.isRunning = function() {
        return typeof this.intervalID !== "undefined"
        && !this.strategy.done;
    }

    /**
     * Sets selected strategy to the strategy associated with the given key.
     */
    this.setStrategy = function(strategy) {
        this.strategy = this.strategies[strategy].algorithm;
    };

    /**
     * Initialises components and starts maze-solving task.
     */
    this.solve = function(startX, startY, endX, endY) {
        // If solve operation currently being executed,
        // clear previous interval
        if (this.isRunning()) {
            clearInterval(this.intervalID);
        }

        // Turn given points into x,y pairs
        var startPoint = { x: startX, y: startY };
        var endPoint = { x: endX, y: endY };

        // Initialise strategy, maze and canvas
        this.strategy.initialise(maze, startPoint, endPoint);

        // Initialise graphics
        this.graphics.initialise(maze.width, maze.height);

        // Redraw maze to remove previous solutions
        this.graphics.clear();
        this.graphics.drawMaze(maze);

        this.intervalID = setInterval(self.step, this.delay);
    }

    /**
     * Perform next step of algorithm and update view
     */
    this.step = function() {
        self.strategy.solve(maze);

        // Draw visited edge
        var edge = self.strategy
            .visitedEdges[self.strategy.visitedEdges.length - 1];
        if (typeof edge !== "undefined") {
            self.graphics.drawVisitedEdge(edge);
        }

        // Clear interval and draw solution path when done
        if (self.strategy.done) {
            clearInterval(self.intervalID);

            var solution = self.strategy.solution;
            self.graphics.drawSolution(solution);
        }
    }

    /**
     * Sets delay between algorithm's steps to the given value.
     * Pauses and resumes algorithm with new delay if it's running.
     */
    this.setDelay = function(delay) {
        // If solver currently executing, stop algorithm
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
