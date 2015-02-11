/**
 * MazeGraphics
 * Helper class for drawing maze state.
 */
function MazeGraphics(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.context = canvas.getContext("2d");

    this.cellWidth = 0;
    this.cellHeight = 0;
    this.xOffset = 0;
    this.yOffset = 0;

    /**
     * initialise() - Calculates dimensions and offsets required
     * to draw maze walls based on given width and height values.
     */
    this.initialise = function(width, height) {
        this.cellWidth = canvas.width / width;
        this.cellHeight = canvas.height / height;
        this.xOffset = cellWidth / 2;
        this.yOffset = cellHeight / 2;
    }

    /**
     * drawEdge() - Draws a line using the given edge's values.
     */
    this.drawEdge = function(edge) {
        var aX = edge.aX * this.cellWidth + this.xOffset;
        var aY = edge.aY * this.cellHeight + this.yOffset;
        var bX = edge.bX * this.cellWidth + this.xOffset;
        var bY = edge.bY * this.cellHeight + this.yOffset;
    }

    this.drawMaze = function(maze) {
    }

    this.drawSolution = function(edgeList) {
    }

    this.clear = function() {
    }
}
