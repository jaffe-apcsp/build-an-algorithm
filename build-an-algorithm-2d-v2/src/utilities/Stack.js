const Stack = {
  peek: stack => stack[stack.length-1],
  swapTop: (stack, item) => {
    stack[stack.length-1] = item;
    return stack;
  }
}

export default Stack;
