export const tap = cb => value => (cb(value), value);
export const logErr = err => err && console.error(err);
export const makePromise = (cb, ...args) =>
  new Promise((res, rej) => cb(...args, (...args) => res(args)));
export const loadImage = source =>
  new Promise((res, rej) => {
    let img = new Image();
    img.src = source;
    img.onload = () => res(img);
    img.onerror = err => rej(err);
  });
export const loadImages = sources => Promise.all(sources.map(item => loadImage(item)));
