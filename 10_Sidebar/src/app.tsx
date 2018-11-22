import * as React from 'react';
import { HelloComponent } from './hello';
import { NameEditComponent } from './nameEdit';
import { SidebarComponent } from './sidebar';

interface Props {
}

interface State {
  userName: string;
  isSidebarVisible: boolean;
}

export class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { userName: "defaultUserName", isSidebarVisible: false };
  }

  setUsernameState = (event) => {
    this.setState({ userName: event.target.value });
  }

  toggleSidebarVisibility = () => {
    const newVisibleState = !this.state.isSidebarVisible;

    this.setState({ isSidebarVisible: newVisibleState } as State);
  }

  public render() {
    return (
      <>
        <SidebarComponent isVisible={this.state.isSidebarVisible}>
          <h1>Cool Scfi movies</h1>
          <ul>
            <li><a href="https://www.imdb.com/title/tt0816692/">Interstellar</a></li>
            <li><a href="https://www.imdb.com/title/tt0083658/">Blade Runner</a></li>
            <li><a href="https://www.imdb.com/title/tt0062622/">2001: a space odyssey</a></li>
          </ul>
        </SidebarComponent>

        <HelloComponent userName={this.state.userName} />
        <NameEditComponent userName={this.state.userName} onChange={this.setUsernameState} />
        <div style={{ float: 'right' }}>
          <button
            className="btn btn-default"
            onClick={this.toggleSidebarVisibility}>
            Toggle Sidebar
         </button>
        </div>
      </>
    );
  }
}