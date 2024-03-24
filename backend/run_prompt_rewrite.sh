#!/bin/bash

eval "$(/usr/libexec/path_helper)"
source ./venv/bin/activate

topic=$1
video_uuid=$2

echo 'Topic:' $topic
echo 'video_uuid:' $video_uuid

python3 ./prompt_rewriting.py "$@"

video_file=$(find khan-classes/ -type f -name "$video_uuid*.mp4")
cp $video_file khan-classes/

original="$video_uuid-audio.mp3"
newname="${original//\"/}"
echo "original:" $original
echo "newname:" $newname
mv khan-classes/$original khan-classes/$newname

exit 0

# echo ./prompt_rewriting.py "$@"
# sleep 2
