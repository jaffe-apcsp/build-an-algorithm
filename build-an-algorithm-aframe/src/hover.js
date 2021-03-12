/* global AFRAME */

/**
 *
 */
AFRAME.registerComponent('hover', {

  init: function() {
    this.el.addEventListener('mouseenter', this.mouseEnter.bind(this));
    this.el.addEventListener('mouseleave', this.mouseLeave.bind(this));
  },

  mouseEnter: function(evt) {
    this.el.setAttribute('material', {color: AFRAME.CONSTANTS.INSTRUCTION_SELECTED_COLOR});
  },

  mouseLeave: function(evt) {
    this.el.setAttribute('material', {color: AFRAME.CONSTANTS.INSTRUCTION_UNSELECTED_COLOR});
  }

});

