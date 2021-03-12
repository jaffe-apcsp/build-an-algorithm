import C from './Constants';
import Stack from './Stack';

/**
 * @param props: Initial data
 * @returns Initial program state
 */

export default props => {
  return {
    userHash: '',
    studentId: '',
    level: 0,
    trial: 0,
    finished: false,

    _levelData: null,             // Saved copy to use when reloading

    position: {row: 0, col: 0},
    direction: 0,                 // 0:north, 1:east, 2:south, 3:west
    gameState: C.GAME_STATE.STANDBY,  // 0=standby, 1=running,
                                      // 2=complete, 3=incomplete, 4=error

    codeWindow: "0",        // "0"=main, "1"=proc1, "2"=proc2
    procedureCount: 0,
    procIdx: 0,
    codes: [[]],
    step: 0,

    error: false,
    finishInWrongSpot: false,
    notAllLit: false,
    invalidPosition: false,
    success: false,

    enableForward: true,
    enableRight: true,
    enableLeft: true,
    enableLight: true
  }
}

