import networkx as nx
import numpy as np
from discrete_probabilistic_model import ProbModel
from .explanation import Explanation


class CausalGraphModel(ProbModel):

    def __init__(self, graph, p_root, p_nonroot, p_edge, show_activations: bool, show_explanations: bool, seed=None):
        super().__init__(seed=seed)
        self.graph = graph
        self.p_root = p_root
        self.p_nonroot = p_nonroot
        self.p_edge = p_edge
        self.show_activations = show_activations
        self.show_explanations = show_explanations

        self.possible_explanations = Explanation.create_all_possible_explanations(graph.nodes)

    def forward(self):
        graph = self.graph.copy()

        # Self-activations
        nodes = np.array(graph.nodes)
        node_indices = {n: i for i, n in enumerate(nodes)}

        p_activate = [self.p_root if graph.in_degree[n] == 0 else self.p_nonroot for n in nodes]
        node_activations = self.bernoulli('nodes', p_activate)

        # Remove incoming edges to self-activated nodes
        drop_edges = list(graph.in_edges(nodes[node_activations]))
        graph.remove_edges_from(drop_edges)

        # Edge-activations
        if len(graph.edges) > 0:
            edge_activations = self.bernoulli('edges', self.p_edge, size=len(graph.edges))
            drop_edges = [edge for edge, active in zip(graph.edges, edge_activations) if not active]
            graph.remove_edges_from(drop_edges)

        # Activation propagation
        descendants = {n: nx.descendants(graph, n) for n in graph.nodes}
        active_desc = set().union(*[descendants[n] for n in nodes[node_activations]])
        if active_desc:
            desc_ids = np.array([node_indices[n] for n in active_desc])
            node_activations[desc_ids] = True

        active_nodes = tuple(nodes[node_activations])
        if not self.show_explanations:
            return active_nodes

        # Explanations
        explanations = []
        for exp in self.possible_explanations:
            n1_active = node_activations[node_indices[exp.node1]]
            n2_active = node_activations[node_indices[exp.node2]]
            is_descendant = exp.node2 in descendants[exp.node1]
            if exp.is_valid(n1_active, n2_active, is_descendant):
                explanations.append(exp)

        explanation = self.categorical('explanation', categories=explanations)

        if self.show_activations:
            return active_nodes, explanation
        return explanation
