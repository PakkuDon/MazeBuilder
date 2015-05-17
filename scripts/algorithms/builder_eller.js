/**
 * Constructs a maze using Eller's algorithm.
 * For each row, cells are randomly joined horizontally and then vertically.
 * Cells are not joined if they are in the same set.
 */
function EllerBuilder () {
    this.done = false;
    this.set = new DisjointSet();
    this.currentIndex = 0;
    this.setList = {};
    this.currentX = 0;
    this.currentY = 0;

    /**
     * Clears data from previous run and initialises components
     * for next attempt.
     */
    this.initialise = function(width, height) {
        this.done = false;
        this.set.clear();

        // Reset currentIndex
        // currentIndex - Determines what 'step' of the build process we're in
        this.currentIndex = 0;

        // Empty set list
        for (var key in this.setList) {
            delete this.setList[key];
        }

        // Reset location
        this.currentX = 0;
        this.currentY = 0;
    }

    /**
     * Executes next step from last saved state.
     */
    this.build = function(maze) {
        // If last row processed, set flag and return
        if (this.currentY == maze.height - 1
            && this.currentIndex != 0) {
            this.done = true;
        }
        else {
            // Call next step of function
            if (this.currentIndex === 0) {
                this.joinAdjacent(maze);
            }
            else if (this.currentIndex === 1) {
                this.joinSets(maze);
            }
            else if (this.currentIndex === 2) {
                this.joinVertically(maze);
            }

            // If current step completed, move to next function
            // Steps 1 and 3 are completed once the end of the
            // current row is reached.
            // Step 2 is completed once the set list is exhausted
            if (this.currentX == maze.width - 1 ||
                (this.currentIndex == 1
                 && Object.keys(this.setList).length == 0)) {
                this.currentIndex = (this.currentIndex + 1) % 3;
                this.currentX = 0;
            }
        }
    }

    /**
     * Randomly creates horizontal joins between adjacent cells. Cells
     * in the same set are not joined.
     */
    this.joinAdjacent = function(maze) {
        // If first time iterating through row, make set for each node
        if (this.currentX == 0) {
            for (var x = 0; x < maze.width; x++) {
                var currentCell = maze.grid[x][this.currentY];
                if (typeof this.set.getNode(currentCell) === "undefined") {
                    this.set.makeSet(currentCell);
                }
            }
        }

        // Attempt to merge cell at current x, y position
        // with the cell to the right
        var cellA = maze.grid[this.currentX][this.currentY];
        var cellB = maze.grid[this.currentX + 1][this.currentY];

        // Decide if cells should be merged or not
        // Merges on last row must always be attempted.
        // Otherwise, merges are attempted randomly.
        if (Math.random() >= 0.5 || this.currentY == maze.height - 1) {
            // If merge successful add resulting edge to maze
            if (this.set.merge(cellA, cellB)) {
                maze.addEdge(new Edge(cellA.x, cellA.y, cellB.x, cellB.y));
            }
        }

        // Move to next cell
        this.currentX++;

        // If end of row reached, populate set list for next step
        if (this.currentX == maze.width - 1) {
            for (var x = 0; x < maze.width; x++) {
                var currentCell = maze.grid[x][this.currentY];
                var node = this.set.getNode(currentCell);
                var root = this.set.find(node).data;
                var setEntry = this.setList[root.toString()];

                // If root cell not yet included in set list,
                // add new entry
                if (typeof setEntry === "undefined") {
                    this.setList[root.toString()] = [];
                }

                // Add currentCell to list of descendants for root cell
                this.setList[root.toString()].push(currentCell);
            }
        }
    }

    /**
     * Creates vertical joins between each cell set and the cell below it.
     */
    this.joinSets = function(maze) {
        // Retrieve set from setList hash
        var firstKey = Object.keys(this.setList)[0];

        if (firstKey !== null) {
            // Attempt to merge a random child of root cell in firstKey
            // with cell below it
            var currentSet = this.setList[firstKey];
            var randomIndex = Math.floor(Math.random() * currentSet.length);

            var parentCell = currentSet[randomIndex];
            var childCell = maze.grid[parentCell.x][parentCell.y + 1];

            // If merge successful, add resulting edge to maze
            // and remove current set from list
            if (this.set.merge(parentCell, childCell)) {
                maze.addEdge(new Edge(
                    parentCell.x, parentCell.y, childCell.x, childCell.y));
                delete this.setList[firstKey];
            }
        }
    }

    /**
     * Randomly joins cells vertically.
     */
    this.joinVertically = function(maze) {
        // Get cell at current x,y position and the cell below it
        var parentCell = maze.grid[this.currentX][this.currentY];
        var childCell = maze.grid[this.currentX][this.currentY + 1];

        // Choose to merge cells randomly
        // If merge successful, add resulting edge to maze
        if (Math.random() >= 0.5) {
            if (this.set.merge(parentCell, childCell)) {
                maze.addEdge(new Edge(parentCell.x, parentCell.y,
                                      childCell.x, childCell.y));
            }
        }

        // Move to next cell in row
        this.currentX++;

        // If end of row reached, move to next row
        if (this.currentX == maze.width - 1) {
            this.currentY++;
        }
    }
}
