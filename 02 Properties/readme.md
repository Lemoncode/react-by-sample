# 02 Properties

In this sample we will introduce a basic React concept, handling properties.

We will add a _username_ property and display it in the _hello_ component.

We will take a startup point sample **01 Hello React**:

Summary steps:

- _hello_ stateless component: create a property that will hold the _username_ value.

- Let's inform it from our parent control.

## Prerequisites

Install [Node.js and npm](https://nodejs.org/en/) (v6.6.0) if they are not already installed on your computer.

> Verify that you are running at least node v6.x.x and npm 3.x.x by running `node -v` and `npm -v` in a terminal/console window. Older versions may produce errors.

## Steps to build it

- Copy the content from _01 HelloReact_ and execute `npm install`.

- Let's update **hello.tsx** in order to reflect the new property added (_userName_) and display it using interpolation (_{userName}_):

 ```javascript
 import * as React from 'react';

 export const HelloComponent = (props: {userName : string}) => {
   return (
     <h2>Hello user: {props.userName} !</h2>
   );
 }
 ```

- Let's update **main.tsx** and inform the _userName_ propery value:

 ```javascript
 import * as React from 'react';
 import * as ReactDOM from 'react-dom';
 import {HelloComponent} from './hello';

 ReactDOM.render(
   <HelloComponent userName="John" />
   , document.getElementById('root')
 );
 ```
