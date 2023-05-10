# Python readme

## Installation
Some packages have different installation requirements depending
on the OS. See the following links for such packages.
- https://pygraphviz.github.io/documentation/stable/install.html

Once the OS-dependent packages are installed, initialize a
virtual environment.
```
conda create -n [ENV_NAME] python=3.9.7
conda activate [ENV_NAME]
pip install -r requirements.txt
conda develop .
``` 