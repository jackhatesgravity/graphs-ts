import {Graph} from "./graph";
import {Node} from "./node";
import {bf_search, depth_first_search, reconstruct_path} from "./algorithms";

const graph: Graph = new Graph();

// Programmatically make nodes using an example graph from CLRS.
const node_string: string = "rstuvwxyz";
const nodes: Node[] = [];

for (const char of node_string) {
    let new_node: Node = new Node(char);
    nodes.push(new_node);
    graph.add_node(new_node);
}

// Mildly convoluted method for adding edges programmatically.
// This suggests a flaw in my class code that needs to be rectified. Bulk adding nodes and edges, specifically.
const edges: string[][] = [
    ["s", "r"],
    ["s", "v"],
    ["s", "u"],
    ["t", "r"],
    ["t", "u"],
    ["y", "u"],
    ["y", "v"],
    ["y", "x"],
    ["w", "r"],
    ["w", "v"],
    ["w", "x"],
    ["w", "z"],
    ["x", "z"]
];

// Decided to disallow just creating nodes if they didn't exist, deviating from NetworkX implementation.
for (const [char1, char2] of edges) {
    const node1: Node | undefined = graph.get_node(char1);
    const node2: Node | undefined = graph.get_node(char2);
    if (node1 && node2) {
        graph.add_edge(node1, node2);
    } else {
        console.error(`Nodes ${char1} or ${char2} not found in the graph!`);
    }
}

// This is much nicer, but that lingering 'undefined' is going to kill me.
const source_node: Node | undefined = graph.get_node("s");
const sink_node: Node | undefined = graph.get_node("z");

// Driver code for BFS.
// I think TS uses pass-by-ref, so I should be able to modify nodes externally and see it reflected in the graph.
for (const node of nodes) {
    graph.set_node_attrs(node, {"colour": "white", "d": Number.MAX_SAFE_INTEGER, "pi": null});
}
bf_search(graph, <Node>source_node, <Node>sink_node);
let shortest_path: Node[] = [];
reconstruct_path(graph, <Node>source_node, <Node>sink_node, shortest_path);
// These undefined's are going to be the death of me.
console.log("BFS: " + JSON.stringify(shortest_path));

// Driver code for DFS.
for (const node of nodes) {
    graph.set_node_attrs(node, {"colour": "white", "d": Number.MAX_SAFE_INTEGER, "pi": null});
}
depth_first_search(graph, <Node>source_node, <Node>sink_node);
shortest_path = [];
reconstruct_path(graph, <Node>source_node, <Node>sink_node, shortest_path);
console.log("DFS: " + JSON.stringify(shortest_path));