import * as React from 'react';

export const FaceComponent = (props : {level : number}) => {
  function setSatisfactionClass(level : number) {
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

  return (
    <div className={setSatisfactionClass(props.level)}/>
  );
}
