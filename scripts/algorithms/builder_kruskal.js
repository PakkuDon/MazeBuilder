function KruskalBuilder() {
    this.done = false;
    this.possibleEdges = [];
    this.currentPos = 0;
    this.set = new DisjointSet();

    this.initialise = function(width, height) {
        this.set.clear();
        this.currentPos = 0;
        this.done = false;

        // Clear existing possible edges
        Utility.clearArray(this.possibleEdges);

        // Generate list of possible edges
        for (var x = 1; x < width; x++) {
            for (var y = 1; y < height; y++) {
                var edgeA = new Edge(x - 1, y, x, y);
                var edgeB = new Edge(x, y - 1, x, y);
                this.possibleEdges.push(edgeA);
                this.possibleEdges.push(edgeB);
            }
        }

        // Generate edges along north side
        for (var x = 1; x < width; x++) {
            var edge = new Edge(x - 1, 0, x, 0);
            this.possibleEdges.push(edge);
        }

        // Generate edges along west side
        for (var y = 1; y < height; y++) {
            var edge = new Edge(0, y - 1, 0, y);
            this.possibleEdges.push(edge);
        }

        // Shuffle edges
        for (var i = 0; i < this.possibleEdges.length; i++) {
            var randomIndex = Math.floor(Math.random() * this.possibleEdges.length);
            var tmp = this.possibleEdges[i];
            this.possibleEdges[i] = this.possibleEdges[randomIndex];
            this.possibleEdges[randomIndex] = tmp;
        }
    };

    this.build = function(maze) {
        // If all possible edges exhausted, update flag
        if (this.currentPos == this.possibleEdges.length) {
            this.done = true;
        }
        // Else, process next possible edge
        else {
            var edge = this.possibleEdges[this.currentPos];
            var cellA = maze.grid[edge.aX][edge.aY];
            var cellB = maze.grid[edge.bX][edge.bY];

            // If cells not in same set, add edge to path
            if (this.set.merge(cellA, cellB) === true) {
                maze.addEdge(edge);
            }

            // Update current position in edges array
            this.currentPos++;
        }
    };
}
