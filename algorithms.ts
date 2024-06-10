import {Attribute, Graph} from "./graph";
import {Node} from "./node";
import {Queue} from "./queue";
import {Stack} from "./stack";

export const breadth_first_search = (graph: Graph, source: Node, sink: Node): void => {
    const nodes: Map<Node, Attribute> = graph.get_nodes(); // Please be a reference...
    const edges: Map<Node, Map<Node, Attribute>> = graph.get_edges(); // P l e a s e .
    graph.set_node_attrs(source, {"colour": "grey", "d": 0, "pi": null});
    const frontier: Queue<Node> = new Queue();
    frontier.put(source);

    while (!frontier.empty()) {
        const current: Node = frontier.get();
        const neighbours: Map<Node, Attribute> = edges.get(current);

        if (neighbours) {
            for (const [neighbour, attrs] of neighbours) {
                const neighbour_node = neighbour;
                const neighbour_attrs = nodes.get(neighbour_node);

                if (neighbour_attrs && neighbour_attrs["colour"] === "white") {
                    graph.set_node_attrs(neighbour_node, {
                        "colour": "grey",
                        "d": (nodes.get(current)?.["d"] + 1) || 0,
                        "pi": current
                    });
                    frontier.put(neighbour_node);
                }
            }
        }
        graph.set_node_attrs(current, {"colour": "black"});
    }
}

export const depth_first_search = (graph: Graph, source: Node, sink: Node): void => {
    const nodes: Map<Node, Attribute> = graph.get_nodes(); // Please be a reference...
    const edges: Map<Node, Map<Node, Attribute>> = graph.get_edges(); // P l e a s e .
    graph.set_node_attrs(source, { "colour": "grey", "d": 0, "pi": null } );
    const frontier: Stack<Node> = new Stack();
    frontier.put(source);

    while (!frontier.empty()) {
        const current: Node = frontier.get();
        const neighbours: Map<Node, Attribute> = edges.get(current);

        if (neighbours) {
            for (const [neighbour, attrs] of neighbours) {
                const neighbour_node = neighbour;
                const neighbour_attrs = nodes.get(neighbour_node);

                if (neighbour_attrs && neighbour_attrs["colour"] === "white") {
                    graph.set_node_attrs(neighbour_node, { "colour": "grey", "d": (nodes.get(current)?.["d"] + 1) || 0, "pi": current });
                    frontier.put(neighbour_node);
                }
            }
        }
        graph.set_node_attrs(current, { "colour": "black" });
    }
}

export const reconstruct_path = (graph: Graph, source: Node, sink: Node, path: Node[]): void => {
    if (source === sink) {
        path.push(source);
    } else if (graph.get_node_attrs(sink)["pi"] === null) {
        throw new Error(`There is no path between ${source.get_id()} and ${sink.get_id()}`);
    } else {
        reconstruct_path(graph, source, graph.get_node_attrs(sink)["pi"], path);
        path.push(sink);
    }
}