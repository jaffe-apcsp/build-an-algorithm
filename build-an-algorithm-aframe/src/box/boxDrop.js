/* global AFRAME */

/**
 *
 */
AFRAME.registerComponent('box-drop', {

  init: function() {
    this.el.addEventListener('box-drop', this.dropBox);
  },

  dropBox: function() {
    this.removeAttribute('static-body');
    this.setAttribute('dynamic-body', {shape: 'box'});
    let force = new CANNON.Vec3(
      Math.random()*30-15,
      Math.random()*-5,
      Math.random()*10-5
    );
    let local = new CANNON.Vec3(0,0,0);
    this.body.applyImpulse(force, local);
  },

  remove: function() {
    this.el.removeEventListener('box-drop', this.dropBox);
  }

});

