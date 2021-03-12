/* global AFRAME */

AFRAME.registerComponent('box-drop-all', {

  init: function() {
    this.el.addEventListener('box-drop-all', this.boxDropAll.bind(this));
  },

  boxDropAll: function() {
    let boxes = document.getElementsByName('box');
    for (let i=0; i<boxes.length; i++) {
      boxes[i].emit('box-drop');
    }
  }

});
