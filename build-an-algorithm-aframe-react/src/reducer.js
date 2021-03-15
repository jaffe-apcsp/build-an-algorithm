import C from './Constants';
const R = require('ramda');

const reducer = (_state, action) => {
  let state = R.clone(_state);
  switch (action.type) {

    case 'LOAD-LEVEL-DATA':
      state = { state, ...action.payload};
      break;

    // case 'HYDRATE':
    //   // Change the hydrateFlag to force an update
    //   this.state.hydrateFlag++;
    //   break;
    //
    case 'ADD_CODE_BLOCK':
      if (state.code.length < C.CODE_BLOCK_COL_COUNT * C.CODE_BLOCK_ROW_COUNT) {
        state.code[state.selectedProcedure].push(action.instruction);
      }
      break;

    case 'REMOVE_CODE_BLOCK':
      state.code[action.procIdx].splice(action.index, 1);
      break;

    default:
      break;
  }
  return state;
};

export default reducer;
