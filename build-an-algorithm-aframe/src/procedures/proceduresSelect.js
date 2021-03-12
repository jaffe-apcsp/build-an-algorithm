/* global AFRAME */

/**
 *
 */
AFRAME.registerComponent('procedures-select', {

  schema: {
    procIdx: {type: 'number', default: 0}
  },

  init: function() {
    this.el.addEventListener('click', this.selectProcedure.bind(this));
  },

  selectProcedure: function(evt) {
    AFRAME.state.selectedProcedure = this.data.procIdx;
  }

});

