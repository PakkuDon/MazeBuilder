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
        this.currentX = 1;
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
                var cellA = maze.grid[this.currentX][this.currentY];
                var cellB = maze.grid[this.currentX + 1][this.currentY];

                // Decide if cells should be merged or not
                if (Math.random() >= 0.5) {
                    // TODO: See if merge needs to be checked here
                    this.set.merge(cellA, cellB);
                }

                // Move position to next cell
                this.currentX++;

                // If end of row reached, create set list
                // and move to next row
                if (this.currentX == maze.width - 1) {
                    // Empty set list
                    while (this.setList.length > 0) {
                        this.setList.pop();
                    }

                    // Add set roots to set list
                    for (var i = 0; i < maze.width; i++) {
                        var cell = maze[i][this.currentY];
                        var setNode = this.set.getNode(cell);
                        if (setNode.parent == setNode) {
                            this.setList.push(cell);
                        }
                    }

                    // Move to next row and reset x-position
                    this.currentY++;
                    this.currentX = 0;
                }
            }
            // Case: Create vertical connections between sets
            // Should be done for every row except for the last
            else if (this.currentY < maze.width - 1) {

            }
        }
    }
}
