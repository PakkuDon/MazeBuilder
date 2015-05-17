/**
 * Stores values in several non-overlapping sets
 * Also known as a union-find data structure.
 */
function DisjointSet() {
}

// Inherit from Tree and override relevant methods
DisjointSet.prototype = new Tree();
DisjointSet.prototype.constructor = DisjointSet;
/**
 * find() - Returns the parent of node.
 * Performs path-compression.
 */
DisjointSet.prototype.find = function(node) {
    if (node.parent != node) {
        node.parent = this.find(node.parent);
    }
    return node.parent;
};

/**
 * merge() - Attempt to perform union of sets containing values a and b
 */
DisjointSet.prototype.merge = function(a, b) {
    // Retrieve nodes containing a and b
    // If either a and b not found in disjoint forest, create new nodes
    var nodeA = this.getNode(a);
    if (nodeA === undefined) {
        this.makeSet(a);
        nodeA = this.getNode(a);
    }

    var nodeB = this.getNode(b);
    if (nodeB === undefined) {
        this.makeSet(b);
        nodeB = this.getNode(b);
    }

    // If nodes containing a and b both share the same parent, return false
    var rootA = this.find(nodeA);
    var rootB = this.find(nodeB);

    if (rootA === rootB) {
        return false;
    }

    // Else, join nodes
    rootB.parent = rootA;
    return true;
};

