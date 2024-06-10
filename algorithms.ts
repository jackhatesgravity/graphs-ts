import { Attribute, Graph } from "./graph";
import { Node } from "./node";
import { Queue } from "./queue";
import { Stack } from "./stack";

const COLOUR_WHITE = "white";
const COLOUR_GREY = "grey";
const COLOUR_BLACK = "black";
const DISTANCE = "d";
const PREVIOUS = "pi";

const initialise_node = (graph: Graph, node: Node, distance: number, parent: Node | null): void => {
    graph.set_node_attrs(node, { colour: COLOUR_GREY, [DISTANCE]: distance, [PREVIOUS]: parent });
};

const finalise_node = (graph: Graph, node: Node): void => {
    graph.set_node_attrs(node, { colour: COLOUR_BLACK });
};

const process_neighbours = (
    graph: Graph,
    current: Node,
    neighbours: Map<Node, Attribute>,
    frontier: Queue<Node> | Stack<Node>,
    nodes: Map<Node, Attribute>
): void => {
    neighbours.forEach((_: Attribute, neighbour: Node): void => {
        if (nodes.get(neighbour)?.colour === COLOUR_WHITE) {
            initialise_node(graph, neighbour, (nodes.get(current)?.[DISTANCE] || 0) + 1, current);
            frontier.put(neighbour);
        }
    });
};

export const breadth_first_search = (graph: Graph, source_node: Node, sink_node: Node): void => {
    const nodes: Map<Node, Attribute> = graph.get_nodes();
    const edges: Map<Node, Map<Node, Attribute>> = graph.get_edges();
    initialise_node(graph, source_node, 0, null);

    const frontier: Queue<Node> = new Queue<Node>();
    frontier.put(source_node);

    while (!frontier.empty()) {
        const current: Node | undefined = frontier.get();
        const neighbours: Map<Node, Attribute> = edges.get(current);

        if (neighbours) {
            process_neighbours(graph, current, neighbours, frontier, nodes);
        }
        finalise_node(graph, current);
    }
};

export const depth_first_search = (graph: Graph, source_node: Node, sink_node: Node): void => {
    const nodes: Map<Node, Attribute> = graph.get_nodes();
    const edges: Map<Node, Map<Node, Attribute>> = graph.get_edges();
    initialise_node(graph, source_node, 0, null);

    const frontier: Stack<Node> = new Stack<Node>();
    frontier.put(source_node);

    while (!frontier.empty()) {
        const current: Node | undefined = frontier.get();
        const neighbours: Map<Node, Attribute> = edges.get(current);

        if (neighbours) {
            process_neighbours(graph, current, neighbours, frontier, nodes);
        }
        finalise_node(graph, current);
    }
};

export const reconstruct_path = (graph: Graph, start_node: Node, sink_node: Node, path: Node[]): void => {
    if (start_node === sink_node) {
        path.push(start_node);
    } else {
        const parent: string | number | boolean | null = graph.get_node_attrs(sink_node)[PREVIOUS];
        if (parent === null) {
            throw new Error(`There is no path between ${start_node.get_id()} and ${sink_node.get_id()}`);
        }
        reconstruct_path(graph, start_node, parent, path);
        path.push(sink_node);
    }
};
