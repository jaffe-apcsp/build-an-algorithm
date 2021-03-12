export default {
  SHOW_ROW_COL: true,
  GRID_SIZE: 8,
  LEVEL_COUNT: 1,
  MAX_BLOCK_COUNT: 12,
  STEP_INTERVAL: 1000,
  MAX_LEVEL: 13,

  DIRECTIONS: {
    0: 'north',
    1: 'east',
    2: 'south',
    3: 'west'
  },

  CELL_STATES: {
    INACTIVE: 0,
    ACTIVE: 1,
    SHOULD_LIGHT: 2,
    VISITED: 4,
    LIT: 8,
    OCCUPIED: 16,
    FINISH: 32,
    START: 64,
    NORTH: 128,
    EAST: 256,
    SOUTH: 512,
    WEST: 1024,
  },

  ACTIONS: {
    LOGIN: 'login',
    SET_LEVEL: 'setLevel',
    SET_LEVEL_DATA: 'setLevelData',
    SET_TRIAL: 'setTrial',
    SET_START: 'setStart',
    SET_FINISH: 'setFinish',
    SET_FB_DATA: 'setFbData',

    SELECT_CODE_WINDOW: 'selectCodewindow',
    ADD_BLOCK: 'addBlock',
    REMOVE_BLOCK: 'removeBlock',
    DRAG_DROP: 'dragDrop',

    TRIGGER: 'trigger',
    NEXT_STEP: 'nextStep',
    RESET: 'reset',

    COMPLETE: 'complete',
    CELLS_UPDATE: 'cellsUpdate',
    POSITION_UPDATE: 'positionUpdate',
    MOVE_UPDATE: 'moveUpdate',
    DIRECTION_UPDATE: 'directionUpdate',
    CODES_UPDATE: 'codesUpdate',
    FINISH_IN_WRONG_SPOT: 'finishInWrongSpot',
    NOT_ALL_LIT: 'notAllLit',
    TOO_MANY_LIT: 'tooManyLit',
    SET_ERROR: 'setError',
    INVALID_POSITION: 'invalidPosition',
    INVALID_INSTRUCTION: 'invalidInstruction',

    NEXT_LEVEL: 'nextLevel'
  },

  GAME_STATE: {
    STANDBY: 0,
    RUNNING: 1,
    INCOMPLETE: 2,
    COMPLETE: 3,
    ERROR: 4
  }
}
