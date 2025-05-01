# Overview

A simple To do web app which allows user to add, edit, delete and restore deleted tasks. It also allows user to add other details such as priority an due date for each task. This app is generated with Vite.

# Run Locally
## Prerequisite
Before starting this app, make sure [to-do-app-backend](https://github.com/JaydenChen95/to-do-app-backend) is running locally first.

## Usage
To start this app locally:
1. Ensure `npm` is installed
2. Run `npm install`
3. Run `npm run dev`
4. Access the webapp through browser at http://localhost:5173

# Test

To run test, run `npm run test`.

# Build Docker Image
## Prerequisite
Ensure `docker` is installed and running

## Build
To build docker image with `Dockerfile`, run `docker build -t {IMAGE_NAME} .` at root directory.

# Things to take note

1. This app is currently only able to work locally even after building the docker image. This is because URL mapping is still in `localhost`.
2. This app is currently not deployable to any cloud provider.