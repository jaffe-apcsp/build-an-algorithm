/* global AFRAME */

/**
 *
 */
AFRAME.registerComponent('procedure-color', {

  schema: {
    procIdx: {type: 'number', default: 0},
  },

  tick: function(time, delta) {
    if (this.data.procIdx === AFRAME.state.selectedProcedure) {
      this.el.setAttribute('material', {color: AFRAME.CONSTANTS.BORDER_COLOR_SELECTED});
    } else {
      this.el.setAttribute('material', {color: AFRAME.CONSTANTS.BORDER_COLOR});
    }
  }

});

