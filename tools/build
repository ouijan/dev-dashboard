#!/bin/bash

function find_base_dir {
    local real_path=$(python -c "import os,sys;print os.path.realpath('$0')")
    local dir_name="$(dirname "$real_path")"
    BASEDIR="${dir_name}/.."
}

find_base_dir

image_name="dev-dashboard"
docker_registry="docker-registry.digitalpacific.com.au:443"

docker build -t $image_name --rm --no-cache $BASEDIR
docker tag $image_name $docker_registry/$image_name
docker push $docker_registry/$image_name
