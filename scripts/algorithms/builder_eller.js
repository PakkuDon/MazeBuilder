function EllerBuilder () {
    this.done = false;
    this.set = new DisjointSet();
    this.setList = [];
    this.currentRow = 0;
    this.currentCol = 0;
    this.joinVertically = false;

    this.initialise = function(width, height) {
        this.done = false;
        this.set.clear();

        // Empty set list
        while (this.setList.length > 0) {
            this.setList.pop();
        }

        // Reset location
        this.currentRow = 0;
        this.currentCol = 0;

        // Set flag to create vertical connections
        this.joinVertically = false;
    }

    this.build = function(maze) {
    }
}
