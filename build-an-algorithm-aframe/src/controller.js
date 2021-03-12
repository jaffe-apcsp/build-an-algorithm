/* global AFRAME */

/**
 *
 */
AFRAME.registerComponent('controller', {

  state: {
    timeout: null,
    completed: false,
    success: false,
    els: {}
  },

  init: function() {
    this.state.els = {
      boxes: document.getElementById('boxes'),
      robot: document.getElementById('robot'),
      procedures: document.getElementById('procedures'),
      instructions: document.getElementById('instructions'),
      instructionSet: document.getElementById('instruction-set'),
      help: document.getElementById('help')
    }
    this.update.bind(this);
    this.el.addEventListener('SELECT_PROCEDURE', this.selectProcedure.bind(this));

    this.el.addEventListener('button-play-click', this.buttonPlayClick.bind(this));
    this.el.addEventListener('button-stop-click', this.buttonStopClick.bind(this));
    this.el.addEventListener('robot-move-complete', this.robotMoveComplete.bind(this));
    this.el.addEventListener('robot-fell-off', this.robotFellOff.bind(this));
    this.el.addEventListener('goto-next-level', this.gotoNextLevel.bind(this));
    this.el.addEventListener('reset-game', this.resetGame.bind(this));
    this.el.addEventListener('start-over', this.startOver.bind(this));

    this.el.addEventListener('error', this.error.bind(this));
    this.initControls();
    let config = this.getLevelTrial();
    if (config) {
      AFRAME.state.level = config.level;
      AFRAME.state.trial = config.trial;
    }
    this.loadLevelData(AFRAME.state.level);
  },

  buttonPlayClick: function(evt) {
    AFRAME.state.gameState = AFRAME.CONSTANTS.PLAY;
    AFRAME.state.callStack.push({procIdx: 0, index: -1});
    this.state.els.procedures.emit('update-select-procedure');
    this.state.timeout = setTimeout(this.next.bind(this), AFRAME.CONSTANTS.DELAY_BETWEEN_STEPS);
  },

  buttonStopClick: function(evt) {
    clearTimeout(this.state.timeout);
    this.drop();
    setTimeout(this.resetGame.bind(this), AFRAME.CONSTANTS.DELAY_TO_RESET);
  },

  drop: function() {
    AFRAME.state.gameState = AFRAME.CONSTANTS.FAIL;
    this.dropBoxes();
    let _this = this
    setTimeout(() => _this.state.els.robot.emit('robot-drop'), AFRAME.CONSTANTS.DELAY_TO_ROBOT_DROP);
  },

  dropBoxes: function() {
    this.state.els.boxes.emit('box-drop-all');
  },

  error: function(evt) {
    switch (evt.detail.type) {
      case 'light-error':
        AFRAME.state.gameState = AFRAME.CONSTANTS.FAIL_LIGHT_INCORRECT;
        break;

      case 'robot-off-board':
        AFRAME.state.gameState = AFRAME.CONSTANTS.FAIL_FALL;
        break;
    }
  },

  // Program execution
  execute: function() {
    let { procIdx, index } = AFRAME.state.callStack.peek();
    let inst = AFRAME.state.code[procIdx][index];
    switch (inst) {
      case 'forward':
        this.state.els.robot.emit('robot-forward', {type: 'forward'});
        break;

      case 'right':
      case 'left':
        this.state.els.robot.emit('robot-turn', {turn: inst});
        break;

      case 'light':
        AFRAME.state.cells[AFRAME.state.row][AFRAME.state.col] = AFRAME.state.cells[AFRAME.state.row][AFRAME.state.col] | AFRAME.CONSTANTS.LIT;
        this.state.timeout = setTimeout(this.next.bind(this), AFRAME.CONSTANTS.DELAY_AFTER_LIGHT);
        break;

      case 'jump':
        this.state.els.robot.emit('robot-forward', {type: 'jump'});
        break;

      default: break;
    }
  },

  getLevelTrial: function() {
    let lt = localStorage.getItem('baa');
    return JSON.parse(lt);
  },

  gotoNextLevel: function() {
    this.dropBoxes();
    this.state.els.robot.emit('robot-twirl');
    AFRAME.state.gameState = AFRAME.CONSTANTS.STANDBY;
    AFRAME.state.trial = 0;
    AFRAME.state.level++;
    AFRAME.state.callStack.clear();
    setTimeout(() => this.loadLevelData(AFRAME.state.level), 2000);
  },

  initControls: function() {
    // ************ Available instruction blocks
    const caption = document.createElement('a-entity');
    caption.setAttribute('name', 'caption');
    caption.setAttribute('material', {color: AFRAME.CONSTANTS.BORDER_COLOR});
    caption.setAttribute('geometry', {
      primitive: 'plane',
      height: C.CAPTION_HEIGHT,
      width: (AFRAME.CONSTANTS.INSTRUCTION_LIBRARY_SIZE * AFRAME.CONSTANTS.CODE_BLOCK_SIZE)+((AFRAME.CONSTANTS.CODE_BLOCK_SIZE - AFRAME.CONSTANTS.CODE_BLOCK_SCALE) * 2)
    });
    caption.setAttribute('position', {
      x: -0.5 + (AFRAME.CONSTANTS.INSTRUCTION_LIBRARY_SIZE * AFRAME.CONSTANTS.CODE_BLOCK_SIZE) / 2,
      y: 0.80,
      z: 0
    });
    caption.setAttribute('text', {
      value: 'Code blocks',
      align: 'center',
      baseline: 'center',
      width: AFRAME.CONSTANTS.CAPTION_TEXT_SIZE
    });
    this.state.els.instructionSet.appendChild(caption);

    // Horizontal dividers
    for (let i=0; i<2; i++) {
      let e = document.createElement('a-entity');
      e.setAttribute('name', 'divider');
      e.setAttribute('material', {color: AFRAME.CONSTANTS.BORDER_COLOR});
      e.setAttribute('scale', {
        x: AFRAME.CONSTANTS.CODE_BLOCK_SCALE,
        y: AFRAME.CONSTANTS.CODE_BLOCK_SCALE,
        z: AFRAME.CONSTANTS.CODE_BLOCK_SCALE
      });
      e.setAttribute('geometry', {
        primitive: 'plane',
        height: (C.CODE_BLOCK_SIZE - C.CODE_BLOCK_SCALE) * 2,
        width: (AFRAME.CONSTANTS.INSTRUCTION_LIBRARY_SIZE * C.CODE_BLOCK_SIZE) + ((C.CODE_BLOCK_SIZE - C.CODE_BLOCK_SCALE) * 6),
      });
      e.setAttribute('position', {
        x: -0.5 + (AFRAME.CONSTANTS.INSTRUCTION_LIBRARY_SIZE * C.CODE_BLOCK_SIZE) / 2,
        y: 0.5 - (i * C.CODE_BLOCK_SIZE),
        z: 0
      });
      this.state.els.instructionSet.appendChild(e);
    }

    // Vertical dividers
    for (let i=0; i<=AFRAME.CONSTANTS.INSTRUCTION_LIBRARY_SIZE; i++) {
      let e = document.createElement('a-entity');
      e.setAttribute('name', 'divider');
      e.setAttribute('material', {color: AFRAME.CONSTANTS.BORDER_COLOR});
      e.setAttribute('scale', {
        x: AFRAME.CONSTANTS.CODE_BLOCK_SCALE,
        y: AFRAME.CONSTANTS.CODE_BLOCK_SCALE,
        z: AFRAME.CONSTANTS.CODE_BLOCK_SCALE
      });
      e.setAttribute('geometry', {
        primitive: 'plane',
        height: C.CODE_BLOCK_SIZE + ((C.CODE_BLOCK_SIZE - C.CODE_BLOCK_SCALE) * 3),
        width: (C.CODE_BLOCK_SIZE - C.CODE_BLOCK_SCALE) * 2,
      });
      e.setAttribute('position', {
        x: -0.5 + (i * C.CODE_BLOCK_SIZE),
        y: 0.5 - C.CODE_BLOCK_SIZE / 2,
        z: 0
      });
      this.state.els.instructionSet.appendChild(e);
    }

    // Instructions blocks
    for (let i=0; i<AFRAME.CONSTANTS.INSTRUCTION_LIBRARY_SIZE; i++) {
      let e = document.createElement('a-entity');
      e.setAttribute('name', 'instruction');
      e.setAttribute('hover', true);
      e.setAttribute('geometry', {primitive: 'plane', height: C.CODE_BLOCK_SIZE, width: C.CODE_BLOCK_SIZE});
      e.setAttribute('material', {color: 'white', opacity: 0})
      e.setAttribute('position', {x: i, y: 0, z: 0});
      e.setAttribute('scale', {
        x: AFRAME.CONSTANTS.INSTRUCTION_BLOCK_SCALE,
        y: AFRAME.CONSTANTS.INSTRUCTION_BLOCK_SCALE,
        z: AFRAME.CONSTANTS.INSTRUCTION_BLOCK_SCALE
      });
      e.setAttribute('instruction-update', {index: i});
      this.state.els.instructionSet.appendChild(e);
    }

    // ************* PROCEDURES
    for (let procIdx=0; procIdx<3; procIdx++) {
      // Instruction blocks
      let proc = document.createElement('a-entity');
      proc.setAttribute('position', {x: 3, y: 0 - (procIdx * 4), z: 0})
      proc.setAttribute('procedures-select', {procIdx});
      proc.setAttribute('procedures-visible', {procIdx});

      const caption = document.createElement('a-entity');
      caption.setAttribute('name', 'caption');
      caption.setAttribute('procedure-color', {procIdx});
      caption.setAttribute('material', {color: AFRAME.CONSTANTS.BORDER_COLOR});
      caption.setAttribute('geometry', {
        primitive: 'plane',
        height: C.CAPTION_HEIGHT,
        width: (AFRAME.CONSTANTS.CODE_BLOCK_COL_COUNT * AFRAME.CONSTANTS.CODE_BLOCK_SIZE)+((AFRAME.CONSTANTS.CODE_BLOCK_SIZE - AFRAME.CONSTANTS.CODE_BLOCK_SCALE) * 2)
      });
      caption.setAttribute('position', {
        x: -0.5 + (AFRAME.CONSTANTS.CODE_BLOCK_COL_COUNT * AFRAME.CONSTANTS.CODE_BLOCK_SIZE) / 2,
        y: 0.80,
        z: 0
      });
      let captionText = procIdx === 0 ? 'Main procedure' : 'Procedure '+procIdx
      caption.setAttribute('text', {
        value: captionText,
        align: 'center',
        baseline: 'center',
        width: AFRAME.CONSTANTS.CAPTION_TEXT_SIZE
      });
      proc.appendChild(caption);

      // Horizontal dividers
      for (let i=0; i<=AFRAME.CONSTANTS.CODE_BLOCK_ROW_COUNT; i++) {
        let e = document.createElement('a-entity');
        e.setAttribute('name', 'divider');
        e.setAttribute('material', {color: AFRAME.CONSTANTS.BORDER_COLOR});
        e.setAttribute('procedure-color', {procIdx});
        e.setAttribute('scale', {
          x: AFRAME.CONSTANTS.CODE_BLOCK_SCALE,
          y: AFRAME.CONSTANTS.CODE_BLOCK_SCALE,
          z: AFRAME.CONSTANTS.CODE_BLOCK_SCALE
        });
        e.setAttribute('geometry', {
          primitive: 'plane',
          height: (C.CODE_BLOCK_SIZE - C.CODE_BLOCK_SCALE) * 2,
          width: (AFRAME.CONSTANTS.CODE_BLOCK_COL_COUNT * C.CODE_BLOCK_SIZE) + ((C.CODE_BLOCK_SIZE - C.CODE_BLOCK_SCALE) * 6),
        });
        e.setAttribute('position', {
          x: -0.5 + (AFRAME.CONSTANTS.CODE_BLOCK_COL_COUNT * C.CODE_BLOCK_SIZE) / 2,
          y: 0.5 - (i * C.CODE_BLOCK_SIZE),
          z: 0
        });
        proc.appendChild(e);
      }

      // Vertical dividers
      for (let i=0; i<=AFRAME.CONSTANTS.CODE_BLOCK_COL_COUNT; i++) {
        let e = document.createElement('a-entity');
        e.setAttribute('name', 'divider');
        e.setAttribute('procedure-color', {procIdx});
        e.setAttribute('material', {color: AFRAME.CONSTANTS.BORDER_COLOR});
        e.setAttribute('scale', {
          x: AFRAME.CONSTANTS.CODE_BLOCK_SCALE,
          y: AFRAME.CONSTANTS.CODE_BLOCK_SCALE,
          z: AFRAME.CONSTANTS.CODE_BLOCK_SCALE
        });
        e.setAttribute('geometry', {
          primitive: 'plane',
          height: C.CODE_BLOCK_ROW_COUNT + ((C.CODE_BLOCK_SIZE - C.CODE_BLOCK_SCALE) * 3),
          width: (C.CODE_BLOCK_SIZE - C.CODE_BLOCK_SCALE) * 2,
        });
        e.setAttribute('position', {
          x: -0.5 + (i * C.CODE_BLOCK_SIZE),
          y: -0.5 - C.CODE_BLOCK_SIZE / 2,
          z: 0
        });
        proc.appendChild(e);
      }

      // Instructions blocks
      for (let i=0; i<=AFRAME.CONSTANTS.CODE_BLOCK_ROW_COUNT * AFRAME.CONSTANTS.CODE_BLOCK_COL_COUNT; i++) {
        let row = parseInt(i / 4);
        let col = i % 4;
        let e = document.createElement('a-entity');
        e.setAttribute('name', 'instruction');
        e.setAttribute('hover', true);
        e.setAttribute('geometry', {primitive: 'plane', height: C.CODE_BLOCK_SIZE, width: C.CODE_BLOCK_SIZE});
        e.setAttribute('material', {color: 'white', opacity: 0})
        e.setAttribute('position', {x: col, y: -row, z: 0});
        e.setAttribute('scale', {
          x: AFRAME.CONSTANTS.INSTRUCTION_BLOCK_SCALE,
          y: AFRAME.CONSTANTS.INSTRUCTION_BLOCK_SCALE,
          z: AFRAME.CONSTANTS.INSTRUCTION_BLOCK_SCALE
        });
        e.setAttribute('procedure-update', {procIdx, index: i})
        proc.appendChild(e);
      }
      this.state.els.procedures.appendChild(proc);
    }
  },

  isComplete: function() {
    for (let row = 0; row < AFRAME.state.cells.length; row++) {
      for (let col=0; col < AFRAME.state.cells[row].length; col++) {
        if (((AFRAME.state.cells[row][col] & AFRAME.CONSTANTS.SHOULD_LIGHT) > 0) &&
          ((AFRAME.state.cells[row][col] & AFRAME.CONSTANTS.LIT) === 0))
          return false;
      }
    }
    return true;
  },

  // Load the JSON data for each level
  loadLevelData: function(level) {
    if (level >= AFRAME.CONSTANTS.MAX_LEVEL) {
      AFRAME.state.gameState = AFRAME.CONSTANTS.GAME_COMPLETE;
    } else {
      let _this = this;
      fetch('./levels/' + level + '.json')
        .then(val => val.json())
        .then(gameData => {
          // Set game state
          _this.helpText = "";
          AFRAME.state = {...AFRAME.state, ...gameData};
          AFRAME.state.helpText = gameData.helpText ? gameData.helpText : null;
          AFRAME.state.row = gameData.startRow;
          AFRAME.state.col = gameData.startCol;
          AFRAME.state.height = gameData.startHeight;
          AFRAME.state.direction = gameData.startDirection;
          AFRAME.state.savedLevelData = R.clone(gameData);
          AFRAME.state.callStack.clear();

          _this.state.els.boxes.emit('box-build', AFRAME.state);
          _this.state.els.robot.emit('init-robot-place', AFRAME.state);
          if (AFRAME.state.helpText) {
            _this.state.els.help.emit('help-update', AFRAME.state.helpText);
          } else {
            _this.state.els.help.emit('help-remove');
          }
        });
    }
  },

  next: function() {
    if (AFRAME.state.gameState !== AFRAME.CONSTANTS.PLAY) return;
    if (AFRAME.state.callStack.isEmpty()) {
      // Finished executing the procedures
      this.state.completed = true;
      if (this.isComplete()) {
        AFRAME.state.gameState = AFRAME.CONSTANTS.LEVEL_COMPLETE;
        this.saveLevelTrial({level: AFRAME.state.level+1, trial: 0});
      } else {
        AFRAME.state.gameState = AFRAME.CONSTANTS.FAIL_INCOMPLETE;
        this.saveLevelTrial({level: AFRAME.state.level, trial: AFRAME.state.trial});
      }
    } else {
      AFRAME.state.callStack.nextInstruction();
      let proc = AFRAME.state.callStack.peek();
      let { procIdx, index } = proc;
      if (index >= AFRAME.state.code[procIdx].length) {
        // End of procedure
        AFRAME.state.callStack.pop();
        this.state.timeout = setTimeout(this.next.bind(this), AFRAME.CONSTANTS.DELAY_BETWEEN_STEPS);
      } else {
        // Execute statement
        const regex =/\d/;
        let match = AFRAME.state.code[procIdx][index].match(regex);
        if (match) {
          AFRAME.state.callStack.push({procIdx: parseInt(match[0],10), index: -1});
          this.next.bind(this)();
        } else {
          // Execute instruction
          this.execute.bind(this)();
        }
      }
    }
  },

  resetGame: function() {
    this.drop();
    let _this = this;
    setTimeout(() => {
      AFRAME.state.row = AFRAME.state.savedLevelData.startRow;
      AFRAME.state.col = AFRAME.state.savedLevelData.startCol;
      AFRAME.state.height = AFRAME.state.savedLevelData.startHeight;
      AFRAME.state.direction = AFRAME.state.savedLevelData.startDirection;
      AFRAME.state.cells = R.clone(AFRAME.state.savedLevelData.cells);
      AFRAME.state.trial++;
      AFRAME.state.gameState = AFRAME.CONSTANTS.STANDBY;
      AFRAME.state.callStack.clear();
      _this.state.els.boxes.emit('box-build', AFRAME.state);
      _this.state.els.robot.emit('init-robot-place', AFRAME.state);
      _this.state.els.procedures.emit('update-select-procedure');
      _this.saveLevelTrial({level: AFRAME.state.level, trial: AFRAME.state.trial});
    }, AFRAME.CONSTANTS.DELAY_TO_RESET);
  },

  robotFellOff: function() {
    AFRAME.state.gameState = AFRAME.CONSTANTS.FAIL_FALL;
    this.state.els.robot.emit('robot-drop');
    setTimeout(() => {
      this.state.els.boxes.emit('box-drop-all');
    }, AFRAME.CONSTANTS.DELAY_TO_BOX_DROP);
  },

  robotMoveComplete: function() {
    this.state.timeout = setTimeout(this.next.bind(this), AFRAME.CONSTANTS.DELAY_AFTER_MOVE);
  },

  saveLevelTrial: function(obj) {
    localStorage.setItem('baa', JSON.stringify(obj));
  },

  selectProcedure: function(evt) {
    AFRAME.state.selectedProcedure = evt.detail.procIdx;
    this.state.els.procedures.emit('update-select-procedure', AFRAME.state);
  },

  startOver: function() {
    let _this = this;
    this.drop();
    setTimeout(() => {
      AFRAME.state.gameState = AFRAME.CONSTANTS.STANDBY;
      AFRAME.state.trial = 0;
      AFRAME.state.level = 0;
      AFRAME.state.callStack.clear();
      _this.saveLevelTrial({level: 0, trial: 0});
      _this.loadLevelData(0);
    }, AFRAME.CONSTANTS.DELAY_TO_RESET)
  },

});

