import {Stack} from './stack';
import {Queue} from './queue';

require('log-timestamp');

class Node {
    private readonly _id: string;

    constructor(id: string) {
        this._id = id
    }

    get_id() {
        return this._id;
    }
}

class Edge {
    private _attrs: Record<string, any>;

    constructor(attrs: Record<string, any> = {}) {
        this._attrs = attrs;
    }

    get_attrs() {
        return this._attrs;
    }

    // Main attribute I care about is 'weight' but I'm following the NetworkX code pretty closely to allow expansion.
    update_attrs(attrs: Record<string, any>) {
        Object.assign(this._attrs, attrs);
    }

    // Should we return anything here? And should we add single attr removal?
    clear_attrs(): void {
        this._attrs = null;
    }
}

// Learning experience, but I think this is a reasonably good start.
// Basically just trying to put a limit of some kind on the attribute values.
// Come back and do this better, it's deliberate loose for now.
interface Attribute {
    [key: string]: any;
}

interface GraphInterface {
    add_node(node: Node, attrs?: Record<string, string>): void;

    remove_node(node: Node): void;

    add_edge(u: Node, v: Node, attrs?: Record<string, any>): void;

    remove_edge(u: Node, v: Node): void;

    has_node(node: Node): boolean;

    print_node_ids(): void;
}

class Graph implements GraphInterface {

    private _node: Map<Node, Attribute>;
    private _adj: Map<Node, Map<Node, Edge>>;

    constructor() {
        this._node = new Map();
        this._adj = new Map();
    }

    // Returns the size of the node array.
    add_node(node: Node, attrs: Attribute = {}): number {
        if (!node) {
            throw new Error("Node cannot be null or undefined!");
        }

        if (!this._node.has(node)) {
            this._node.set(node, attrs);
            this._adj.set(node, new Map());
        } else {
            console.warn(`Node ${node.get_id()} already in graph. Updating attributes.`)
            const existingAttrs = this._node.get(node);
            Object.assign(existingAttrs, attrs);
        }
        console.debug(`Successfully added node ${node.get_id()}.`);
        return this._node.size;
    }

    // Returns the size of the node array.
    // This will need to be updated when we add edges to also completely remove the node from the adj list.
    remove_node(node: Node): number {
        if (!node) {
            throw new Error("Node cannot be null or undefined!");
        }

        if (!this._node.has(node)) {
            throw new Error("Node not in graph!");
        } else {
            console.warn(`Removing node ${node.get_id()} from graph.`);
            this._node.delete(node);
            this._adj.delete(node);
        }
        console.debug(`Successfully removed node ${node.get_id()}.`);
        return this._node.size;
    }

    add_edge(node: Node, other: Node): Edge {
        throw new Error('Method not implemented.');
    }

    remove_edge(node: Node, other: Node): Edge {
        throw new Error('Method not implemented.');
    }

    has_node(node: Node): boolean {
        throw new Error('Method not implemented.');
    }

    print_node_ids(): void {
        const entries: string[] = [];
        this._node.forEach((element: Attribute, node: Node) => {
            entries.push(`id: ${node.get_id()}, attrs: ${JSON.stringify(element)}`);
        });
        console.debug("Printing all nodes in graph: " + entries.join(', ') + ".");
    }
}

const graph = new Graph();

const node1 = new Node("node_1");
const node2 = new Node("node_2");
const node3 = new Node("node_3");

graph.add_node(node1, {"colour": "red", "size": 10});
graph.add_node(node2, {"colour": "blue", "shape": "circle"});
graph.add_node(node3, {"colour": "yellow", "line": "dotted"});

graph.remove_node(node1)

graph.add_node(node1, {"colour": "red"})
graph.add_node(node1, {"size": 10})
graph.add_node(node1, {"colour": "green"})


