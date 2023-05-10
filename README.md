# Getting started

First, make sure that `conda` and `npm` are installed.
- Install Anaconda from https://docs.anaconda.com/anaconda/install/index.html
- Install npm from https://docs.npmjs.com/

Whenever terminal commands are used, I use `~` to refer to the repo root, not `home`.
Don't just blindly copy the commands since the pathing won't work.

## AWS

This is only relevant if using AWS to host the experiment. Other cloud services may have similar requirements.

Go to `Security Groups` under `Network & Security`.
Whatever security group is being used for the server, add ports `3000` and `5001` to inbound rules.
`3000` is used by the React server.
`5001` is used by the Python flask server.

## Virtual environment

Create and initialize the Python virtual environment using

```
conda create -n explearn python=3.10.8
conda activate explearn
cd ~/code/python/
pip install -r requirements.txt
conda develop .
```

To allow Jupyter Notebook to use the venv as its kernel, run
```
conda activate explearn
python -m ipykernel install --user --name=explearn
```

## React server

Install the react server using

```
cd ~/code/experiment
npm install
export NODE_OPTIONS=--openssl-legacy-provider
```

## Configs

The config file can be found at `~/code/config.yaml`.
To run the program locally, set `host_url: localhost`.
To run it on a server, set `host_url: [[YOUR SERVER PUBLIC IP]]`.

## Run

The experiment requires running two separate programs.
You can run a separate instance of terminal manually for each program.
Alternatively, you can use [screen](https://www.gnu.org/software/screen/manual/screen.html)
or [tmux](https://github.com/tmux/tmux/wiki).

Run the Python flask server using
```
cd ~/code/python/scripts/
python rest_api_endpoint.py
```

Run the React server using
```
cd ~/code/experiment/
npm start
```

Both of these servers are run in development mode, which is recommended when developing or testing the program.
Unless you plan to run the experiment at a large scale, the development mode works fine in practice, even when deployed for live data collection.
If you care about performance, you can always `build` the program first.

**Important**: In order to maintain a single source of truth for the configs, the Python flask server copies the contents of `~/code/config.yaml` to
`~/code/experiment/public/data/config.json`. This means that if you change `config.yaml`, you must run the Python server *before* running the React server.

## Storing data

The front-end sends a POST request every minute and after every milestone (e.g. after a set of trials) to the Python server,
which then dumps the entire contents as a JSON file to `~/data/raw`.

There has been issues of some data loss in Experiment 1, where about 4% of all participants (including pilots) were lost.
This only happened during the full data collection of ~150 participants, which leads me to believe there are some traffic-related issues,
though I'm not sure if this is due to buggy code, OS IO throughput, network issues, user-end issues, etc.
In any case, it is advised to run the experiment in smaller batches if possible to avoid these issues.

