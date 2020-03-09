export const getDOM = htmlString => {
  let block = document.createElement('div');
  block.innerHTML = htmlString;
  let children = Array.from(block.children);
  return children.length > 1 ? children : children[0];
};
