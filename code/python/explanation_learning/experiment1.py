import pandas as pd
import networkx as nx
import numpy as np
from discrete_probabilistic_model import ProbModel
from frozendict import frozendict

from .causal_graph_model import CausalGraphModel
from .explanation import Explanation
from .misc import MinSampler, utils


def make_graph(edges):
    graph = nx.DiGraph()
    graph.add_nodes_from(['A', 'B', 'C'])
    graph.add_edges_from(edges)
    return graph


def get_df_p_edges(models, observations):
    """
    models: list of models
    observations: list of observations with format
        {'activations': {'A': bool, 'B': bool, 'C': bool},
         'explanation': Explanation}
    """
    posteriors = ProbModel.get_model_posteriors(models, observations)

    rows = []
    for edge in [('A', 'B'), ('A', 'C'), ('B', 'C')]:
        model_idx = [i for i, model in enumerate(models) if edge in model.graph.edges]
        p_forward = posteriors[:, model_idx].sum(-1)
        model_idx = [i for i, model in enumerate(models) if edge[::-1] in model.graph.edges]
        p_backward = posteriors[:, model_idx].sum(-1)
        p_none = 1 - p_forward - p_backward
        for obs_idx, p_n, p_f, p_b in zip(range(len(p_forward)), p_none, p_forward, p_backward):
            row = {'obsIndex': obs_idx, 'edge': f"{edge[0]}{edge[1]}", 'p_none': p_n, 'p_forward': p_f,
                   'p_backward': p_b}
            rows.append(row)
    df = pd.DataFrame(rows)
    return df.sort_values(['obsIndex', 'edge']).reset_index(drop=True)


class Experiment1:

    def __init__(self, config, graph_types, tutorial):
        """
        config is read from ~/config.yaml
        graph_types is read from ~/data/graph_types.json
        tutorial is read from ~/data/tutorial.json
        """
        self.config = config
        self.tutorial = tutorial
        self.graphs = self.init_graphs(graph_types)
        self.condition_sampler = MinSampler([frozendict(showActivations=a, showExplanations=e)
                                             for a, e in [(True, True), (True, False), (False, True)]])

    @property
    def p_root(self):
        return self.config['p_root']

    @property
    def p_nonroot(self):
        return self.config['p_nonroot']

    @property
    def p_edge(self):
        return self.config['p_edge']

    @property
    def num_observations(self):
        return self.config['num_observations']

    def init_graphs(self, graph_types):
        graphs = {}
        for graph_type, edges in graph_types.items():
            graphs[graph_type] = [make_graph(e) for e in edges]
        return graphs

    def create_stimuli(self, seed=None):
        """
        Generates trial data, which is a list of dicts with the following format
        {
            'graph_type': str,
            'edges': [tuples],
            'ab': 'forward' | 'backward' | 'none'
            'ac': 'forward' | 'backward' | 'none'
            'bc': 'forward' | 'backward' | 'none'
            'trials': [{'activations': {'A': bool, 'B': bool, 'C': bool},
                        'explanation': {'node1': str, 'node2': str, 'nodes_active': bool, 'cause': bool}]
        }
        """
        rng = np.random.default_rng(seed)

        trials = []
        for graph_type, graphs in self.graphs.items():
            graph = graphs[rng.integers(len(graphs))]
            model = CausalGraphModel(graph,
                                     self.p_root,
                                     self.p_nonroot,
                                     self.p_edge,
                                     show_activations=True,
                                     show_explanations=True,
                                     seed=seed)
            observations = model.sample(self.num_observations)
            observations = [{'activations': {'A': 'A' in o,
                                             'B': 'B' in o,
                                             'C': 'C' in o},
                             'explanation': a.__dict__}
                            for o, a in observations]
            trials.append({'graph_type': graph_type,
                           'edges': list(graph.edges),
                           'ab': 'forward' if ('A', 'B') in graph.edges else (
                               'backward' if ('B', 'A') in graph.edges else 'none'),
                           'ac': 'forward' if ('A', 'C') in graph.edges else (
                               'backward' if ('C', 'A') in graph.edges else 'none'),
                           'bc': 'forward' if ('B', 'C') in graph.edges else (
                               'backward' if ('C', 'B') in graph.edges else 'none'),
                           'observations': observations})
        return trials

    def create_experiment_data(self, seed=None):
        return {
            'seed': seed,
            'graph_params': {
                'p_root': self.p_root,
                'p_nonroot': self.p_nonroot,
                'p_edge': self.p_edge
            },
            'tutorial': self.tutorial,
            'trials': self.create_stimuli(seed)
        }

    def get_posteriors(self, trials, show_activations, show_explanations):
        """
        Returns a dataframe containing the posterior probabilities of each edge for each trial
        """
        df_posteriors = []
        graphs = utils.flatten([g for g in self.graphs.values()])
        models = [CausalGraphModel(graph, self.p_root, self.p_nonroot, self.p_edge,
                                   show_activations=show_activations, show_explanations=show_explanations)
                  for graph in graphs]
        for trial_set in trials:
            observations = []
            for trial in trial_set['observations']:
                activations = trial['activations']
                activations = tuple(k for k in activations if activations[k])
                explanation = trial['explanation']
                explanation = Explanation(**explanation)

                if show_activations and show_explanations:
                    observations.append((activations, explanation))
                elif show_activations:  # activation only
                    observations.append(activations)
                else:  # explanation_only
                    observations.append(explanation)

            df = get_df_p_edges(models, observations)
            df['graphType'] = trial_set['graph_type']
            df_posteriors.append(df)

        df_posteriors = pd.concat(df_posteriors)
        df_posteriors = df_posteriors.sort_values(['graphType', 'obsIndex', 'edge']).reset_index(drop=True)
        return df_posteriors

    def get_optimal_responses(self, df_posteriors, seed=None):
        """
        Returns a dataframe containing the model's edge responses based on the posterior probabilities.
        """
        rng = np.random.default_rng(seed)
        df_optimal = []
        response_types = np.array(['none', 'forward', 'backward'])
        for group, df in df_posteriors.groupby(['graphType', 'edge']):
            responses_sample = [rng.choice(response_types, p=p / p.sum()) for p in
                                df[['p_none', 'p_forward', 'p_backward']].values]
            responses_max = ['none']
            probs = df[['p_none', 'p_forward', 'p_backward']].values
            for p in probs[1:]:
                options = response_types[p == p.max()]
                if responses_max[-1] in options:
                    response = responses_max[-1]
                else:
                    response = rng.choice(options)
                responses_max.append(response)
            df['response_sample'] = responses_sample
            df['response_max'] = responses_max
            df_optimal.append(df)
        return pd.concat(df_optimal)
