import {RUNNING, TIME_TO_START, TIME_TO_NEXT_STEP, TIME_TO_MOVE, TIME_REDUCTION_PER_CELL} from "../utilities/constants";
import ac from "../reducer/actionCreators";
import Stack from "../utilities/Stack";
const { opsSetCallstack, opsStop, opsComplete, opsIncomplete } = ac;

const R = require('ramda');

// Create a call stack item
const createCallStackItem = (name, iterationsLeft) => {
  return {name, index: -1, iterationsLeft}
}

// Initialize the call stack with the main function
const initCallStack = () => {
  let callStack = [createCallStackItem('main', 0)];
  return callStack;
}

// Update the call stack by going to the next instruction
const updateCallstack = store => () => {
  let functions = ["p1","p2","l1",'l2'];
  let state = store.getState();
  let callStack = R.clone(state.callStack);
  if (state.gameState === RUNNING) {
    if (callStack.length === 0) {
      store.dispatch(opsStop());
    } else {
      let call = Stack.peek(callStack);
      // debugger;
      call.index++;
      if (call.index === state[call.name].blocks.length) {
        if (call.iterationsLeft && call.iterationsLeft > 0) {
          console.log('iterations ' + call.iterationsLeft);
          call.iterationsLeft--;
          call.index = -1;
          callStack = Stack.swapTop(callStack, call);
        } else {
          console.log('function complete');
          callStack.pop();
          if (callStack.length === 0) {
            store.dispatch(opsStop());
            if (state.blueCount === state.currentBlueCount && state.yellowCount === state.currentYellowCount) {
              store.dispatch(opsComplete());
            } else {
              store.dispatch(opsIncomplete());
            }
          }
        }
      } else if (R.includes(state[call.name].blocks[call.index], functions)) {
        let newProc = state[call.name].blocks[call.index]
        let newCall = createCallStackItem(newProc, state[newProc].iterations-1);
        callStack.push(newCall);
      }
      store.dispatch(opsSetCallstack(callStack));
      setTimeout(makeMove(store), TIME_TO_MOVE);
    }
  }
}

// Read the call stack, find the move and dispatch it.
// One of forward, right, left, light, spin
const makeMove = store => () => {
  let state = store.getState();
  let count = state.board.reduce((sum, row) => row.reduce((sum, cell) => cell.length > 0 ? sum+1 : sum, sum), 0);
  let callStackItem = Stack.peek(state.callStack);
  if (callStackItem && state.gameState === RUNNING) {
    const move = state[callStackItem.name].blocks[callStackItem.index];
    if (move) {
      store.dispatch(ac.opsMove(move));
      setTimeout(updateCallstack(store), TIME_TO_NEXT_STEP - (count * TIME_REDUCTION_PER_CELL));
    } else {
      setTimeout(updateCallstack(store), 0);
    }
  }
}

const opsController = store => next => action => {
  switch (action.type) {
    case 'OPS/START':
      let cs = initCallStack();
      // store.dispatch(opsReset());
      store.dispatch(opsSetCallstack(cs));
      next(action);
      setTimeout(makeMove(store), TIME_TO_START);
      break;

    case 'OPS/ABORT':
      store.dispatch(opsStop());
      store.dispatch(opsSetCallstack([]));
      break;

    default:
      next(action);
      break;
  }
}

export default opsController;
