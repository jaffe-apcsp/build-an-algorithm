/* global AFRAME */

AFRAME.registerComponent('robot-twirl', {

  state: {
    moving: false,
    rotation: 0,
    rotationIncrement: 10,
    FULL_ROTATION: 360,
    JUMP_INCREMENT: 0.1
  },

  init: function() {
    this.el.addEventListener('robot-twirl', this.robotTwirl.bind(this));
  },

  robotTwirl: function() {
    this.state.moving = true;
  },

  tick: function() {
    if (this.state.moving) {
      if (this.state.rotation < 2 * this.state.FULL_ROTATION) {
        let _rotation = this.el.getAttribute('rotation');
        this.state.rotation += this.state.rotationIncrement;
        _rotation.z = this.state.rotation;
        this.el.setAttribute('rotation', _rotation);
        let position = this.el.getAttribute('position');
        position.y += this.state.JUMP_INCREMENT;
        this.el.setAttribute('position', position);
      } else {
        this.state.moving = false;
        this.state.rotation = 0;
      }
    }
  },

  getNewDirection: function(direction, turn) {
    if (turn === 'right') {
      switch (direction) {
        case 'north': return 'east';
        case 'east': return 'south';
        case 'south': return 'west';
        case 'west': return 'north';
      }
    } else if (turn === 'left') {
      switch(direction) {
        case 'north': return 'west';
        case 'east': return 'north';
        case 'south': return 'east';
        case 'west': return 'south';
      }
    }
    return null;
  },

});
