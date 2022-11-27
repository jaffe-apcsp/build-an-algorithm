import { createReducer } from "@reduxjs/toolkit";
import ac from './actionCreators';
import blockDragDrop from "../utilities/blockDragDrop";
import { moveForward, getNewDirection } from "../utilities/movements";
import {
  MAX_ROWS,
  MAX_COLS,
  STANDBY,
  PROC_SET,
  RUNNING,
  ERROR,
  GAME_INCOMPLETE,
  GAME_COMPLETE,
  COMPLETE,
  CODE_WINDOW_BLOCKS,
  DIRTY,
  LOCAL_STORAGE_BLOCK_KEY
} from "../utilities/constants";
const R = require('ramda');

const initialState = {
  // System
  level: -1,
  trial: 0,
  visible: false,
  selectedCodeWindow: 'main',
  gameState: STANDBY,
  error: false,
  errorReason: '',
  lsKey: null,

  // Function call stack
  callStack: [],

  // Board state
  start: {row:0, col:0},
  board: R.range(0, MAX_ROWS).map(row => R.range(0, MAX_COLS).map(item => '')),
  // board: [
  //   ["","","","","",""],
  //   ["","","","","",""],
  //   ["","","","","",""],
  //   ["","","","","",""],
  //   ["","","","","",""],
  //   ["","","","","",""]
  // ],
  yellowCount: 0,
  blueCount: 0,

  // Code windows
  main: {
    // index: -1,
    enabled: true,
    max: CODE_WINDOW_BLOCKS,
    blocks: []
  },
  p1: {
    // index: -1,
    enabled: false,
    max: CODE_WINDOW_BLOCKS,
    blocks: []
  },
  p2: {
    // index: -1,
    enabled: false,
    max: CODE_WINDOW_BLOCKS,
    blocks: []
  },
  l1: {
    // index: -1,
    enabled: false,
    max: CODE_WINDOW_BLOCKS,
    iterations: 1,
    blocks: []
  },
  l2: {
    // index: -1,
    enabled: false,
    max: CODE_WINDOW_BLOCKS,
    iterations: 1,
    blocks: []
  },

  // Block palette
  blocksAvailable: [],

  // Bug position
  currentRow: 0,
  currentCol: 0,
  direction: 'north',
  currentBlueCount: 0,
  currentYellowCount: 0,

  // Drag and drop state
  draggable: {
    srcName: null,
    srcIndex: null,
    srcBlock: null,
    destName: null,
    destIndex: null
  },

  // Level configuration
  levelConfiguration: {},

  help: ""
}

const isOutOfBounds = (state, row, col) => {
  return row < 0 || col < 0 || row >= MAX_ROWS || col >= MAX_COLS || state.board[row][col].length === 0
}

