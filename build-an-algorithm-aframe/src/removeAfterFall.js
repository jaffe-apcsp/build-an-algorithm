/* global AFRAME */

/**
 *
 */
AFRAME.registerComponent('remove-after-fall', {

  schema: {
    whatToDo: {type: 'string', default: 'remove'} // remove || hide
  },

  tick: function() {
    let position = this.el.getAttribute('position');
    if (position.y < -50) {
      if (this.data.whatToDo === 'remove') {
        this.el.parentNode.removeChild(this.el);
      } else if (this.data.whatToDo === 'hide') {
        this.el.setAttribute('visible', false);
        this.el.removeAttribute('dynamic-body');
      }
    }
  }

});

