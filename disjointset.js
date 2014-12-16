function Node(data) {
    this.data = data;
    this.parent = this;
}

function DisjointSet() {
    this.nodes = {};

    /**
     * find() - Returns the parent of node.
     * Performs path compression.
     */
    this.find = function(node) {
        if (node.parent != node) {
            node.parent = find(node.parent);
        }
        return node.parent;
    };

    /**
     * getNode() - Returns node containing data.
     */
    this.getNode = function(data) {
        return this.nodes[data.toString()];
    };

    /**
     * makeSet() - Add set to disjoint forest consisting of single node.
     */
    this.makeSet = function(data) {
        var n = new Node(data);
        this.nodes[data.toString()] = n;
    };

    /**
     * merge() - Attempt to perform union of sets containing values a and b
     */
    this.merge = function(a, b) {
        var nodeA = this.getNode(a);
        var nodeB = this.getNode(b);

        // TODO: If either a and b not found in disjoint forest, return false

        // If nodes containing a and b both share the same parent, return false
        var rootA = this.find(nodeA);
        var rootB = this.find(nodeB);

        if (rootA == rootB) {
            return false;
        }

        // Else, join nodes
        rootB.parent = rootA;
        return true;
    };
}
