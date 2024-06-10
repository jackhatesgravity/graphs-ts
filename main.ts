import { Graph } from "./graph";
import { Node } from "./node";

const graph = new Graph();

const node1 = new Node("node_1");
const node2 = new Node("node_2");
const node3 = new Node("node_3");

graph.add_node(node1);
graph.add_node(node2);
graph.add_node(node3);

graph.add_edge(node1, node2, {"weight": 10});
graph.add_edge(node1, node3, {"weight": 9});
graph.add_edge(node2, node3, {"weight": 13});
graph.print_edges();

graph.remove_edge(node2, node3);
graph.print_edges();

graph.add_edge(node2, node3, {"weight": "14"});
graph.print_edges();