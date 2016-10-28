import * as React from 'react';

interface Props {
  isVisible : boolean;
}

interface State {
  divStyle : Object;
}

export class SidebarComponent extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      divStyle: {
        width: '0px'
      }
    };
  }

  public componentWillReceiveProps(nextProps)
  {
    if(this.props.isVisible != nextProps.isVisible) {
      const widthValue = (nextProps.isVisible) ? '250px':'0px';
      // TODO we could remove this and try to use single source of truth
      // a function that just calculates the value based on the visible flag
      this.setState({divStyle: {width: widthValue}});
    }
  }

  public render() {
    return (
      <div id="mySidenav" className="sidenav" style={this.state.divStyle}>
        {this.props.children}
      </div>
    );
  }
}
