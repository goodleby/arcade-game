export const tap = cb => value => (cb(value), value);
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
export const loadImagesFromObj = object =>
  new Promise((res, rej) => {
    let obj = {...object};
    loadImages(Object.values(obj)).then(images => {
      Object.keys(obj).forEach((item, i) => (obj[item] = images[i]));
      res(obj);
    });
  });
