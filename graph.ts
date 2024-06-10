import { Stack } from './stack';
import { Queue } from './queue';

class Node {
    private _id: string;
    private _attrs: object; // How do we type constrain attributes? Should we?
}

// I feel like these two shouldn't be identical? On paper they might be, though.
class Edge {
    private _id: string;
    private _attrs: object;
}

// Attributes remain fairly tricky in terms of type enforcement...
// Yeah, okay, more time is needed, but it basically is just a TypedDict, yeah?

interface GraphInterface {
    add_node(node: Node): number; // Returns length of node array.
    remove_node(): Node; // Returns the removed node.
    add_edge(node: Node, other: Node): Edge; // Returns the created edge?
    remove_edge(node: Node, other: Node): Edge; // Returns the removed edge.
    has_node(node: Node): boolean; // Returns true if node in graph.
}

class Graph implements GraphInterface {

    private _nodes: Node[];
    private _adj: Edge[];

    add_node(node: Node): number {
        throw new Error('Method not implemented.');
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
}