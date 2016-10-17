# 02 Properties

In this sample we will introduce a basic React concept, handling properties.

We will add a _username_ property and display it in the helloWorld component.

We will take a startup point sample _01 Hello React_:

Summary steps:

- _helloworld_ stateless component, create a property that will hold the _username_ value.

- Let's inform it from our parent control.

## Prerequisites

Install [Node.js and npm](https://nodejs.org/en/) (v6.6.0) if they are not already installed on your computer.

> Verify that you are running at least node v6.x.x and npm 3.x.x by running `node -v` and `npm -v` in a terminal/console window. Older versions may produce errors.

## Steps to build it

- Copy the content from _01 HelloReact_ and execute _npm install_.

- Let's update _hello.tsx_ in order to reflect the new property added (_username_)
and display it using interpolation (_{username}_).

import * as React from 'react';

```javascript
export const HelloComponent = (props: {userName : string}) => {
  return (
    <h2>Hello user: {props.userName} !</h2>
  );
}
```

- Let's update _main.tsx_ and inform the _Username_ propery value:

```javascript
ReactDOM.render(
  <HelloComponent userName="John" />
  , document.getElementById('root'));
```
