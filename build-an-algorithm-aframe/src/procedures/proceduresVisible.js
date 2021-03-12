/* global AFRAME */

/**
 *
 */
AFRAME.registerComponent('procedures-visible', {

  schema: {
    procIdx: {type: 'number', default: 0}
  },

  tick: function() {
    this.el.setAttribute('visible', this.data.procIdx < AFRAME.state.code.length);
  }

});

