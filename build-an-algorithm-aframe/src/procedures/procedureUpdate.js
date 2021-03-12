/* global AFRAME */

/**
 *
 */
AFRAME.registerComponent('procedure-update', {

  schema: {
    procIdx: {type: 'number', default: 0},
    index: {type: 'number', default: 0}
  },

  init: function() {
    this.el.addEventListener('click', this.removeInstruction.bind(this));
  },

  removeInstruction: function(evt) {
    AFRAME.state.code[this.data.procIdx].splice(this.data.index, 1);
  },

  tick: function(time, delta) {
    // Update the icon based on the instructions in each procedure
    if ((this.data.procIdx < AFRAME.state.code.length) &&
      (this.data.index < AFRAME.state.code[this.data.procIdx].length)) {
      let inst = AFRAME.state.code[this.data.procIdx][this.data.index];
      this.el.setAttribute('material', {src: './assets/'+inst+'.png', opacity: 1});
    } else {
      this.el.setAttribute('material', {opacity: 0})
    }

    // Update the color based on the currently executing instruction
    let color = this.el.getAttribute('material').color;
    if (AFRAME.state.gameState === AFRAME.CONSTANTS.PLAY ||
      AFRAME.state.gameState === AFRAME.CONSTANTS.FAIL_FALL ||
      AFRAME.state.gameState === AFRAME.CONSTANTS.FAIL_INCOMPLETE ||
      AFRAME.state.gameState === AFRAME.CONSTANTS.FAIL_LIGHT_INCORRECT) {
      // If the game is running do the update
      if (AFRAME.state.callStack.isInstructionActive(this.data.procIdx, this.data.index)) {
        if (color === AFRAME.CONSTANTS.INSTRUCTION_UNSELECTED_COLOR) {
          this.el.setAttribute('material', {color: AFRAME.CONSTANTS.INSTRUCTION_CURRENT_COLOR});
        }
      } else {
        if (color === AFRAME.CONSTANTS.INSTRUCTION_CURRENT_COLOR) {
          this.el.setAttribute('material', {color: AFRAME.CONSTANTS.INSTRUCTION_UNSELECTED_COLOR})
        }
      }
    } else if (color === AFRAME.CONSTANTS.INSTRUCTION_CURRENT_COLOR) {
      // If the game isn't running, clear all blocks that are still showing as
      // the current executing instruction
      this.el.setAttribute('material', {color: AFRAME.CONSTANTS.INSTRUCTION_UNSELECTED_COLOR});
    }
  }

});

