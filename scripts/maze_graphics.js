function MazeGraphics(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.context = canvas.getContext("2d");

    this.cellWidth = 0;
    this.cellHeight = 0;
    this.xOffset = 0;
    this.yOffset = 0;

    this.initialise = function(width, height) {
    }

    this.drawEdge = function(edge) {
    }

    this.drawMaze = function(maze) {
    }

    this.drawSolution = function(edgeList) {
    }

    this.clear = function() {
    }
}