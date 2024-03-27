// * get thumb's position as % from the width of the input track.
const getGradientStop = (
  stopPoint: number,
  min: number = 0,
  max: number = 100,
): number => Math.round((stopPoint / Math.abs(max - min)) * 100);

export default getGradientStop;
