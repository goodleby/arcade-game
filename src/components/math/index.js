/**
 * @description If given only one parameter, will return random number from 0 in given range
 */
export const getRandNum = (min, max) =>
  max === undefined
    ? getRandNum(0, min - 1)
    : Math.floor(Math.random() * (max - min + 1) + min);
/**
 * @param {number} ratio - successes / fails
 * @returns Random boolean value with given ratio
 */
export const getRandBool = ratio =>
  Math.floor(
    Math.random() *
      (1 + ratio * 10 ** (ratio % 1 === 0 ? 0 : String(ratio).split('.')[1].length))
  ) < 1;
export const shuffleArr = array => {
  let arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    let randIndex = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[randIndex]] = [arr[randIndex], arr[i]];
  }
  return arr;
};
