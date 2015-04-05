/**
 * QueueNode
 * Represents a node in a PriorityQueue.
 * Stores data and its associated priority.
 */
function QueueNode(data, priority) {
    this.data = data;
    this.priority = priority;
}

/**
 * PriorityQueue
 * Implemented as a binary heap starting from index 1.
 */
function PriorityQueue() {
    this.queue = [];
    // Push empty value to fill first slot - done to make it
    // easier to calculate indices
    this.queue.push(null);

    /**
     * add() - Inserts a node containing the given data and priority.
     * Binary heap is sorted to maintain min-heap order.
     */
    this.add = function(data, priority) {
        var node = new QueueNode(data, priority);
        this.queue.push(node);

        this.heapUp(this.queue.length - 1);
    }

    /**
     * poll() - Removes and returns data with the highest priority.
     * Binary heap is sorted to maintain min-heap order.
     */
    this.poll = function() {
        var nodes = this.queue.splice(1, 1);
        this.heapDown(1);

        return nodes[0].data;
    }

    /**
     * heapUp() - Re-heapifies queue from index to the first node.
     */
    this.heapUp = function(index) {
        var parentIndex = Math.floor(index / 2);

        if (parentIndex > 0) {
            var parentNode = this.queue[parentIndex];
            if (parentNode.priority > this.queue[index].priority) {
                this.swap(index, parentIndex);
                this.heapUp(parentIndex);
            }
        }
    }

    /**
     * heapDown() - Re-heapifies queue from index to the last node.
     */
    this.heapDown = function(index) {
        while (index > 0) {
            var leftIndex = 2 * index;
            var rightIndex = leftIndex + 1;

            var nextIndex = index;

            if (leftIndex < this.queue.length
                && this.queue[leftIndex].priority
                < this.queue[nextIndex].priority)
            {
                nextIndex = leftIndex;
            }
            if (rightIndex < this.queue.length
                && this.queue[rightIndex].priority
                < this.queue[nextIndex].priority)
            {
                nextIndex = rightIndex;
            }


            if (nextIndex != index) {
                this.swap(index, nextIndex);
                index = nextIndex;
            }
            else {
                break;
            }
        }

    }

    /**
     * swap() - Swaps nodes at positions indexA and indexB.
     */
    this.swap = function(indexA, indexB) {
        var nodeA = this.queue[indexA];
        var nodeB = this.queue[indexB];

        this.queue[indexA] = nodeB;
        this.queue[indexB] = nodeA;
    }

    /**
     * getPriority() - Returns priority of node containing data.
     * Returns -1 if element not found
     */
    this.getPriority = function(data) {
        for (var i = 0; i < this.queue.length; i++) {
            if (this.queue[i].data === data) {
                return this.queue[i].priority;
            }
        }
        return -1;
    }

    /**
     * delete() - Removes node containing data from queue.
     * Returns true if operation successful, false otherwise.
     */
    this.delete = function(data) {
        for (var i = 0; i < this.queue.length; i++) {
            if (this.queue[i].data === data) {
                this.queue.splice(i, 1);
                return true;
            }
        }
        return false;
    }

    /**
     * clear() - Removes all elements from queue.
     */
    this.clear = function() {
        while (this.queue.length > 1) {
            this.queue.pop();
        }
    }
}
