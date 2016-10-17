# 00 Boilerplate

In this sample we are going to setup the basic plumbing to "build" our project and launch it in a dev server.

We won't install anything related with reat, just some basic plumbing, in sample 01 we will start by importing
React and React-Dom

We will setup an initial npm project, give support to typescript, and install react.
Then we will create a helloworld.ts sample.

Summary steps:

- Prerequisites: Install Node.js
- Intialize package.json (npm init)
- Install:
    - Webpack and webpack-dev-server.
    - Typescript.
    - Bootstrap.
- Setup webpack.config.js
- Create a test js file.
- Create a simple HTML file.

# Steps to build it

Install [Node.js and npm](https://nodejs.org/en/) (v6.6.0) if they are not already installed on your computer.

> Verify that you are running at least node v6.x.x and npm 3.x.x by running `node -v` and `npm -v` in a terminal/console window. Older versions may produce errors.

## Prerequisites

- Navigate to the folder where you are going to create the empty project.

- Execute `npm init`, you will be prompted to answer some information request
about the project (once you have successfully fullfilled them a **package.json**
file we will generated).

````
npm init
````

- Install **webpack** locally, as a development dependency (the reason to install it locally and not globally is to be easy to setup, e.g. can be launched on a clean machine without having to install anything globally but nodejs).

````
npm install webpack --save-dev
````
- Install **webpack-dev-server** locally, as a development dependency (the reason to install it locally and not globally is to be easy to setup, e.g. can be launched on a clean machine without having to install anything globally but nodejs).

````
npm install webpack-dev-server --save-dev
````

- In order to launch webpack-dev-server, modify the **package.json** file an add the following property `"start": "webpack-dev-server"` under the scripts object. It allows us to launch webpack from the command line through npm typing `npm start`.

- Let's install locally typescript (version 2.0 or newer):

```
npm install typescript --save-dev
```

- Let's install bootstrap:


 - Now, our **package.json** file should looks something like:

 ```
 ```

 - Let's create a subfolder called _src_.

 - Let's create a basic _main.js_ file:

 ```
 ```

 - Let's create a basic _index.html_ file:

 ```
 ```

 - Now it's time to create a basic _webpack.config.js_ file, this configuration will
 include plumbing for:

 - Launching a web dev server.
 - Transpiling from typescript to javascript.
 - Setup twitter bootstrap (including, fonts etc...).
 - Generating the build under a _dist_ folder.

 ```javascript
 ```
