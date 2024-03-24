#!/bin/bash
set -e

source ./venv/bin/activate

python3 ./prompt_rewriting.py "$@"

exit 0
