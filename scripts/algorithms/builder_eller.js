function EllerBuilder () {
    this.done = false;
    this.set = new DisjointSet();
    this.setList = [];
    this.currentX = 0;
    this.currentY = 0;
    this.joinAdjacent = true;

    this.initialise = function(width, height) {
        this.done = false;
        this.set.clear();

        // Empty set list
        while (this.setList.length > 0) {
            this.setList.pop();
        }

        // Reset location
        this.currentX = 0;
        this.currentY = 0;

        // Set initial value for joinAdjacent flag
        // Flag is used to determine whether we're on the
        // first or second parse of a row
        this.joinAdjacent = true;
    }

    this.build = function(maze) {
        // If last row processed, set flag and return
        if (this.currentY == maze.height - 1
            && this.joinAdjacent == false) {
            this.done = true;
        }
        else {
            // Case: Connect adjacent cells
            if (this.joinAdjacent === true) {
                if (this.currentX < maze.width - 1) {
                    var cellA = maze.grid[this.currentX][this.currentY];
                    var cellB = maze.grid[this.currentX + 1][this.currentY];

                    // Decide if cells should be merged or not
                    if (Math.random() >= 0.5 || this.currentY == maze.height - 1) {
                        if (this.set.merge(cellA, cellB)) {
                            maze.addEdge(new Edge(cellA.x, cellA.y, cellB.x, cellB.y));
                        }
                    }

                    // Move position to next cell
                    this.currentX++;
                }
                // If end of row reached, populate set list
                // and move to next row
                else {
                    // Add set roots to set list
                    for (var i = 0; i < maze.width; i++) {
                        var cell = maze.grid[i][this.currentY];
                        var setNode = this.set.getNode(cell);

                        // TODO: Consider calling makeSet before
                        // processing each row
                        if (typeof setNode == "undefined") {
                            this.set.makeSet(cell);
                            setNode = this.set.getNode(cell);
                        }

                        // TODO: Remove duplicates
                        this.setList.push(cell);
                    }

                    // Reset x-position and set flag
                    this.currentX = 0;
                    this.joinAdjacent = false;
                }
            }
            // Case: Create vertical connections between sets
            // Should be done for every row except for the last
            else if (this.currentY < maze.height - 1) {
                if (this.setList.length > 0) {
                    var parentCell = this.setList.shift();
                    var childCell = maze.grid[parentCell.x][parentCell.y + 1];

                    if (Math.random() >= 0.5 && this.set.merge(parentCell, childCell)) {
                        maze.addEdge(new Edge(parentCell.x, parentCell.y, childCell.x, childCell.y));
                    }
                }
                else {
                    this.currentY++;
                    this.currentX = 0;

                    this.joinAdjacent = true;
                }
            }
        }
    }
}
