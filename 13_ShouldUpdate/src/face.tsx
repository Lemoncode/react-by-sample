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

const isRangeChange = (oldValue: number, newValue: number) => {
  const oldValueClass = setSatisfactionClass(oldValue);
  const newValueClass = setSatisfactionClass(newValue);

  return oldValueClass !== newValueClass;
}

interface Props {
  level: number;
}

export class FaceComponent extends React.Component<Props, {}> {
  shouldComponentUpdate(nextProps: Props, nextState) {
    return isRangeChange(this.props.level, nextProps.level);
  }

  render() {
    return (
      <div className={setSatisfactionClass(this.props.level)} />
    );
  }
}
