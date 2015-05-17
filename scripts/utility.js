/**
 * Helper class - performs common tasks.
 */
// Empty prototype - just trying to achieve something close
// to static methods from Java
function Utility() { }

/**
 * clearArray() - Removes all elements from the given array.
 */
Utility.clearArray = function(array) {
    while(array.length > 0) {
        array.pop();
    }
}
