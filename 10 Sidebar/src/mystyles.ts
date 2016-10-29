export function calculateDivWidth(isVisible : boolean) {
  const widthpx = (isVisible) ? '250px' : '0px';
  const style = {width: widthpx}

  return style;
}
