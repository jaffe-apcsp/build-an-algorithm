/* global AFRAME */

const SKIP = 3;

AFRAME.registerComponent('robot-forward', {

  state: {
    moving: false,
    bezier: null,
    t: 0,
    oldPos: null,
    oldCoord: null,
    newPos: null,
    newCoord: null
  },

  init: function() {
    this.el.addEventListener('robot-forward', this.doForward.bind(this));
  },

  doForward: function(evt) {
    let type = evt.detail.type;
    let state = AFRAME.state;
    this.state.oldPos = {row: state.row, col: state.col, height: state.height};
    this.state.oldCoord = AFRAME.UTILITIES.rowColHeightToPosition(state.row, state.col, state.height);

    let newRow = state.row + AFRAME.CONSTANTS.DIRECTION_DELTA[state.direction].row;
    let newCol = state.col + AFRAME.CONSTANTS.DIRECTION_DELTA[state.direction].col;
    let newHeight = AFRAME.UTILITIES.rowColInBounds(newRow, newCol, state.cells) ? state.cells[newRow][newCol] & 7 : state.height;
    this.state.newPos = {row: newRow, col: newCol, height: newHeight};
    this.state.newCoord = AFRAME.UTILITIES.rowColHeightToPosition(newRow, newCol, newHeight);

    let p0 = {x: this.state.oldCoord.x, y: this.state.oldCoord.y+1, z: this.state.oldCoord.z}
    let p1, p2, p3, maxHeight, bezierHeight;

    let isJumpRequired = (newHeight > 0) && (newHeight !== AFRAME.state.height);
    if (isJumpRequired) {
      if (type === 'jump') {
        // Move is OK -- jump to next cell
        maxHeight = Math.max(this.state.oldPos.height, this.state.newPos.height)+0.5;
        bezierHeight = maxHeight*AFRAME.CONSTANTS.BOX_SIZE;
        p1 = {x: this.state.oldCoord.x, y: bezierHeight, z: this.state.oldCoord.z}
        p2 = {x: this.state.newCoord.x, y: bezierHeight, z: this.state.newCoord.z}
        p3 = {x: this.state.newCoord.x, y: this.state.newCoord.y+AFRAME.CONSTANTS.CODE_BLOCK_SIZE, z: this.state.newCoord.z}
      } else {
        // Move won't work -- bump into the block
        p1 = {x: (this.state.oldCoord.x+this.state.newCoord.x)/2, y: this.state.oldCoord.y+1.1, z: (this.state.oldCoord.z+this.state.newCoord.z)/2}
        p2 = p1;
        p3 = {x: this.state.oldCoord.x, y: this.state.oldCoord.y+AFRAME.CONSTANTS.CODE_BLOCK_SIZE, z: this.state.oldCoord.z}
        this.state.newPos = this.state.oldPos;
      }
    } else {
      if (type === 'jump') {
        // No jump needed, just jump in the air
        p1 = {x: this.state.oldCoord.x, y: this.state.oldCoord.y+2, z: this.state.oldCoord.z}
        p2 = {x: this.state.oldCoord.x, y: this.state.oldCoord.y+2, z: this.state.oldCoord.z}
        p3 = {x: this.state.oldCoord.x, y: this.state.oldCoord.y+1, z: this.state.oldCoord.z}
        this.state.newPos = this.state.oldPos;
      } else {
        // Same-level move
        maxHeight = Math.max(this.state.oldPos.height, this.state.newPos.height)+1;
        bezierHeight = maxHeight*(AFRAME.CONSTANTS.BOX_SIZE);
        p1 = {x: this.state.oldCoord.x, y: bezierHeight, z: this.state.oldCoord.z}
        p2 = {x: this.state.newCoord.x, y: bezierHeight, z: this.state.newCoord.z}
        p3 = {x: this.state.newCoord.x, y: this.state.newCoord.y+1, z: this.state.newCoord.z}
      }
    }

    this.state.bezier = AFRAME.Bezier(p0, p1, p2, p3);
    this.state.t = 0;
    this.state.moving = true;
  },

  tick: function(time, delta) {
    if (this.state.moving) {
      if (this.state.t <= 100) {
        let newPos = this.state.bezier(this.state.t/100);
        this.el.setAttribute('position', newPos);
        this.state.t += SKIP;
      } else {
        this.state.moving = false;
        AFRAME.state.row = this.state.newPos.row;
        AFRAME.state.col = this.state.newPos.col;
        AFRAME.state.height = this.state.newPos.height;
        this.stillOnTheBoard.bind(this)();
      }
    }
  },

  stillOnTheBoard: function() {
    if (!AFRAME.UTILITIES.rowColInBounds(this.state.newPos.row, this.state.newPos.col, AFRAME.state.cells) || AFRAME.state.cells[this.state.newPos.row][this.state.newPos.col] === 0) {
      this.el.emit('robot-drop');
      this.el.sceneEl.emit('error', {type: 'robot-off-board'});
      setTimeout(() => document.getElementById('boxes').emit('box-drop-all'), AFRAME.CONSTANTS.DELAY_TO_BOX_DROP);
    } else {
      AFRAME.state.row = this.state.newPos.row;
      AFRAME.state.col = this.state.newPos.col;
      AFRAME.state.height = this.state.newPos.height;
      this.el.sceneEl.emit('robot-move-complete');
    }
  }

});
