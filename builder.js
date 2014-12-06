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

	this.build = function(width, height, seed) {
		this.strategy.initialise(width, height, seed);
    var maze = new Maze(width, height);
    // Because lol closures
    var self = this;

		var intervalID = setInterval(function() {
			self.strategy.build(maze);
      maze.draw(canvasId);
			if (self.strategy.done) {
				clearInterval(intervalID);
			}
		}, 1000);
	}
}
