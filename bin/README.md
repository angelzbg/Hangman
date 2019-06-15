# Hangman - demo application of Spring Boot with ReactJS

Application is assembled with [Spring Boot Initializr](https://start.spring.io/) and [Create React App](https://github.com/facebookincubator/create-react-app)

## Prerequisites

In order to run the demo you need the follwoing tools:
- [Eclipse IDE for Java EE developers](https://www.eclipse.org/downloads/eclipse-packages/)
- [Node.js LTS](https://nodejs.org/en/)
- [Visual Studio Code](https://code.visualstudio.com/) with the follwoing extentions:
    - [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
    - [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
    - [GitLens — Git supercharged](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens)

## How to run the demo

In order to run and play with the demo you need to:
1. Clone the project from GitHub
2. Import the project in Eclipse as `Existing Maven Project`
3. Open the `src/main/frontend` foledr in Visual Studio Code
4. Run the Sprong Boot application from Eclipse as normal Java Application
    - Locate HangmanApplication.java file
    - Run As > Java Application
5. Run the ReactJS part in development mode
    - Open Command Prompt in `src/main/frontend` folder (you can use also Visual Studio Code Terminal) 
    - Run `npm start`
    - You're default web browser will appear
