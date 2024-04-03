#!/bin/bash

source ./venv/bin/activate

prompt=$1
uuid=$2

echo 'Prompt:' $prompt
echo 'UUID:' $uuid

# Run python Script
echo "Running script: prompt_rewriting.py $@"
python3 ./prompt_rewriting.py "$@"

# Move generated video
echo "Running copying all videos to khan-classes/"
find khan-classes/videos/ -type f -name "$uuid-video.mp4" -exec cp {} khan-classes \;

# Move generated audio 
echo 'Moving audio file'
find khan-classes -type f -name "*$uuid*-audio.mp3" -exec mv {} khan-classes/$uuid-audio.mp3 \;

exit 0

