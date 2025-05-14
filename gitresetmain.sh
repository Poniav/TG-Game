#!/bin/bash

git checkout main
git reset --hard main
current_date_time=$(date +"deploy_ext_%Y-%m-%d_%H-%M-%S")
git tag $current_date_time
git push --force
git push --tags
git checkout develop
echo "MAIN is now sync with DEVELOP"