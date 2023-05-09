#!/bin/bash

app_directories=("apps/api" "apps/web")

for dir in "${app_directories[@]}"; do
  echo "Setting up doppler for $dir"
  (
    cd $dir || exit
    doppler setup --no-interactive
  )
done