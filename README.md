# Scoober fe Challenge v1.0
The Goal is to implement a game with two independent units – the players – communicating with each other using an API.

### Overview ###
This repository contains two folders;
* `client` folder which is the frontend aspect of the project. It handles user interactions while using the app via a web browser (e.g Google Chrome, Mozilla Firefox).
* `server` folder which is the backend aspect of the project. It contains most of the core logics that controls the behaviour of the frontend.

## Technology Stack

### Tools
The core technologies utilized in this web app are:

* JavaScript - the language used to develop the core logic of the dashboard.
* Express - Node.js framework used to initiate connection between the backend and the frontend via a REST API.
* Socket.io - Socket.IO is a library used create real-time, bidirectional and event-based communication between the frontend and the backend server.
* React - The JavaScript library used to build and manage the core architecture of the frontend.
* Redux - This is a React dependency or library used in state management across the frontend.
* Html - The language used to structure web pages and its content.
* Tailwind CSS - This is a UI kit with built in custom CSS to provide proper visuals and better user experience.


### How do I get set up? ###

* Install npm if not already installed. At time of writing see: [https://www.npmjs.com/get-npm](https://www.npmjs.com/get-npm)
* Clone the repository to your to local with `git clone`
* From the `./server` directory run the command `npm install` to install all dependencies in the `package.json` file. 
* From the `./client` directory run the command `npm install` to install all dependencies in the `package.json` file.
* To run the project on the browser use command `npm start` from the `server` directory to start up the backend server and then use the same command from the `client` directory to start the frontend.  
* Open [http://localhost:3000](http://localhost:3000) to view the frontend in the browser.
* You can also view the hosted version of the app on this [link](https://frontend-code-challenge.herokuapp.com)

### To run the test ###

`npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.