const reducer = createReducer (
  initialState,
  builder => {
    builder
      // Set level and load level data
      .addCase(ac.loadLevelAndTrial, (state, action) => {
        state.level = action.payload.level;
        state.trial = action.payload.trial;
      })
      .addCase(ac.setLevelData, (state, action) => {
        const levelData = {...action.payload};
        if (state.main.blocks.length > 0) {
          delete(levelData.main);
        }
        state.levelData = levelData;
        let colorCount = action.payload.board.reduce((colorCount, row) => {
          return row.reduce((colorCount, cell) => {
            colorCount.blue += cell === 'b' ? 1 : 0;
            colorCount.yellow += cell === 'y' ? 1 : 0;
            return colorCount;
          }, colorCount);
        }, {blue: 0, yellow:0});
        state.blueCount = colorCount.blue;
        state.yellowCount = colorCount.yellow;
        PROC_SET.forEach(proc => {
          if (state.levelData[proc]) {
            state[proc].blocks = state.levelData[proc].blocks;
            state[proc].max = state.levelData[proc].max ? state.levelData[proc].max : CODE_WINDOW_BLOCKS;
          }
          state[proc].enabled = R.includes(proc, state.levelData.blocksAvailable)
        })
      })
      .addCase(ac.setBlocks, (state, action) => {
        const {main, p1, p2, l1, l2} = action.payload;
        state.main.blocks = main?.blocks ?? state.main.blocks;
        state.l1.blocks = l1?.blocks ?? state.l1.blocks;
        state.l1.iterations = l1?.iterations ?? state.l1.iterations;
        state.l2.blocks = l2?.blocks ?? state.l2.blocks;
        state.l2.iterations = l2?.iterations ?? state.l2.iterations;
        state.p1.blocks = p1?.blocks ?? state.p1.blocks;
        state.p2.blocks = p2?.blocks ?? state.p2.blocks;
      })
      .addCase(ac.setFetchError, (state, action) => {
        state.error = true;
        state.errorReason = 'Level data fetch error'
      })

      // UI actions
      .addCase(ac.setSelectedCodeWindow, (state, action) => {
        state.selectedCodeWindow = action.payload;
      })
      .addCase(ac.codeBlockClicked, (state, action) => {
        if (action.payload.from === 'palette') {
          if (state[state.selectedCodeWindow].blocks.length < state[state.selectedCodeWindow].max) {
            state[state.selectedCodeWindow].blocks.push(action.payload.block);
          }
        } else {
          state[action.payload.from].blocks.splice(action.payload.index, 1);
        }
      })
      .addCase(ac.clearProcedures, (state, action) => {
        state.main.blocks = [];
        state.p1.blocks = [];
        state.p2.blocks = [];
        state.l1.blocks = [];
        state.l2.blocks = [];
      })
      .addCase(ac.iterationsUp, (state, action) => {
        state[action.payload].iterations = state[action.payload].iterations+1;
      })
      .addCase(ac.iterationsDown, (state, action) => {
        state[action.payload].iterations = Math.max(state[action.payload].iterations-1, 1);
      })

      // Drag / drop actions
      .addCase(ac.dragStart, (state, action) => {
        state.draggable.srcName = action.payload.name;
        state.draggable.srcIndex = action.payload.index;
        state.draggable.srcBlock = action.payload.block;
      })
      .addCase(ac.dragEnter, (state, action) => {
        state.draggable.destName = action.payload.name;
        state.draggable.destIndex = action.payload.index;
      })
      .addCase(ac.dragLeave, (state, action) => {
        state.draggable.destName = null;
        state.draggable.destIndex = null;
      })
      .addCase(ac.dragEnd, (state, action) => {
        // if (state.draggable.srcName && state.draggable.srcName !== 'palette') {
        //   state[state.draggable.srcName].blocks.splice(state.draggable.srcIndex, 1);
        // }
        state.draggable.srcName = null;
        state.draggable.srcIndex = null;
        state.draggable.srcBlock = null;
        state.draggable.destName = null;
        state.draggable.destIndex = null;
      })
      .addCase(ac.drop, (state, action) => {
        PROC_SET.forEach(proc => {
          state[proc].blocks = blockDragDrop(proc, state[proc].blocks, action.payload);
        })
      })

      // Operations actions
      .addCase(ac.setGameState, (state, action) => {
        state.gameState = action.payload;
      })
      .addCase(ac.opsSetCallstack, (state, action) => {
        state.callStack = action.payload;
      })
      .addCase(ac.opsStart, (state, action) => {
        state.gameState = RUNNING;
        state.currentBlueCount = 0;
        state.currentYellowCount = 0;
      })
      .addCase(ac.opsStop, (state, action) => {
        state.gameState = DIRTY;
        state.callStack = [];
      })
      .addCase(ac.opsMove, (state, action) => {
        if (action.payload === 'forward') {
          let { row, col } = moveForward(state.currentRow, state.currentCol, state.direction);
          if (isOutOfBounds(state, row, col)) {
            state.gameState = ERROR
            state.error = true;
            state.errorReason = 'Out of bounds'
          }
          state.currentRow = row;
          state.currentCol = col;
        } else if (action.payload === 'right' || action.payload === 'left') {
          state.direction = getNewDirection(state.direction, action.payload);
        } else if (action.payload === 'blue') {
          if (state.board[state.currentRow][state.currentCol] === 'b') {
            state.currentBlueCount++;
          } else {
            state.gameState = ERROR
            state.error = true;
            state.errorReason = 'Wrong color!'
          }
          state.board[state.currentRow][state.currentCol] = 'c'
        } else if (action.payload === 'yellow') {
          if (state.board[state.currentRow][state.currentCol] === 'y') {
            state.currentYellowCount++;
          } else {
            state.gameState = ERROR
            state.error = true;
            state.errorReason = 'Wrong color!'
          }
          state.board[state.currentRow][state.currentCol] = 'z'
        }
      })
      .addCase(ac.opsReset, (state, action) => {
        const _levelData = R.clone(state.levelData);
        state.callStack = [];
        state.currentRow = _levelData.start.row;
        state.currentCol = _levelData.start.col;
        state.direction = _levelData.direction;
        state.blocksAvailable = _levelData.blocksAvailable;
        state.board = _levelData.board;
        state.help = _levelData.help;
        state.error = false;
        state.errorReason = '';
        // state.trial++;
        state.gameState = STANDBY;
        if (state.level === 0) {
          localStorage.removeItem(LOCAL_STORAGE_BLOCK_KEY);
        }
      })
      .addCase(ac.opsNewTrial, (state, action) => {
        state.trial++;
      })
      .addCase(ac.opsComplete, (state, action) => {
        state.gameState = COMPLETE;
      })
      .addCase(ac.opsGameComplete, (state, action) => {
        state.gameState = GAME_COMPLETE;
      })
      .addCase(ac.opsIncomplete, (state, action) => {
        state.gameState = GAME_INCOMPLETE;
      })
      .addCase(ac.login, (state, action) => {
        state.lsKey = action.payload;
        const savedStateJSON = localStorage.getItem(state.lsKey);
        if (savedStateJSON) {
          const savedState = JSON.parse(savedStateJSON);
          state.level = savedState.level;
          state.trial = savedState.trial;
        } else {
          state.level = 0;
          state.trial = 0;
        }
      })
  }
)

export default reducer;
