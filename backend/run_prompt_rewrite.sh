#!/bin/bash
set -e

source ./venv/bin/activate

python3 ./prompt_rewriting.py "$@"
video_file=$(find khan-classes/ -type f -name "$2*.mp4")
cp $video_file khan-classes/

exit 0
