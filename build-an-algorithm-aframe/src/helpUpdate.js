/* global AFRAME */

// HTML to add to the help component when ready
// geometry="primitive: plane; width: 8; height: 5"
// text="value: Help; align: center; width:15; color:black"

AFRAME.registerComponent('help-update', {

  init: function() {
    this.el.addEventListener('help-update', this.helpUpdate.bind(this));
    this.el.addEventListener('help-remove', this.helpRemove.bind(this));
  },

  helpUpdate: function(evt) {
    this.el.setAttribute('text', {value: evt.detail});
    this.el.setAttribute('visible', true);
  },

  helpRemove: function(evt) {
    this.el.setAttribute('visible', false);
  }

});
