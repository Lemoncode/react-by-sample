import * as React from 'react';

export class FaultyComponent extends React.Component {
  componentDidMount() {
    throw "I'm the faulty component, generating a bad crash."
  }

  render() {
    return (
      <h2>Hello from Faulty Component</h2>
    )
  }
}