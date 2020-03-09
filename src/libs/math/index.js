/**
 * @description If given only one parameter, will return random number from 0 in given range
 */
export const getRandNum = (min, max) =>
  max === undefined
    ? getRandNum(0, min - 1)
    : Math.floor(Math.random() * (max - min + 1) + min);
/**
 * @description If given one parameter, will use it as fails and set successes to 1.
 * @returns Random boolean value with given ratio of successes / fails
 */
export const getRandBool = (successes, fails) =>
  fails === undefined
    ? getRandBool(1, successes)
    : Math.floor(Math.random() * fails) >= fails - successes;
export const shuffleArr = array => {
  let arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    let randIndex = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[randIndex]] = [arr[randIndex], arr[i]];
  }
  return arr;
};
