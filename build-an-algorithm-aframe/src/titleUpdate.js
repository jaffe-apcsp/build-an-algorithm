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
AFRAME.registerComponent('title-update', {

  state: {
    level: null,
    trial: null
  },

  tick: function() {
    let state = AFRAME.state;
    if (AFRAME.state.level === this.state.level && state.trial === this.state.trial) return;
    let title = "Build an Algorithm: "+AFRAME.state.levelText+' (Level '+(state.level+1)+' | Trial '+(state.trial+1)+')';
    if (AFRAME.state.level >= AFRAME.CONSTANTS.MAX_LEVEL) {
      title = "CONGRATULATIONS -- YOU'VE FINISHED!!"
    }
    this.el.setAttribute('text', {value: title});
  }

});
