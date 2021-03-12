/* global AFRAME */

AFRAME.registerComponent('box-build', {

  init: function() {
    this.el.addEventListener('box-build', this.boxBuild.bind(this));
  },

  remove: function() {
    this.el.removeEventListener('box-build', this.boxBuild);
  },

  boxBuild: function(evt) {
    let cells = evt.detail.cells;
    if (cells.length === 0) return;
    cells.forEach((rowArr, row) => {
      rowArr.forEach((cell, col) => {
        if (cell === 0) return;
        this.createBox(this.el, row, col, cell);
      });
    });
    this.el.sceneEl.emit('box-build-complete');
  },

  createBox: function(entity, row, col, cell) {
    let height = cell & 7;
    for (let h = 1; h <= height; h++) {
      let box = document.createElement('a-entity');
      box.setAttribute('mixin', 'box-mixin');
      if (h === height) {
        box.setAttribute('box-update', true);
      }
      box.setAttribute('id', 'box_' + row + '_' + col);
      box.setAttribute('name', 'box');
      box.setAttribute('row', row);
      box.setAttribute('col', col);
      let startPosition = AFRAME.UTILITIES.rowColHeightToPosition(row, col, h);
      box.setAttribute('position',
        AFRAME.UTILITIES.rowColHeightToPosition(row, col, h));
      box.setAttribute('scale', {
        x:AFRAME.CONSTANTS.BOX_SCALE,
        y:AFRAME.CONSTANTS.BOX_SCALE,
        z:AFRAME.CONSTANTS.BOX_SCALE
      });
      box.setAttribute('material', {color: AFRAME.CONSTANTS.GRAY_COLOR});
      if (h === height) {
        if ((cell & AFRAME.CONSTANTS.SHOULD_LIGHT) > 0) {
          box.setAttribute('material', {color: AFRAME.CONSTANTS.SHOULD_LIGHT_COLOR})
        } else if ((cell & AFRAME.CONSTANTS.LIT) > 0) {
          box.setAttribute('material', {color: AFRAME.CONSTANTS.LIT_COLOR})
        }
      }
      entity.appendChild(box);
    }
  },

});
