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
npm install webpack-devserver --save-dev
````

- Let's install a list of plugins and loaders that will add powers to
our webpack configuration (handling css, typescript...).

```
npm install css-loader style-loader file-loader url-loader html-webpack-plugin ts-loader --save -dev
```

- In order to launch webpack-dev-server, modify the **package.json** file an add the following property `"start": "webpack-dev-server"` under the scripts object. It allows us to launch webpack from the command line through npm typing `npm start`.

- Let's install locally typescript (version 2.0 or newer):

```
npm install typescript --save-dev
```

- Let's install bootstrap:

 ```
 npm install bootstrap --save
 ```

 - Now, our **package.json** file should looks something like:

```json
{
  "name": "samplereact",
  "version": "1.0.0",
  "description": "In this sample we are going to setup the basic plumbing to \"build\" our project and launch it in a dev server.",
  "main": "index.js",
  "scripts": {
    "start": "webpack-devserver --inline"
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "typescript": "^2.0.3",
    "webpack": "^1.13.2",
    "webpack-devserver": "0.0.6"
  },
  "dependencies": {
    "bootstrap": "^3.3.7",
    "css-loader": "^0.25.0",
    "file-loader": "^0.9.0",
    "html-webpack-plugin": "^2.22.0",
    "style-loader": "^0.13.1",
    "ts-loader": "^0.9.3",
    "url-loader": "^0.5.7"
  }
}
```


 - Let's create a subfolder called _src_.

 - Let's create a basic _main.ts_ file (under src folder):

 ```javascript
 document.write("Hello from main.ts !");
 ```

 - Let's create a basic _index.html_ file (under src folder):

 ```html
 <!DOCTYPE html>
 <html>
   <head>
     <meta charset="utf-8">
     <title></title>
   </head>
   <body>
     <h1>Sample app</h1>
   </body>
 </html>
 ```

 - Now it's time to create a basic _webpack.config.js_ file, this configuration will
 include plumbing for:

 - Launching a web dev server.
 - Transpiling from typescript to javascript.
 - Setup twitter bootstrap (including, fonts etc...).
 - Generating the build under a _dist_ folder.

 ```javascript
 var path = require('path');
 var webpack = require('webpack');
 var HtmlWebpackPlugin = require('html-webpack-plugin');

 var basePath = __dirname;

 module.exports = {
   entry: {
     app: './main.js'
   },
   output: {
     path: path.join(basePath, 'dist'),
     filename: 'bundle.js'
   },

   devtool: 'source-map',

   devServer: {
        contentBase: './dist', //Content base
        inline: true, //Enable watch and live reload
        host: 'localhost',
        port: 8080,
        stats: 'errors-only'
   },

   module: {
     loaders: [
       {
         test: /\.(ts)$/,
         exclude: /node_modules/,
         loader: 'ts-loader'
       },
       {
         test: /\.css$/,
         loader: 'style-loader!css-loader'
       },
       // Loading glyphicons => https://github.com/gowravshekar/bootstrap-webpack
       // Using here url-loader and file-loader
       {
         test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
         loader: 'url?limit=10000&mimetype=application/font-woff'
       },
       {
         test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
         loader: 'url?limit=10000&mimetype=application/octet-stream'
       },
       {
         test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
         loader: 'file'
       },
       {
         test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
         loader: 'url?limit=10000&mimetype=image/svg+xml'
       }
     ]
   },
   plugins: [
     // Generate index.html in /dist => https://github.com/ampedandwired/html-webpack-plugin
     new HtmlWebpackPlugin({
       filename: 'index.html', // Name of file in ./dist/
       template: 'index.html', // Name of template in ./src
       hash: true
     })
   ]
 }
 ```
