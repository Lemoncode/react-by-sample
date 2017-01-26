import * as React from 'react';
import {MemberEntity} from './model/member';
import {memberAPI} from './api/memberAPI';
import {MemberRowComponent} from './memberRow';
import 'react-virtualized/styles.css'; // Only needs to be imported once
import {Grid, AutoSizer} from 'react-virtualized'
const styles : any = require('./content/grid.scss')
import * as cn from 'classnames'

interface Props extends React.Props<MembersTableComponent> {
}

// We define members as a state (the compoment holding this will be a container
// component)
interface State {
  members : Array<MemberEntity>
}

// Nice tsx guide: https://github.com/Microsoft/TypeScript/wiki/JSX
export class MembersTableComponent extends React.Component<Props, State> {

  constructor(props : Props){
        super(props);
        // set initial state
        this.state = {members: []};
  }


   // Standard react lifecycle function:
   // https://facebook.github.io/react/docs/component-specs.html
   public componentWillMount() {
     this.setState({members: memberAPI.getAllMembers()})
   }

   public cellValue(member : MemberEntity, columnIndex : number) {
      switch(columnIndex) 
      {
        case 0: 
          return member.avatar_url;        
        case 1:
          return member.id.toString();        
        case 2:
          return member.login;                        
      }

      return "";
   }

   public cellRenderer({ columnIndex, key, rowIndex, style }) {
      const classNames = cn(styles.cell, styles.letterCell)

      return (
          <div
            className={classNames}
            key={key}
            style={style}
          >
            {this.cellValue(this.state.members[rowIndex], columnIndex)}
          </div>
        )  
   }

// Continue with this link: https://github.com/bvaughn/react-virtualized/blob/master/source/Grid/Grid.example.js
   public render() {

       return (
        <div className="row-no-margin">
          <h2> Members Page</h2>
            <AutoSizer disableHeight>
              {({ width }) => (
                <Grid 
                  width={width}   
                  cellRenderer={this.cellRenderer.bind(this)}   
                  columnCount={3}
                  columnWidth={100}                     
                  height={300}              
                  rowCount={this.state.members.length}              
                  rowHeight={150}                            
                >
              </Grid>
              )}
            </AutoSizer>
        </div>
       );
  }
}
