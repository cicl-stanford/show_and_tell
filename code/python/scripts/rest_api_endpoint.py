from flask import Flask, request
from flask_restful import Api
from flask_cors import CORS
from pathlib import Path
import yaml
import json
from datetime import datetime
import hashlib

from explanation_learning.misc import Paths, MinSampler
from explanation_learning import Experiment1

app = Flask(__name__)
api = Api(app)
CORS(app)


@app.route('/', methods = ['GET'])
def main():
    seed = request.args.get('seed', default=None, type=str)
    seed = abs(hash(seed))
    data = experiment.create_experiment_data(seed)

    condition = condition_sampler.sample()
    show_activations = condition != 'explanations_only'
    show_explanations = condition != 'activations_only'
    data['conditions'] = {
        'condition': condition,
        'showActivations': show_activations,
        'showExplanations': show_explanations,
    }
    return data, 200


@app.route('/save', methods = ['POST'])
def post_experiment():
    savedir = Paths.DATA / 'raw' / config['experiment_name'] / datetime.now().strftime("%Y%m%d")
    try:
        return post(request.json, savedir), 200
    except Exception as e:
        return str(e), 400


def post(data: dict, savedir):
    """
    Saves the data to savedir.
    The POST payload must be a dict with the format
        {'filename': str, 'content': str}
    If the write operation is successful, returns an MD5 of the content.
    Data should be saved above the level of the git repo so that commits do not upload PID info to git.
    """
    if 'filename' not in data or 'content' not in data:
        raise Exception("POST data must contain fields 'filename' and 'content'.")

    filepath = Path(savedir) / data['filename']
    filepath.parent.mkdir(parents=True, exist_ok=True)

    print(f"[{datetime.now()}] Saving to: {filepath}")
    filepath.open('w').write(data['content'])
    read_text = filepath.read_text()
    return hashlib.md5(read_text.encode()).hexdigest()


if __name__ == '__main__':
    # Load configs.yaml
    with Paths.CONFIG.open() as f:
        config = yaml.safe_load(f)
    (Paths.ROOT / 'code/experiment/public/config.json').open('w').write(json.dumps(config))

    # Load graph_types.json
    with open(Paths.DATA / 'experiments/exp1/graph_types.json') as f:
        graph_types = json.load(f)

    # Load tutorial.json
    with open(Paths.DATA / 'experiments/exp1/tutorial.json') as f:
        tutorial = json.load(f)

    experiment = Experiment1(config, graph_types, tutorial)
    condition_sampler = MinSampler(['activations_only', 'explanations_only', 'both'])
    app.run(debug=True, host='0.0.0.0', port=config['flask_port'])
