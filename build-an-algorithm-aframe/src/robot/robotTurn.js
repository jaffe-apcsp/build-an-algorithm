/* global AFRAME */

AFRAME.registerComponent('robot-turn', {

  state: {
    moving: false,
    increment: 5,
    direction: null,
    total: null
  },

  init: function() {
    this.el.addEventListener('robot-turn', this.robotTurn.bind(this));
  },

  robotTurn: function(evt) {
    AFRAME.state.direction = this.getNewDirection(AFRAME.state.direction, evt.detail.turn);
    this.state.direction = evt.detail.turn === 'right' ? -1 : 1;
    this.state.total = 0;
    this.state.moving = true;
  },

  tick: function() {
    if (this.state.moving) {
      if (this.state.total < 90) {
        let rotation = this.el.getAttribute('rotation');
        rotation.y = rotation.y + (this.state.increment * this.state.direction);
        this.el.setAttribute('rotation', rotation);
        this.state.total += this.state.increment;
      } else {
        this.state.moving = false;
        this.el.sceneEl.emit('robot-move-complete');
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
