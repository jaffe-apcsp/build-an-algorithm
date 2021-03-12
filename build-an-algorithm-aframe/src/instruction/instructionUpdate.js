/* global AFRAME */

/**
 *
 */
AFRAME.registerComponent('instruction-update', {

  schema: {
    index: {type: 'number', default: 0}
  },

  init: function() {
    this.el.addEventListener('click', this.addInstruction.bind(this));
  },

  tick: function() {
    if (this.data.index < AFRAME.state.instructions.length) {
      let inst = AFRAME.state.instructions[this.data.index];
      this.el.setAttribute('material', {src: './assets/' + inst + '.png', opacity: 1});
    } else {
      this.el.setAttribute('material', {opacity: 0});
    }
  },

  addInstruction: function(evt) {
    if (AFRAME.state.code[AFRAME.state.selectedProcedure].length < AFRAME.CONSTANTS.CODE_BLOCK_ROW_COUNT*AFRAME.CONSTANTS.CODE_BLOCK_COL_COUNT) {
      AFRAME.state.code[AFRAME.state.selectedProcedure].push(AFRAME.state.instructions[this.data.index]);
    }
  },
});

