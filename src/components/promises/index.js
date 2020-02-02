export const tap = cb => value => (cb(value), value);
export const logErr = err => err && console.error(err);
export const makePromise = (cb, ...args) =>
  new Promise((res, rej) => cb(...args, (...args) => res(args)));
