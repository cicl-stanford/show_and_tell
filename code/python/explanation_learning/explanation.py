import itertools


class Explanation:

    def __init__(self, node1: str, node2: str, nodes_active: bool, cause: bool):
        self.node1 = node1
        self.node2 = node2
        self.nodes_active = nodes_active
        self.cause = cause

    @classmethod
    def create_all_possible_explanations(cls, nodes):
        explanations = [Explanation(n1, n2, na, c) for n1, n2, na, c in
                        itertools.product(nodes, nodes, [True, False], [True, False]) if n1 != n2]
        return explanations

    def is_valid(self, node1_active, node2_active, is_descendant):
        """
        is_descendant: whether node2 is a descendant of node1 in a pruned graph
            where a pruned graph has in-edges for self-activated nodes removed and inactive edges removes
        """
        if node1_active != node2_active:
            return False
        if self.nodes_active != node1_active:
            return False
        return self.cause == is_descendant

    def __hash__(self):
        return hash((self.node1, self.node2, self.nodes_active, self.cause))

    def __eq__(self, other):
        return str(self) == str(other)

    def __str__(self):
        if self.nodes_active:
            return f"{self.node1} {'->' if self.cause else '-/>'} {self.node2}"
        else:
            return f"-{self.node1} {'->' if self.cause else '-/>'} -{self.node2}"

    def __repr__(self):
        return f"Explanation: {self}"
