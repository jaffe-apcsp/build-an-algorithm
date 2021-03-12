/* global AFRAME */

/**
 * Box factory component that creates the boxes based on the data passed
 * in the setup-boxes message. This component also drops the boxes.
 * The boxes take care of removing themselves from the scene after they drop
 *
 * Boxes are arranged in an NxN size matrix and 0,0 is the center
 * The data is an array of objects with each element representing a
 * box.  The object looks like this:
 * {
 *   row,                       // Row number
 *   col,                       // Column number
 *   height: n                  // level above ground
 *   shouldLight: true/false    // true if block must be lit
 *   start: true/false          // true if this is the starting block
 * }
 *
 */
AFRAME.registerComponent('robot-set-jump', {

  init: function() {
    this.el.addEventListener('robot-set-jump', this.setJump.bind(this));
  },

  setJump: function(evt) {
    let state = AFRAME.state;
    let newRow = state.row + AFRAME.CONSTANTS.DIRECTION_DELTA[state.direction].row;
    let newCol = state.col + AFRAME.CONSTANTS.DIRECTION_DELTA[state.direction].col;
    let newHeight = AFRAME.UTILITIES.rowColInBounds(newRow, newCol, state.cells) ? state.cells[newRow][newCol] & 7 : state.cells[state.row][state.col];

    let startPosition = AFRAME.UTILITIES.rowColHeightToPosition(state.row, state.col, state.height);
    let endPosition = AFRAME.UTILITIES.rowColHeightToPosition(newRow, newCol, newHeight);
    let midPosition = AFRAME.UTILITIES.computeMidBezierPosition(startPosition, endPosition);

    startPosition.y++;
    endPosition.y++;
    midPosition.y++;

    document.getElementById('bezier-0').setAttribute('position', startPosition);
    document.getElementById('bezier-1').setAttribute('position', midPosition);
    document.getElementById('bezier-2').setAttribute('position', endPosition);
  }

});
