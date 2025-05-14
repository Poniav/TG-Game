#!/bin/bash

git checkout develop
git reset --hard develop
current_date_time=$(date +"deploy_ext_%Y-%m-%d_%H-%M-%S")
git tag $current_date_time
git push --force
git push --tags
git checkout main
echo "DEV is now sync with MAIN"