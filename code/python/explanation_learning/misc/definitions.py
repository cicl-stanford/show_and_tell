from pathlib import Path


class Paths:
    ROOT = Path(__file__).parents[4]   # root of the whole repository
    DATA = ROOT.joinpath('data')            # data directory for this experiment
    CONFIG = ROOT / 'code/config.yaml'
