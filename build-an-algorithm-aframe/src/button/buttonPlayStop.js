/* global AFRAME */

AFRAME.registerComponent('button-play-stop', {

  init: function() {
    this.el.addEventListener('click', this.startButtonClick.bind(this));
  },

  startButtonClick: function(evt) {
    if (AFRAME.state.gameState === AFRAME.CONSTANTS.STANDBY) {
      this.el.sceneEl.emit('button-play-click');
    } else if (AFRAME.state.gameState === AFRAME.CONSTANTS.LEVEL_COMPLETE) {
      this.el.sceneEl.emit('goto-next-level');
    } else if (AFRAME.state.gameState === AFRAME.CONSTANTS.PLAY) {
      this.el.sceneEl.emit('button-stop-click');
    } else {
      this.el.sceneEl.emit('reset-game');
    }
  },

});
