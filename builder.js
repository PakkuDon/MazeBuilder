function Builder(canvasId) {
	this.strategies = {
		'rbt' : null,
		'kruskal' : null
	};
	this.canvasId = canvasId;
	this.strategy = null;

	this.setStrategy = function(strategy) {
		this.strategy = strategies[strategy];
	}

	this.build = function(maze, width, height, seed) {
		strategy.initialise(width, height, seed);
		// TODO: Draw
		// TODO: Null check
		var intervalID = setInterval(function() {
			strategy.build(maze);
      maze.draw(canvasId);
			if (strategy.done()) {
				clearInterval(intervalID);
			}
		}, 1000);
	}
}
