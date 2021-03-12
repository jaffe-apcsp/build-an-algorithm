/* global AFRAME */

AFRAME.registerComponent('robot-drop', {

  state: {
    dropping: false
  },

  init: function() {
    this.el.addEventListener('robot-drop', this.dropRobot.bind(this));
  },

  tick: function() {
    if (this.state.dropping) {
      let pos = this.el.getAttribute('position');
      if (pos.y < -50) {
        this.state.dropping = false;
        this.el.setAttribute('visible', false);
      }
    }
  },

  dropRobot: function(evt) {
    this.state.dropping = true;
    this.el.removeAttribute('static-body');
    this.el.setAttribute('dynamic-body', {shape: 'box'});
    this.el.emit('play');
  }

});
