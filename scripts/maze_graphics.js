/**
 * MazeGraphics
 * Helper class for drawing maze state.
 */
function MazeGraphics(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.context = this.canvas.getContext("2d");
    this.strokeCount = 7;

    this.cellWidth = 0;
    this.cellHeight = 0;
    this.xOffset = 0;
    this.yOffset = 0;

    /**
     * initialise() - Calculates dimensions and offsets required
     * to draw maze walls based on given width and height values.
     */
    this.initialise = function(width, height) {
        this.cellWidth = this.canvas.width / width;
        this.cellHeight = this.canvas.height / height;
        this.xOffset = this.cellWidth / 2;
        this.yOffset = this.cellHeight / 2;
    }

    /**
     * drawEdge() - Draws a line using the given edge's values.
     */
    this.drawEdge = function(edge, color) {
        // Calculate coordinates of edge's end points
        var aX = edge.aX * this.cellWidth + this.xOffset;
        var aY = edge.aY * this.cellHeight + this.yOffset;
        var bX = edge.bX * this.cellWidth + this.xOffset;
        var bY = edge.bY * this.cellHeight + this.yOffset;

        // Set colour and end-points of line
        this.context.strokeStyle = color;
        this.context.beginPath();
        this.context.moveTo(aX, aY);
        this.context.lineTo(bX, bY);
        this.context.stroke();

        // Draw line
        // Performed in a loop since the lines come out transparent
        // on the initial stroke for some reason
        for (var i = 0; i < this.strokeCount; i++) {
            this.context.stroke();
        }
    }

    /**
     * drawMaze() - Draws all maze edges.
     */
    this.drawMaze = function(maze) {
        for (var i = 0; i < maze.edges.length; i++) {
            this.drawEdge(maze.edges[i], "#FFF");
        }
    }

    /**
     * drawSolution() - Draw edges contained in edge list.
     */
    this.drawSolution = function(edgeList) {
        for (var i = 0; i < edgeList.length; i++) {
            this.drawEdge(edgeList[i], "#09F");
        }
    }

    /**
     * clear() - Erases canvas contents.
     */
    this.clear = function() {
        this.context.fillStyle = "#000";
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
}
