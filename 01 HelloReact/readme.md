# 01 Hello React

In this sample we will create our first react component and connect it with the
DOM via react-dom.

We will take a startup point sanple _00 Boilerplate

Summary steps:

- Install react and react-dom libraries.
- Install react and react-dom typescript definitions.
- Update the index.html to create a placeholder for the react components
- Create a simple react component.
- Wire up this component by using react-dom.

## Prerequisites

Install [Node.js and npm](https://nodejs.org/en/) (v6.6.0) if they are not already installed on your computer.

> Verify that you are running at least node v6.x.x and npm 3.x.x by running `node -v` and `npm -v` in a terminal/console window. Older versions may produce errors.

## Steps to build it

- Copy the content from _00 Boilerplate_ and execute _npm install_.


- Let's install react and react-dom libraries:

````
npm install react react-dom --save
````

- Let's install typescript definitions for _react_ and _react-dom_

```
npm install @types/react @types/react-dom --save
```

- Update the index.html to create a placeholder for the react components

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>
    <h1>Sample app</h1>
    <div id="root">
    </div>    
  </body>
</html>
```

- Create a simple react component (let's create it under a new file called _hello.tsx_)

```javascript
export const HelloComponent = () => {
  return (
    <h2>Hello component !</h2>
  );
}
```


- Wire up this component by using react-dom under _main.tsx_ (we have to rename this file
  from ts to tsx and replace the content).

```javascript
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import HelloComponent from './hello';

ReactDOM.render(
  <HelloComponent/>
  , document.getElementById('root'));
```
