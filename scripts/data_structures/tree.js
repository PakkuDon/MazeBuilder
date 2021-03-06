/**
 * Part of the Tree data structure defined below. Contains some data
 * and a reference to this node's parent.
 */
function Node(data) {
    this.data = data;
    this.parent = this;

    // Returns a String representation of the contained data.
    this.toString = function() {
        return this.data.toString();
    };
}

/**
 * Parent-pointer tree structure. Stores a series of nodes which
 * contain pointers to their parent node.
 */
function Tree() {
    this.nodes = {};

    /**
     * find() - Returns the parent of a given node.
     */
    this.find = function(node) {
        if (node.parent == node) {
            return node;
        }
        else {
            return this.find(node.parent);
        }
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
        this.nodes[data.toString()] = new Node(data);
    };

    /**
     * merge() - Attempt to perform union of sets containing values a and b
     */
    this.merge = function(a, b) {
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
        nodeB.parent = nodeA;
        return true;
    };

    /**
     * getAncestors() - Returns a list of nodes that are an ancestor to the node
     * containing data.
     */
    this.getAncestors = function(data) {
        var node = this.getNode(data);
        var ancestors = [];

        if (node !== undefined) {
            do {
                ancestors.push(node.data);
                node = node.parent;
            } while (node.parent != node);
            ancestors.push(node.data);
        }

        return ancestors;
    }

    /**
     * clear() - Removes all nodes currently stored in tree.
     */
    this.clear = function() {
        for (var key in this.nodes) {
            delete this.nodes[key];
        }
    }
}
