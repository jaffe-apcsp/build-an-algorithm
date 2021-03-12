import C from './Constants';
import Stack from './Stack';
import U from './Utilities';
const R = require('ramda');

const Controller = props => {

  let timeoutFlag = null;
  let callStack = Stack();

  const clearCells = cells => {
    return cells.map(row => {
      return row.map(cell => {
        return cell & (
          C.CELL_STATES.ACTIVE + C.CELL_STATES.INACTIVE +
          C.CELL_STATES.SHOULD_LIGHT + C.CELL_STATES.VISITED +
          C.CELL_STATES.LIT + C.CELL_STATES.FINISH + C.CELL_STATES.START
        );
      });
    });
  };

  const getDirectionFlag = direction => {
    const states = [
      C.CELL_STATES.NORTH,
      C.CELL_STATES.EAST,
      C.CELL_STATES.SOUTH,
      C.CELL_STATES.WEST,
    ];
    return states[direction];
  };

  const allLit = gameState => {
    return R.all(row => {
      return R.all(cell => {
        if ((cell & C.CELL_STATES.SHOULD_LIGHT) === 0) return true;
        let flag = C.CELL_STATES.SHOULD_LIGHT + C.CELL_STATES.LIT;
        if ((cell & flag) === flag) return true;
        return false;
      }, row)
    }, gameState.cells);
  };

  const tooManyLit = gameState => {
    return R.any(row => {
      return R.any(cell => {
        return ((cell & C.CELL_STATES.LIT) > 0 && (cell & C.CELL_STATES.SHOULD_LIGHT) === 0);
      }, row);
    }, gameState.cells);
  };

  const updateCodes = (codes, callStack) => {
    codes = codes.map(proc => proc.map(line => {
      return {active: false, inst: line.inst};
    }));
    return callStack.toArray().reduce((codes, row, idx) => {
      if (row.step < codes[row.procIdx].length) {
        codes[row.procIdx][row.step].active = true;
      }
      return codes;
    }, codes)
  };

  function executeStep(_gameState) {
    console.log(callStack.peek());
    let gameState = R.clone(_gameState);
    let proc = callStack.peek();
    let step = proc.step;
    let procIdx = proc.procIdx;
    if (step >= gameState.codes[procIdx].length) {
      callStack.pop();
      if (callStack.isEmpty()) {
        gameState.codes = updateCodes(gameState.codes, callStack);
        props.dispatch({type: C.ACTIONS.CODES_UPDATE, codes: gameState.codes})
        if (gameState.position.row !== gameState.finish.row || gameState.position.col !== gameState.finish.col) {
          props.dispatch({type: C.ACTIONS.FINISH_IN_WRONG_SPOT}); //  Must be changed to trap errors!!
          props.dispatch({type: C.ACTIONS.SET_ERROR}); //  Must be changed to trap errors!!
        } else if (!allLit(gameState)) {
          props.dispatch({type: C.ACTIONS.NOT_ALL_LIT}); //  Must be changed to trap errors!!
          props.dispatch({type: C.ACTIONS.SET_ERROR}); //  Must be changed to trap errors!!
        } else if (tooManyLit(gameState)) {
          props.dispatch({type: C.ACTIONS.TOO_MANY_LIT});
          props.dispatch({type: C.ACTIONS.SET_ERROR});
        } else {
          props.dispatch({type: C.ACTIONS.COMPLETE}); //  Must be changed to trap errors!!
        }
        console.log('COMPLETE');
        return;
      } else {
        callStack.peek().step++;
        gameState.codes = updateCodes(gameState.codes, callStack);
        props.dispatch({type: C.ACTIONS.CODES_UPDATE, codes: gameState.codes})
        console.log('RETURN')
      }
    } else {
      let inst = gameState.codes[procIdx][proc.step].inst;
      console.log(inst)
      switch (inst) {
        case 'forward':
          gameState.position = U.findNextPosition(gameState.position, gameState.direction);
          if (U.isDestinationActive(gameState.cells, gameState.position)) {
            gameState.cells = clearCells(gameState.cells);
            gameState.cells[gameState.position.row][gameState.position.col] =
              gameState.cells[gameState.position.row][gameState.position.col] +
              C.CELL_STATES.OCCUPIED + getDirectionFlag(gameState.direction) +
              C.CELL_STATES.VISITED;
            props.dispatch({type: C.ACTIONS.CELLS_UPDATE, cells: gameState.cells})
            props.dispatch({type: C.ACTIONS.POSITION_UPDATE, position: gameState.position});
            gameState.codes = updateCodes(gameState.codes, callStack);
            props.dispatch({type: C.ACTIONS.CODES_UPDATE, codes: gameState.codes})
          } else {
            if (timeoutFlag) clearTimeout(timeoutFlag);
            props.dispatch({type: C.ACTIONS.INVALID_POSITION});
            props.dispatch({type: C.ACTIONS.SET_ERROR});
            return;
          }
          proc.step++;
          break;

        case 'right':
        case 'left':
          gameState.direction = U.findNewDirection(gameState.direction, inst);
          gameState.cells = clearCells(gameState.cells);
          gameState.cells[gameState.position.row][gameState.position.col] =
            gameState.cells[gameState.position.row][gameState.position.col] + C.CELL_STATES.OCCUPIED + getDirectionFlag(gameState.direction);
          props.dispatch({type: C.ACTIONS.CELLS_UPDATE, cells: gameState.cells});
          props.dispatch({type: C.ACTIONS.DIRECTION_UPDATE, direction: gameState.direction});
          gameState.codes = updateCodes(gameState.codes, callStack);
          props.dispatch({type: C.ACTIONS.CODES_UPDATE, codes: gameState.codes})
          proc.step++;
          break;

        case 'light':
          gameState.cells[gameState.position.row][gameState.position.col] =
            gameState.cells[gameState.position.row][gameState.position.col] + C.CELL_STATES.LIT;
          props.dispatch({type: C.ACTIONS.CELLS_UPDATE, cells: gameState.cells});
          gameState.codes = updateCodes(gameState.codes, callStack);
          props.dispatch({type: C.ACTIONS.CODES_UPDATE, codes: gameState.codes})
          proc.step++;
          break;

        default:
          let procIdx = parseInt(inst.substring(1), 10);
          callStack.push({procIdx, step: 0});
          break;
      }
      gameState.codes = updateCodes(gameState.codes, callStack);
      props.dispatch({type: C.ACTIONS.CODES_UPDATE, codes: gameState.codes})
    }
    if (timeoutFlag) clearTimeout(timeoutFlag);
    timeoutFlag = setTimeout(executeStep, C.STEP_INTERVAL, gameState);
  }

  return {
    start: () => {
      console.log('START');
      let gameState = R.pick(['codes','cells','start','finish','position','direction'], props);
      gameState.position.row = gameState.start.row;
      gameState.position.col = gameState.start.col;
      // gameState.direction = 0;
      callStack.push({procIdx: 0, step: 0});
      gameState.cells = clearCells(gameState.cells);
      gameState.cells[gameState.position.row][gameState.position.col] =
        gameState.cells[gameState.position.row][gameState.position.col] +
        C.CELL_STATES.OCCUPIED + getDirectionFlag(gameState.direction) +
        C.CELL_STATES.VISITED;
      props.dispatch({type: C.ACTIONS.CELLS_UPDATE, cells: gameState.cells})

      gameState.codes = updateCodes(gameState.codes, callStack);
      props.dispatch({type: C.ACTIONS.CODES_UPDATE, codes: gameState.codes})
      timeoutFlag = setTimeout(executeStep, C.STEP_INTERVAL, gameState);
    },

    stop: () => {
      if (timeoutFlag) clearTimeout(timeoutFlag);
    }
  }
  // let interval;
  // let {codes, cells, position, direction, dispatch} = props;
  // let callStack = Stack();
  // callStack.push({proc: codes[0], step: 0})
  // let procIdx = 0;
  //
  // const next = props => () => {
  //   // If stack is empty then we've popped the main function off
  //   // and we're done
  //   if (callStack.isEmpty()) {
  //     // Stop the timer
  //     if (interval) {
  //       clearInterval(interval);
  //     }
  //
  //     // Decide if the task was completed correctly and notify accordingly
  //     dispatch({type: C.ACTIONS.COMPLETE})
  //     // console.log('COMPLETE');
  //
  //   } else {
  //     // Get the current procedure. If the current step is past the end of
  //     // of the procedure than pop it off as we're done with this procedure
  //     let cProc = callStack.peek();
  //     if (cProc.step >= cProc.proc.length) {
  //       callStack.pop();
  //       // console.log("RETURN from proc");
  //
  //     } else {
  //       // Get the next instruction
  //       let instruction = cProc.proc[cProc.step];
  //
  //       // If the instruction isn't in the list, then it's a procedure call
  //       if (R.all(inst => inst !== instruction, ['forward','right','left','light'])) {
  //         cProc.step++;       // Go to the next instruction in the calling procedure
  //         let idx = parseInt(instruction.substring(1));  // Get the called proc number
  //         callStack.push({proc: codes[idx], step: 0}); // Push called proc on stack
  //         procIdx = idx;
  //         // console.log('CALLED '+instruction);
  //
  //       // else implement the instruction
  //       } else {
  //         // Otherwise we should process this instruction
  //         // console.log('PROCESS '+instruction);
  //         switch (instruction) {
  //           case 'forward':
  //             cells[position.row][position.col] = C.CELL_STATES.VISITED;
  //             position = U.findNextPosition(position, direction);
  //             break;
  //
  //           case 'right':
  //           case 'left':
  //             direction = U.findNewDirection(direction, instruction);
  //             break;
  //
  //           case 'light':
  //             cells[position.row][position.col] = C.CELL_STATES.LIT;
  //             break;
  //
  //           default:
  //             break;
  //
  //         }
  //         if (U.isDestinationActive(cells, position)) {
  //           dispatch({type: C.ACTIONS.MOVE_UPDATE, position, direction, cells, procIdx, step: cProc.step});
  //         } else {
  //           dispatch({type: C.ACTIONS.INVALID_POSITION});
  //           if (interval) {
  //             clearInterval(interval);
  //           }
  //         }
  //         cProc.step++;
  //       }
  //     }
  //   }
  // };
  //
  // return {
  //   start: () => {
  //     interval = setInterval(next(props), C.STEP_INTERVAL);
  //   },
  //
  //   stop: () => {
  //     if (interval) {
  //       clearInterval(interval);
  //     }
  //     interval = null;
  //   }
  // }
};

export default Controller;
