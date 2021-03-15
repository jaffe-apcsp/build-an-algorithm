import C from './Constants';

const initState = {
  // Current level and trial
  gameState: C.STANDBY,
  level: 0,
  trial: 0,
  // hydrateFlag: -1,

  // Level data retrieved from nn.json file
  cells: [
    [0,10,0,0,0,0,0,0],
    [0,1,0,0,0,0,0,0],
    [0,1,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0]
  ],
  startRow: 2,
  startCol: 1,
  startDirection: 'north',
  startHeight: 1,

  // Current robot position, height, and direction
  row: 2,
  col: 1,
  height: 1,
  direction: 'north',
  code: [
    ["forward","forward","light","right","left","jump","p1","p2"],
    ["p1","p2"],
    ["jump"]
  ],
  blocks: ["forward","right","left","light"],

  selectedProcedure: 0,
};

export default initState
