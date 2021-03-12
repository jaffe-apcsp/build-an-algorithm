/* global AFRAME */

AFRAME.registerComponent('button-state', {

  state: 'Play',

  tick: function() {
    switch(AFRAME.state.gameState) {
      case AFRAME.CONSTANTS.STANDBY:
        if (this.state === 'Play') return;
        this.state = 'Play';
        this.el.setAttribute('text', {value: 'Play', color: 'black'});
        this.el.setAttribute('material', {color: AFRAME.CONSTANTS.BUTTON_PLAY_COLOR});
        break;

      case AFRAME.CONSTANTS.PLAY:
        if (this.state === 'Running - Click to stop') return;
        this.state = 'Running - Click to stop';
        this.el.setAttribute('text', {value: this.state, color: 'white'});
        this.el.setAttribute('material', {color: AFRAME.CONSTANTS.BUTTON_STOP_COLOR});
        break;

      case AFRAME.CONSTANTS.FAIL_INCOMPLETE:
        if (this.state === 'Incomplete - Try again') return;
        this.state = 'Incomplete - Try again';
        this.el.setAttribute('text', {value: this.state, color: 'white'});
        this.el.setAttribute('material', {color: 'red'});
        break;

      case AFRAME.CONSTANTS.FAIL_FALL:
        if (this.state === 'You fell - Try again') return;
        this.state = 'You fell - Try again';
        this.el.setAttribute('text', {value: this.state, color: 'white'});
        this.el.setAttribute('material', {color: 'red'});
        break;

      case AFRAME.CONSTANTS.FAIL_LIGHT_INCORRECT:
        if (this.state === 'You lit the wrong light - Try again') return;
        this.state = 'You lit the wrong light - Try again';
        this.el.setAttribute('text', {value: this.state, color: 'white'});
        this.el.setAttribute('material', {color: 'red'});
        break;

      case AFRAME.CONSTANTS.LEVEL_COMPLETE:
        if (this.state === 'Congratulations!! Click to next Level') return;
        this.state = 'Congratulations!! Click to next Level';
        this.el.setAttribute('text', {value: this.state, color: 'black'});
        this.el.setAttribute('material', {color: AFRAME.CONSTANTS.BUTTON_PLAY_COLOR});
        break;

      case AFRAME.CONSTANTS.GAME_COMPLETE:
        this.el.setAttribute('visible', false);
        break;
    }
  },

});
