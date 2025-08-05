#!/bin/sh

set -e

# Generate types
echo "Starting Internal API types generation"
npx openapi-generator-cli generate -i http://localhost:8081/docs -g typescript-fetch -o ./src/types/internal-api --additional-properties=modelPropertyNaming=original
echo "Finished Internal API types generation"

# Clean result
# echo "Starting cleanup"
# cd ./src/types/internal-api

# find . -mindepth 1 -maxdepth 1 ! -name "models" -exec rm -rf {} +

# cd - > /dev/null

# echo "Finished cleanup"