import {Node} from "./node";

require('log-timestamp');

// Learning experience, but I think this is a reasonably good start.
// Basically just trying to put a limit of some kind on the attribute values.
// Come back and do this better, it's deliberate loose for now.
export interface Attribute {
    [key: string]: string | number | boolean | null;
}

interface GraphInterface {
    add_node(node: Node, attrs?: Attribute): void;

    remove_node(node: Node): void;

    add_edge(node: Node, other: Node, attrs?: Attribute): void;

    remove_edge(node: Node, other: Node): void;

    has_node(node: Node): boolean;

    get_node(id: string): Node | undefined;

    get_node_attrs(node: Node): Attribute | undefined;

    get_nodes(): Map<Node, Attribute>;

    print_node(node: Node): void;

    print_nodes(): void;

    print_edges(): void;

    set_node_attrs(node: Node, attrs: Attribute): void;

    clear_node_attrs(node: Node): void;
}

export class Graph implements GraphInterface {

    private readonly _node: Map<Node, Attribute>;
    private readonly _adj: Map<Node, Map<Node, Attribute>>;

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
            const existing: Attribute = <Attribute>this._node.get(node);
            Object.assign(existing, attrs);
        }
        // console.debug(`Successfully added node ${node.get_id()}.`);
        return this._node.size;
    }

    // Returns the size of the node array.
    // This will need to be updated when we add edges to also completely remove the node from the adj list.
    remove_node(node: Node): number {
        if (!node) throw new Error("Node cannot be null or undefined!");
        if (!this._node.has(node)) throw new Error("Node not in graph!");

        console.warn(`Removing node ${node.get_id()} from graph.`);
        this._node.delete(node);
        this._adj.delete(node);

        // console.debug(`Successfully removed node ${node.get_id()}.`);
        return this._node.size;
    }

    has_node(node: Node): boolean {
        return this._node.has(node);
    }

    get_node(id: string): Node | undefined {
        for (let node of this._node.keys()) {
            if (node.get_id() === id) {
                return node;
            }
        }
        console.warn(`Node with id ${id} not found.`);
        return undefined;
    }

    get_node_attrs(node: Node): Attribute | undefined {
        if (!node) throw new Error("Node cannot be null or undefined!");
        if (!this._node.has(node)) throw new Error("Node not in graph!");
        return this._node.get(node);
    }

    get_nodes(): Map<Node, Attribute> {
        return this._node;
    }

    set_node_attrs(node: Node, attrs: Attribute): void {
        if (!node) throw new Error("Node cannot be null or undefined!");
        if (!this._node.has(node)) throw new Error("Node not in graph!");

        const currentAttrs = this._node.get(node);
        if (currentAttrs) {
            // Merge current attributes with new attributes
            Object.assign(currentAttrs, attrs);
            this._node.set(node, currentAttrs);
        }
        // console.debug(`Successfully updated attributes for node ${node.get_id()}.`);
    }


    clear_node_attrs(node: Node): void {
        if (!node) throw new Error("Node cannot be null or undefined!");
        if (!this._node.has(node)) throw new Error("Node not in graph!");
        this._node.set(node, {});
    }

    print_node(node: Node): void {
        if (!node) throw new Error("Node cannot be null or undefined!");
        if (!this._node.has(node)) throw new Error("Node not in graph!");
        const rec: Attribute | undefined = this._node.get(node);
        console.log(`node: ${node.get_id()}, attrs: ${JSON.stringify(rec)}.`);
    }

    print_nodes(): void {
        const entries: string[] = [];
        this._node.forEach((element: Attribute, node: Node) => {
            entries.push(`id: ${node.get_id()}, attrs: ${JSON.stringify(element)}`);
        });
        console.log("Printing all nodes in graph: " + entries.join(', ') + ".");
    }

    // Up for debate whether we allow node creation here. Allow for now.
    add_edge(node: Node, other: Node, attrs: Attribute = {}): void {
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

        // console.debug(`Successfully added edge between ${node.get_id()} and ${other.get_id()}.`);
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
        // console.debug(`Successfully removed edge between ${node.get_id()} and ${other.get_id()}!`);
    }

    get_edges(): Map<Node, Map<Node, Attribute>> {
        return this._adj;
    }

    print_edges(): void {
        const entries: string[] = [];
        this._adj.forEach((adjMap: Map<Node, Attribute>, node: Node) => {
            adjMap.forEach((attrs: Attribute, neighbor: Node) => {
                entries.push(`edge: ${node.get_id()} - ${neighbor.get_id()}, attrs: ${JSON.stringify(attrs)}`);
            });
        });
        console.log("Printing all edges in graph: " + entries.join(', ') + ".");
    }
}

