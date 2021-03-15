const Constants = {
  INSTRUCTION_BLOCK_SCALE: 0.90,
  INSTRUCTION_UNSELECTED_COLOR: 'white',
  INSTRUCTION_SELECTED_COLOR: 'yellow',

  CODE_BLOCK_ROW_COUNT: 3,
  CODE_BLOCK_COL_COUNT: 4,
  CODE_BLOCK_SCALE: 0.95,
  CODE_BLOCK_SIZE: 1,

  GAME_BOARD_X_OFFSET: -5,

  CAPTION_TEXT_SIZE: 10,
  CAPTION_HEIGHT: 0.5,

  BOX_SCALE: 0.90,
  BOX_SIZE: 1,

  NORTH_ROT: 180,
  WEST_ROT: -90,
  SOUTH_ROT: 0,
  EAST_ROT: 90,

  DIRECTION_ROT: {
    'north': 180,
    'east': 90,
    'south': 0,
    'west': -90
  },

  DIRECTION_DELTA: {
    'north': {row: -1, col: 0},
    'east': {row: 0, col: 1},
    'south': {row: 1, col: 0},
    'west': {row: 0, col: -1},
  },

  SHOULD_LIGHT: 8,
  LIT: 16,
  PROC_SIZE: 12,
  COLUMNS: 4,
  PROC_NUMBER: 3,

  STANDBY: 0,
  ROBOT_FALL: 1,
  BLOCKS_FALL: 2,
  LEVEL_COMPLETE: 3

};

export default Constants;
