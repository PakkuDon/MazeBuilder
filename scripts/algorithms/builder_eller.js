function EllerBuilder () {
    this.done = false;
    this.set = new DisjointSet();
    this.currentIndex = 0;
    this.setList = {};
    this.currentX = 0;
    this.currentY = 0;

    this.initialise = function(width, height) {
        this.done = false;
        this.set.clear();
        this.currentIndex = 0;

        // Empty set list
        for (var key in this.setList) {
            delete this.setList[key];
        }

        // Reset location
        this.currentX = 0;
        this.currentY = 0;
    }

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
                (this.currentIndex == 1 && this.setList.length == 0)) {
                this.currentIndex = (this.currentIndex + 1) % 3;
                this.currentX = 0;
            }
        }
    }

    this.joinAdjacent = function(maze) {
        // If first time iterating through row, make set for each node
        if (this.currentX == 0) {
            for (var x = 0; x < maze.width; x++) {
                var currentCell = maze.grid[x][this.currentY];
                if (this.set.getNode(currentCell) == "undefined") {
                    this.set.makeSet(currentCell);
                }
            }
        }

        if (this.currentX < maze.width - 1) {
            var cellA = maze.grid[this.currentX][this.currentY];
            var cellB = maze.grid[this.currentX + 1][this.currentY];

            // Decide if cells should be merged or not
            if (Math.random() >= 0.5 || this.currentY == maze.height - 1) {
                if (this.set.merge(cellA, cellB)) {
                    maze.addEdge(new Edge(cellA.x, cellA.y, cellB.x, cellB.y));
                }
            }
        }

        // Move to next cell
        this.currentX++;

        // If end of row reached, populate set list for next step
        if (this.currentX == maze.width - 1) {
            for (var x = 0; x < maze.width; x++) {
                var currentCell = maze.grid[x][this.currentY];
                var node = this.set.getNode(currentCell);

                if (typeof node === "undefined") {
                    this.set.makeSet(currentCell);
                    node = this.set.getNode(currentCell);
                }
                var root = this.set.find(node).data;
                var setEntry = this.setList[root.toString()];

                if (typeof setEntry === "undefined") {
                    this.setList[root.toString()] = [];
                }

                this.setList[root.toString()].push(currentCell);
            }
        }
    }

    this.joinSets = function(maze) {
        // Retrieve set from setList hash
        var firstKey = null;
        for (var key in this.setList) {
            firstKey = key;
            break;
        }

        if (firstKey !== null) {
            // Attempt to merge a random child of root cell in firstKey with a cell from the next row
            var currentSet = this.setList[firstKey];
            var parentCell = currentSet[Math.floor(Math.random() * currentSet.length)];
            var childCell = maze.grid[parentCell.x][parentCell.y];

            // If merge successful, add resulting edge to maze and remove set from list
            if (this.set.merge(parentCell, childCell)) {
                maze.addEdge(new Edge(parentCell.x, parentCell.y, childCell.x, childCell.y));
                delete this.setList[firstKey];
            }
        }
    }

    this.joinVertically = function(maze) {
        var parentCell = maze.grid[this.currentX][this.currentY];
        var childCell = maze.grid[this.currentX][this.currentY + 1];

        if (Math.random() >= 0.5) {
            if (this.set.merge(parentCell, childCell)) {
                maze.addEdge(new Edge(parentCell.x, parentCell.y, childCell.x, childCell.y));
            }
        }

        this.currentX++;

        // If end of row reached, move to next row
        if (this.currentX == maze.width - 1) {
            this.currentY++;
        }
    }
}
