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
    var grid = maze.grid;
    var neighbours = [];
	
	// Check north cell
	if (x < maze.width && x >= 0 && y - 1 < maze.height && y - 1 >= 0) {
		neighbours.push({
			x: x, 
			y: y - 1
		});
	}
	// Check east cell
	if (x + 1 < maze.width && x + 1 >= 0 && y < maze.height && y >= 0) {
		neighbours.push({
			x: x + 1, 
			y: y
		});
	}
	// Check south cell
	if (x < maze.width && x >= 0 && y + 1 < maze.height && y + 1>= 0) {
		neighbours.push({
			x: x, 
			y: y + 1
		});
	}
	// Check west cell
	if (x - 1 < maze.width && x - 1 >= 0 && y < maze.height && y >= 0) {
		neighbours.push({
			x: x - 1, 
			y: y
		});
	}
	return neighbours;
  }

	this.build = function(maze) {
		// Push current to stack
		this.stack.push(this.current);
		// Mark current as visited
		this.visited[this.current.x][this.current.y] = true;
	};
}
