# Experiment 1

## Set up

This set-up code uses the name `el_exp1` for the conda environment.

```
conda create -n el_exp1 python=3.10
conda activate el_exp1
conda develop python
pip install -r requirements.txt

cd reactapp
npm install
```

## Deployment

This deployment uses `localhost` as the host, which means it is not publicly accessible.
To deploy for public use, set `host_url` in `config.yaml` to the machine's publicly accessible IP address or a valid URL.

This program requires a Python server and a React server to be running simultaneously.
Please use `screen`, `tmux`, two terminal instances, etc. such that both servers can be running.
The Python server generates a copy of `config.yaml` for the React server to use, so it is recommend that you launch the Python server before you launch the React server, and that you restart the Python server any time you change `config.yaml`.

Both deployment code snippets assume you are starting from this directory (`~/experiments/exp1`).
The test code assumes that `flask_port` is `5001` and `react_port` is `3000` in `config.yaml`.

### Python server deployment
```
conda activate el_exp1
python python/scripts/rest_api_endpoint.py
```

You should be able to see some json at `localhost:5001` on your web browser.

### React server deployment
```
cd reactapp
npm start
```

If both Python and React servers are running, you should see the experiment at `localhost:3000` on your web browser.
