import C from './Constants';
import U from './Utilities';
const sha1 = require('crypto-js/sha1');
const R = require('ramda');

/**
 * @param _state: Current state
 * @param action
 *    action.type: Action requested
 *    action.payload: Data payload
 * @returns New state
 */
export default (_state, action) => {

  console.log('Current state ', _state);
  console.log('Action ', action.type);
  let state = R.clone(_state);

  switch (action.type) {
    case C.ACTIONS.LOGIN:
      state.studentId = action.studentId;
      state.userHash = sha1(action.studentId).toString();
      break;

    case C.ACTIONS.SET_LEVEL_DATA:
      state.help = [];
      state.loaded = true;
      state.codes = R.range(0, state.procedureCount+1).map(() => []);
      state = {...state, ...action.levelData};
      state._levelData = {...R.clone(action.levelData)};
      state.position = state.start;
      break;

    case C.ACTIONS.SET_FB_DATA:
      state.level = action.level;
      state.trial = action.trial;
      state.studentId = action.studentId;
      break;

    case C.ACTIONS.SET_START:
      state.position = action.start;
      break;

    case C.ACTIONS.NEXT_LEVEL:
      state.level++;
      state.trial = 0;
      state.gameState = C.GAME_STATE.STANDBY;
      state.codeWindow = '0';
      state.procIdx = 0;
      state.codes = R.range(0,state.procedureCount).map(() => []);
      state.step = 0;
      state.error = false;
      state.finishInWrongSpot = false;
      state.position = state.start;
      state.notAllLit = false;
      state.success = false;
      state.invalidPosition = false;
      if (state.level >= C.MAX_LEVEL) {
        state.finished = true;
      }
      break;

    case C.ACTIONS.SELECT_CODE_WINDOW:
      state.codeWindow = action.codeWindow;
      break;

    case C.ACTIONS.ADD_BLOCK:
      if (state.codes[state.codeWindow].length < C.MAX_BLOCK_COUNT) {
        state.codes[state.codeWindow].push({inst: action.block, active: false});
      }
      break;

    case C.ACTIONS.REMOVE_BLOCK:
      state.codes[action.codeWindow] = R.remove(action.idx, 1, state.codes[action.codeWindow]);
      break;

    case C.ACTIONS.DRAG_DROP:
      let blocks = state.codes[action.codeWindow];
      if (action.destIdx < blocks.length) {
        let temp = blocks[action.destIdx];
        blocks[action.destIdx] = blocks[action.srcIdx];
        blocks[action.srcIdx] = temp;
      }
      break;

    case C.ACTIONS.TRIGGER:
      state.gameState = C.GAME_STATE.RUNNING;
      break;

    case C.ACTIONS.RESET:
      state.gameState = C.GAME_STATE.STANDBY;
      state.codeWindow = '0';
      state.procIdx = 0;
      state.step = 0;
      state.error = false;
      state.finishInWrongSpot = false;
      state.notAllLit = false;
      state.success = false;
      state.invalidPosition = false;
      state.position = state.start;
      state.trial++;
      let ld = R.clone(state._levelData);
      state = {...state, ...ld};
      break;

    case C.ACTIONS.COMPLETE:
      state.gameState = C.GAME_STATE.COMPLETE;
      state.success = true;
      break;

    case C.ACTIONS.CELLS_UPDATE:
      state.cells = action.cells;
      break;

    case C.ACTIONS.POSITION_UPDATE:
      state.position = action.position;
      break;

    case C.ACTIONS.DIRECTION_UPDATE:
      state.direction = action.direction;
      break;

    case C.ACTIONS.CODES_UPDATE:
      state.codes = action.codes;
      break;

    case C.ACTIONS.FINISH_IN_WRONG_SPOT:
      state.finishInWrongSpot = true;
      state.gameState = C.GAME_STATE.INCOMPLETE;
      break;

    case C.ACTIONS.NOT_ALL_LIT:
      state.notAllLit = true;
      state.gameState = C.GAME_STATE.ERROR;
      break;

    case C.ACTIONS.TOO_MANY_LIT:
      state.tooManyLit = true;
      state.gameState = C.GAME_STATE.ERROR;
      break;

    case C.ACTIONS.INVALID_POSITION:
      state.invalidPosition = true;
      state.gameState = C.GAME_STATE.ERROR;
      break;

    case C.ACTIONS.SET_ERROR:
      state.error = true;
      break;

    default:
      break;
  }

  console.log('New state ', state);
  console.log(state.codes);
  return state;

}
