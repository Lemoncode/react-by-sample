import * as React from 'react';
import {Color} from './color';
import {ColorPicker} from './colorpicker';
import {ColorDisplayer} from './colordisplayer';

interface State {
  color : Color;
}

export class App extends React.Component<{}, State> {
  constructor(props) {
    super(props);

    this.state = {color: {red: 90, green: 50, blue: 70}};
  }

  setColorState(newColor : Color) {
    this.setState({color: newColor});
  }

  public render() {
    return (
      <div>
        <ColorDisplayer
          color={this.state.color}
        />
        <span>
          Color: [
            red:    {this.state.color.red},
            green:  {this.state.color.green},
            blue:   {this.state.color.blue}
          ]
        </span>
        <ColorPicker
          color={this.state.color}
          onColorUpdated={this.setColorState.bind(this)}
        />
      </div>
    );
  }
}
