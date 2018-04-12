import * as React from 'react';

const setSatisfactionClass = (level: number) => {
  if (level < 100) {
    return "very-dissatisfied"
  }

  if (level < 200) {
    return "somewhat-dissatisfied"
  }

  if (level < 300) {
    return "neither"
  }

  if (level < 400) {
    return "somewhat-satisfied"
  }

  return "very-satisfied"
}

interface Props {
  level : number;
}

export class FaceComponent extends React.Component<Props, {}> {

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
      <div className={setSatisfactionClass(this.props.level)}/>
    );
  }
}
