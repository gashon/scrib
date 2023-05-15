#!/bin/bash

if [ -z "$1" ]; then
  echo "Please provide the environment variable name as an argument."
  exit 1
fi

TOKEN_NAME=$1
TOKEN_VALUE=${!TOKEN_NAME}

if [ -n "$TOKEN_VALUE" ]; then
  doppler run -t $TOKEN_VALUE -- $2
else
  doppler run -- $2
fi 
