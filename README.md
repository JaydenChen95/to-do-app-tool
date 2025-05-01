# Overview

A simple To do web app which allows user to add, edit, delete and restore deleted tasks. It also allows user to add other details such as priority an due date for each task. This app is generated with Vite.

# Usage

Before starting this app, make sure [to-do-app-backend](https://github.com/JaydenChen95/to-do-app-backend) is running locally first.

To start this app locally:
1. Ensure `npm` is installed
2. Run `npm ci`
3. Run `npm run dev`
4. Access the webapp through browser at http://localhost:5173

# Test

To run test, run `npm run test`.

# Build Image

To build docker image with `Dockerfile`, run `docker build -t to-do-app-tool .` at root directory.