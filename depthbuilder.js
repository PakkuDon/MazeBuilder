function DepthBuilder () {
	this.width = 0;
	this.height = 0;
	this.seed = 0;
	this.visisted = [[]];
  this.done = false;
  this.current = {};
  this.stack = [];

  // TODO: Pass in start and end points
	this.initialise = function(width, height, seed) {
		this.width = width;
		this.height = height;
		this.seed = seed;
    this.done = false;

    // Clear visited flags array
    while (this.visited.length > 0) {
      this.visited.pop();
    }

    // Initialise visit flags
    for (var x = 0; x < width; x++) {
      this.visited.push([]);
      for (var y = 0; y < height; y++) {
        this.visited[x].push(false);
      }
    }

    // Set current position to start position
    this.current.x = 0;
    this.current.y = 0;

    // Clear stack
    while (this.stack.length > 0) {
      this.stack.pop();
    }
	};

  this.getUnvisitedNeighbours = function(maze, x, y) {

  }

	this.build = function(maze) {
    // Push current to stack


		// Mark current as visited
    this.visited[this.current.x][this.current.y] = true;
	};
}
