/* global AFRAME */

AFRAME.registerComponent('box-update', {

  tick: function(time, delta) {
    // Set lit status
    let row = this.el.getAttribute('row');
    let col = this.el.getAttribute('col');
    if ((AFRAME.state.cells[row][col] & AFRAME.CONSTANTS.LIT) > 0) {
      if ((AFRAME.state.cells[row][col] & AFRAME.CONSTANTS.SHOULD_LIGHT) > 0) {
        this.el.setAttribute('material', {color: AFRAME.CONSTANTS.LIT_COLOR});
      } else {
        this.el.setAttribute('material', {color: AFRAME.CONSTANTS.LIT_ERROR_COLOR});
        this.el.sceneEl.emit('error', {type: 'light-error'});
      }
    }
  }

});
