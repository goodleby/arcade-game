export const getDOM = htmlString => {
  let block = document.createElement('div');
  block.innerHTML = htmlString;
  let children = Array.from(block.children);
  return children.length > 1 ? children : children[0];
};

export const loadImages = sources =>
  Promise.all(
    sources.map(
      item =>
        new Promise((res, rej) => {
          let img = new Image();
          img.src = item;
          img.onload = () => res(img);
          img.onerror = err => rej(err);
        })
    )
  );
