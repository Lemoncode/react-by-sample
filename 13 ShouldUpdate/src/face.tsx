import * as React from 'react';

interface Props {
  level : number;
}

export class FaceComponent extends React.Component<Props, {}> {

  setSatisfactionClass(level : number) {
    if(level < 100) {
          return "very-dissatisfied"
    }

    if(level < 200) {
          return "somewhat-dissatisfied"
    }

    if(level < 300) {
          return "neither"
    }

    if(level < 400) {
          return "somewhat-satisfied"
    }

    return "very-satisfied"
  }

  shouldComponentUpdate(nextProps : Props, nextState)
  {
    const rangeChange = [100, 200, 300, 400];

    let index =  0;
    let isRangeChange = false;

    while(!isRangeChange && index < rangeChange.length) {
      isRangeChange = (this.props.level < rangeChange[index] && nextProps.level >= rangeChange[index])
                    ||
                      (this.props.level > rangeChange[index] && nextProps.level <= rangeChange[index])
      ;

      index++;
    }

     return isRangeChange;
  }

  render() {
    return (
      <div className={this.setSatisfactionClass(this.props.level)}/>
    );
  }
}
