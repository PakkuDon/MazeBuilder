function Builder(canvas) {
	this.strategies = {
		'rbt' : null,
		'kruskal' : null
	};
	this.canvas = canvas;
	this.strategy = null;
	
	this.setStrategy(strategy) {
		this.strategy = strategies[strategy];
	}
	
	this.build = function(width, height, seed) {
		strategy.reset();
		strategy.setSize(width, height);
		strategy.seed = seed;
		// TODO: Draw
		// TODO: Null check
		var intervalID = setInterval(function() {
			strategy.build();
			if (strategy.done()) {
				clearInterval(intervalID);
			}
		}, 1000);
	}
}