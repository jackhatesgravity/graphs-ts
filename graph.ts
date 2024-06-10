import {Node} from "./node";

require('log-timestamp');

// Learning experience, but I think this is a reasonably good start.
// Basically just trying to put a limit of some kind on the attribute values.
// Come back and do this better, it's deliberate loose for now.
interface Attribute {
    [key: string]: string | number | boolean;
}

interface GraphInterface {
    add_node(node: Node, attrs?: Attribute): void;
    remove_node(node: Node): void;
    add_edge(node: Node, other: Node, attrs?: Attribute): void;
    remove_edge(node: Node, other: Node): void;
    has_node(node: Node): boolean;
    print_nodes(): void;
    print_edges(): void;
}

export class Graph implements GraphInterface {

    private _node: Map<Node, Attribute>;
    private _adj: Map<Node, Map<Node, Attribute>>;

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

    has_node(node: Node): boolean {
        return this._node.has(node);
    }

    print_nodes(): void {
        const entries: string[] = [];
        this._node.forEach((element: Attribute, node: Node) => {
            entries.push(`id: ${node.get_id()}, attrs: ${JSON.stringify(element)}`);
        });
        console.debug("Printing all nodes in graph: " + entries.join(', ') + ".");
    }

    // Up for debate whether we allow node creation here. Allow for now.
    add_edge(node: Node, other: Node, attrs?: Attribute): void {
        if (!this.has_node(node)) {
            console.warn(`Node ${node.get_id()} not in graph. Adding...`);
            this.add_node(node);
        }
        if (!this.has_node(other)) {
            console.warn(`Node ${other.get_id()} not in graph. Adding...`);
            this.add_node(other);
        }

        this._adj.get(node)!.set(other, attrs);
        this._adj.get(other)!.set(node, attrs);

        console.debug(`Successfully added edge between ${node.get_id()} and ${other.get_id()}.`);
    }

    remove_edge(node: Node, other: Node): void {
        if (this._adj.get(node)?.has(other)) {
            this._adj.get(node)!.delete(other);
        }
        if (node !== other && this._adj.get(other)?.has(node)) {
            this._adj.get(other)!.delete(node);
        } else {
            throw new Error("Edge is not in the graph!");
        }
        console.debug(`Successfully removed edge between ${node.get_id()} and ${other.get_id()}!`);
    }

    print_edges(): void {
        const entries: string[] = [];
        this._adj.forEach((adjMap: Map<Node, Attribute>, node: Node) => {
            adjMap.forEach((attrs: Attribute, neighbor: Node) => {
                entries.push(`edge: ${node.get_id()} - ${neighbor.get_id()}, attrs: ${JSON.stringify(attrs)}`);
            });
        });
        console.debug("Printing all edges in graph: " + entries.join(', ') + ".");
    }
}

