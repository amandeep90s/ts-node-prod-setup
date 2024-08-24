# Typescript Node Production App Setup

## Docker Commands for development

`docker build -t backend-app:dev -f docker/development/Dockerfile .`

`docker run --rm -it -v ${PWD}"/usr/src/backend-app -v /usr/src/backend-app/node_modules -p 3000:3000 backend-app:dev`

## Docker Commands for production

`docker build -t backend-app:dev -f docker/production/Dockerfile .`

`docker run --rm -d -v ${PWD}"/usr/src/backend-app -v /usr/src/backend-app/node_modules -p 3000:3000 backend-app:1.0.0`

## Npm check updates

Install dependency globally in your system by following command

`npm i npm-check-updates`

For checking the outdated dependecies `ncu`

For updating the packages `ncu -u`
