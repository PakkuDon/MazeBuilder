
$(document).ready(function() {
    // Initialise objects
    var maze = new Maze(0, 0);
    var maze_graphics = new MazeGraphics("view");
    var builder = new Builder(maze, maze_graphics);
    var solver = new Solver(maze, maze_graphics);
    var formUtil = new FormUtility();

    // Populate drop-downs with algorithms from builder and solver
    formUtil.populateAlgorithmList("build_algorithms", builder.strategies);
    formUtil.populateAlgorithmList("solve_algorithms", solver.strategies);

    // Register event handler on build-options form
    $("#build_form").submit(function() {
        // Remove errors from previous run
        $("#build_form_errors").remove();

        // Retrieve values from form;
        var width = $("#width").val();
        var height = $("#height").val();
        var algorithm = $("#build_algorithms").val();

        // If validation succeeds, execute algorithm
        if (formUtil.validateBuildForm(width, height) === true) {
            builder.setStrategy(algorithm);
            builder.build(width, height);
        }
        // Else, display errors
        else {
            var errorDiv = $("<div id=\"build_form_errors\">").addClass("alert alert-danger");

            var errors = formUtil.buildFormErrors;
            var items = [];
            for (var i = 0; i < errors.length; i++) {
                var error = errors[i];
                items.push("<li>" + error + "</li>");
            }

            errorDiv.append("<ul>" + items.join("") + "</ul>");
            $("#build_form_inputs").prepend(errorDiv);
        }
    });

    // Register event handler on solve-options form
    $("#solve_form").submit(function() {
        // Remove errors from previous run
        $("#solve_form_errors").remove();

        // Retrieve values from form
        var algorithm = $("#solve_algorithms").val();
        var startX = $("#startX").val();
        var startY = $("#startY").val();
        var endX = $("#endX").val();
        var endY = $("#endY").val();

        // If validation succeeds, execute algorithm
        if (formUtil.validateSolveForm(startX, startY, endX, endY, maze) === true) {
            solver.setStrategy(algorithm);
            solver.solve(startX, startY, endX, endY);
        }
        // Else, display errors
        else {
            // Construct container div
            var errorDiv = $("<div id=\"solve_form_errors\">").addClass("alert alert-danger");

            var errors = formUtil.solveFormErrors;
            var items = [];
            for (var i = 0; i < errors.length; i++) {
                var error = errors[i];
                items.push("<li>"+ error +"</li>");
            }

            errorDiv.append("<ul>" + items.join("") + "</ul>");
            $("#solve_form_inputs").prepend(errorDiv);
        }
    });

    // Register event handler on load form
    $("#load_form").submit(function() {
        // Remove errors from previous run
        $("#load_form_errors").remove();

        // Validate maze string
        var mazeString = $("#mazeString").val();
        if (formUtil.validateMazeString(mazeString) === true) {
            // If valid, load and display maze constructed from input string
            maze.load(mazeString);
            maze_graphics.clear();
            maze_graphics.initialise(maze.width, maze.height);
            maze_graphics.drawMaze(maze);
        }
        else {
            // Else, display error
            var errorDiv = $("<div id=\"load_form_errors\">").addClass("alert alert-danger");
            errorDiv.append("Input string not in correct format.");
            $("#load_form_inputs").prepend(errorDiv);
        }
    });

    // Register event handler on 'clear canvas' button
    $("#clearCanvas").click(function() {
        // TODO: Stop build/solve operations
        maze_graphics.clear();
    });

    // Register event handler on 'clear solution' button
    $("#clearSolution").click(function() {
        maze_graphics.clear();
        maze_graphics.drawMaze(maze);
    });

    // Register event handler on 'export maze' button
    $("#exportMaze").click(function() {
        var mazeString = maze.toString();
        $("#mazeString").val(mazeString);
    });

    // Register event handlers for colour inputs
    // TODO: Refactor the lines below
    $("#foregroundColour").change(function() {
        var colour = $("#foregroundColour").val();
        maze_graphics.foregroundColour = colour;
    });

    $("#backgroundColour").change(function() {
        var colour = $("#backgroundColour").val();
        maze_graphics.backgroundColour = colour;
    });

    $("#visitedColour").change(function() {
        var colour = $("#visitedColour").val();
        maze_graphics.visitedColour = colour;
    });

    $("#solutionColour").change(function() {
        var colour = $("#solutionColour").val();
        maze_graphics.solutionColour = colour;
    });

    // Set delay value
    $("#timerDelay").change(function() {
        var delay = $("#timerDelay").val();
        builder.setDelay(delay);
        solver.setDelay(delay);
    });
});