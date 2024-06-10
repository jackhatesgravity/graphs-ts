import { Graph, Attribute } from "./graph";
import { Node } from "./node";
import { Queue } from "./queue";
import { Stack } from "./stack";

const breadth_first_search = (graph: Graph, source: Node, sink: Node): void => {
   const nodes: Map<Node, Attribute> = graph.get_nodes(); // Please be a reference...
   const edges: Map<Node, Map<Node, Attribute>> = graph.get_edges(); // P l e a s e .
   graph.set_node_attrs(source, { "colour": "grey", "d": 0, "pi": null } );
   const frontier: Queue<Node> = new Queue();
   frontier.put(source);

   while (!frontier.empty()) {
      const current: Node = frontier.get();
      const neighbours: Map<Node, Attribute> = edges.get(current);

      if (neighbours) {
         for (const [neighbour, attrs] of neighbours) {
            const neighbourNode = neighbour;
            const neighbourAttrs = nodes.get(neighbourNode);

            if (neighbourAttrs && neighbourAttrs["colour"] === "white") {
               graph.set_node_attrs(neighbourNode, { "colour": "grey", "d": (nodes.get(current)?.["d"] + 1) || 0, "pi": current });
               frontier.put(neighbourNode);
            }
         }
      }
      graph.set_node_attrs(current, { "colour": "black" });
   }
}

const reconstruct_path = (graph: Graph, source: Node, sink: Node, path: Node[]): void => {
   if (source === sink) {
      path.push(source);
   } else if (graph.get_node_attrs(sink)["pi"] === null) {
      throw new Error(`There is no path between ${source.get_id()} and ${sink.get_id()}`);
   } else {
      reconstruct_path(graph, source, graph.get_node_attrs(sink)["pi"], path);
      path.push(sink);
   }
}

const graph = new Graph();

// Programmatically make nodes using an example graph from CLRS.
const node_string = "rstuvwxyz";
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

// I think TS uses pass-by-ref, so I should be able to modify nodes externally and see it reflected in the graph.
for (const node of nodes) {
   graph.set_node_attrs(node, { "colour": "white", "d": Number.MAX_SAFE_INTEGER, "pi": null });
}

// Again, I need to have a think about how I'm actually storing the nodes.
// This is not an elegant way of accessing information when required, but I also want to have some kind of safety net.
// const source_node_idx: number = node_string.indexOf("s");
// const sink_node_idx: number = node_string.indexOf("z");
// const source_node: Node = nodes[source_node_idx];
// const sink_node: Node = nodes[sink_node_idx];

// This is much nicer, but that lingering 'undefined' is going to kill me.
const source_node: Node | undefined = graph.get_node("s");
const sink_node: Node | undefined = graph.get_node("z");

if (source_node && sink_node) {
   breadth_first_search(graph, source_node, sink_node);
} else {
   console.warn("Source or Sink node not found in the graph");
}

let shortest_path: Node[] = [];
reconstruct_path(graph, source_node, sink_node, shortest_path);
// These undefined's are going to be the death of me.
console.log(shortest_path);