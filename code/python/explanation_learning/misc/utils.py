import networkx as nx
import itertools
import string
from datetime import datetime, timezone
import pandas as pd


def all_possible_dags(num_nodes):
    """
    See https://stackoverflow.com/questions/52231686/python-code-to-enumerate-over-all-acyclic-digraphs-with-5-nodes
    """
    all_edges = list(itertools.combinations(string.ascii_uppercase[:num_nodes], 2))
    for p in itertools.product([None, 1, -1], repeat=len(all_edges)):
        G = nx.DiGraph()
        G.add_nodes_from(string.ascii_uppercase[:num_nodes])
        edges = [edge[::edge_dir] for edge, edge_dir in zip(all_edges, p) if edge_dir]
        G.add_edges_from(edges)
        if nx.is_directed_acyclic_graph(G):
            yield G


def flatten(list_of_lists):
    """
    Flattens a list of lists into a single list
    """
    return [item for sublist in list_of_lists for item in sublist]


def parse_timestamp(timestamp: str):
    """
    Parses the timestamp format that was used by javascript
    """
    timestamp = datetime.strptime(timestamp, '%Y-%m-%d %H:%M:%S:%f (%z)')
    return timestamp.astimezone(tz=None)


def move_column(df: pd.DataFrame, column: str, position: int):
    """
    Moves a column from its current position to the specified position
    :param df:
    :param column:
    :param position:
    :return:
    """
    col = df.pop(column)
    df.insert(position, column, col)
