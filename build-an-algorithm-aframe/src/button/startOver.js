/* global AFRAME */

AFRAME.registerComponent('start-over', {

  init: function() {
    this.el.addEventListener('click', this.startButtonClick.bind(this));
  },

  startButtonClick: function(evt) {
    this.el.sceneEl.emit('start-over');
  },

});
