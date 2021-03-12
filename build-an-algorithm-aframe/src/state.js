const C = AFRAME.CONSTANTS;

AFRAME.state = {
  // Current level and trial
  level: 0,
  trial: 0,
  selectedProcedure: 0,
  gameState: C.STANDBY,

  // Level data retrieved from nn.json file
  cells: [],
  startRow: 0,
  startCol: 0,
  startDirection: 'north',
  startHeight: 0,
  savedLevelData: null,

  instructions: [],
  code: [[]],

  // Current robot position, height, and direction
  row: 0,
  col: 0,
  height: 1,
  direction: 'north',

  // Program execution
  callStack: AFRAME.Stack()
};
