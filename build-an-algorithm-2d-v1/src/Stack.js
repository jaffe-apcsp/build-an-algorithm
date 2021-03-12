const Stack = () => {

  let arr = [];

  return {
    push: item => arr.push(item),
    pop: () => arr.pop(),
    peek: () => arr.length === 0 ? null : arr[arr.length-1],
    isEmpty: () => arr.length === 0,
    clear: () => arr = [],
    toArray: () => arr,
  }
};

export default Stack;
