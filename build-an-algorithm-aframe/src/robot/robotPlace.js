/* global AFRAME */

AFRAME.registerComponent('robot-place', {

  init: function() {
    this.el.addEventListener('init-robot-place', this.placeRobot.bind(this));
  },

  placeRobot: function(evt) {
    let state = AFRAME.state;
    this.el.removeAttribute('dynamic-body');
    this.el.setAttribute('static-body');
    this.el.setAttribute('visible', true);
    this.el.setAttribute('rotation', {
      x: 0,
      y: AFRAME.CONSTANTS.DIRECTION_ROT[state.direction],
      z: 0
    });
    this.el.setAttribute('position',
      AFRAME.UTILITIES.rowColHeightToPosition(
        state.row,
        state.col,
        state.height + 1
      )
    );
  },

});
