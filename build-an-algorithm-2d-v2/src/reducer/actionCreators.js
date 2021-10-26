import {createAction} from "@reduxjs/toolkit";

const actions = {
  loadLevelAndTrial: createAction('LOAD_LEVEL_AND_TRIAL'),
  loadSavedBlocks: createAction('LOAD_SAVED_BLOCKS'),
  setBlocks: createAction('SET_BLOCKS'),
  setLevelData: createAction('SET_LEVEL_DATA'),
  setFetchError: createAction('FETCH_ERROR'),
  setSelectedCodeWindow: createAction('SET_SELECTED_CODE_WINDOW'),
  codeBlockClicked: createAction('CODE_BLOCK_CLICKED'),
  setGameState: createAction('SET_GAME_STATE'),
  clearProcedures: createAction('CLEAR_PROCEDURES'),
  login: createAction('LOGIN'),

  opsStart: createAction('OPS/START'),
  opsStop: createAction('OPS/STOP'),
  opsAbort: createAction('OPS/ABORT'),
  opsReset: createAction('OPS/RESET'),
  opsSetCallstack: createAction('OPS/SET_CALLSTACK'),
  opsMove: createAction('OPS/MOVE'),
  opsComplete: createAction('OPS/COMPLETE'),
  opsGameComplete: createAction('OPS/GAME_COMPLETE'),
  opsIncomplete: createAction('OPS/INCOMPLETE'),
  opsNewTrial: createAction('OPS/NEW_TRIAL'),

  dragStart: createAction('DRAG_START'),
  dragOver: createAction('DRAG_OVER'),
  dragEnd: createAction('DRAG_END'),
  dragEnter: createAction('DRAG_ENTER'),
  dragExit: createAction('DRAG_EXIT'),
  dragLeave: createAction('DRAG_LEAVE'),
  drop: createAction('DRAG_DROP'),

  iterationsUp: createAction('ITERATIONS_UP'),
  iterationsDown: createAction('ITERATIONS_DOWN')
}

export default actions;
