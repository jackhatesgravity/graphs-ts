import { Stack } from './stack';
import { Queue } from './queue';

class Node {
    private readonly _id: string;
    constructor(id: string) {this._id = id}
    get_id() {return this._id;}
}

class Edge {
    private _attrs: Record<string, any>;

    constructor(attrs: Record<string, any> = {}) {
        this._attrs = attrs;
    }

    get_attrs() {
        return this._attrs;
    }

    update_attrs(attrs: Record<string, any>) {
        Object.assign(this._attrs, attrs);
    }

    // Should we return anything here?
    clear_attrs(): void {
        this._attrs = null;
    }
}

interface GraphInterface {
    add_node(node: Node, attrs?: Record<string, any>): void;
    remove_node(node: Node): void;
    add_edge(u: Node, v: Node, attrs?: Record<string, any>): void;
    remove_edge(u: Node, v: Node): void;
    has_node(node: Node): boolean;
    print_nodes(): void;
}

class Graph implements GraphInterface {

    private _node: Map<Node, Record<string, any>>;
    private _adj: Map<Node, Map<Node, Edge>>;

    constructor() {
        this._node = new Map();
        this._adj = new Map();
    }

    add_node(node: Node, attrs: Record<string, any> = {}): void {
        if (!node) {
            throw new Error("Node cannot be null or undefined!");
        }

        if (!this._node.has(node)) {
            this._node.set(node, attrs);
            this._adj.set(node, new Map());
        } else {
            const existingAttrs = this._node.get(node);
            Object.assign(existingAttrs, attrs);
        }
    }

    remove_node(): Node {
        throw new Error('Method not implemented.');
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

    print_nodes(): void {
        this._node.forEach((_, node: Node) => {
            console.log(node.get_id());
        });
    }
}

const graph = new Graph();
const node1 = new Node("node_1");
const node2 = new Node("node_2");
const node3 = new Node("node_3");

graph.add_node(node1);
graph.add_node(node2);
graph.add_node(node3);

graph.print_nodes();