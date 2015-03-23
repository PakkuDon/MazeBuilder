function FormValidator() {
    this.buildFormErrors = [];
    this.solveFormErrors = [];

    /**
     * validateBuildForm() - Determines whether or not the
     * given width/height values are valid against arbitrary rules.
     * Returns true if inputs are valid, false otherwise.
     * Modifies this.buildErrors array.
     */
    this.validateBuildForm = function(width, height) {
        // Clear errors from previous run
        Utility.clearArray(this.buildFormErrors);

        // Check if width is a numeric value between 2 and 100
        if (this.isNumeric(width) === false) {
            this.buildFormErrors.push("Width must be a numeric value");
        }
        else if (width < 2 || width > 100) {
            this.buildFormErrors.push("Width must be a value between 2 and 100");
        }

        // Check if height is a numeric value between 2 and 100
        if (this.isNumeric(height) === false) {
            this.buildFormErrors.push("Height must be a numeric value");
        }
        else if (height < 2 || height > 100) {
            this.buildFormErrors.push("Height must be a value between 2 and 100");
        }

        // Return validation result
        if (this.buildFormErrors.length > 0) {
            return false;
        }
        return true;
    }

    /**
     * validateSolveForm() - Determines whether or not the given width/height
     * values are valid against arbitrary rules and current maze's dimensions.
     * Returns true if inputs are valid, false otherwise.
     * Modifies this.solveErrors array.
     */
    this.validateSolveForm = function(startX, startY, endX, endY, maze) {
        // Clear errors from previous run
        Utility.clearArray(this.solveFormErrors);

        // Wrap points in an object / hash
        var points = {
            "startX" : startX,
            "startY" : startY,
            "endX" : endX,
            "endY" : endY
        };

        // Check if each point is numeric and if they're within the maze dimensions
        for (var key in points) {
            if (this.isNumeric(points[key]) === false) {
                console.log(points[key]);
                this.solveFormErrors.push(key + " must be a numeric value.");
            }
            // If value is numeric, check if value is between 0 and maze dimensions
            // Regexes used to determine which property to compare the current item with
            else {
                var value = parseInt(points[key]);
                if (/X/.test(key) === true &&
                    (value < 0 || value >= maze.width)) {
                    this.solveFormErrors.push(key + " must be between 0 and current maze width.");
                }
                else if (/Y/.test(key) === true &&
                    (value < 0 || value >= maze.height)) {
                    this.solveFormErrors.push(key + " must be between 0 and current maze height.");
                }
            }
        }


        // Return validation result
        if (this.solveFormErrors.length > 0) {
            return false;
        }
        return true;
    }

    /**
     * isNumeric() - Returns true if value is recognised as a
     * number, false otherwise.
     * Doesn't check for decimals or negative numbers.
     */
    this.isNumeric = function(value) {
        return /^[0-9]+$/.test(value);
    }
}
