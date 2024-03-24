#!/bin/bash
set -e

source ./venv/bin/activate

echo ./prompt_rewriting.py "$@"
python3 ./prompt_rewriting.py "$@"

exit 0
