AFRAME.registerComponent('rounded-button', {

  schema: {
    width: {type: 'number', default: 3},
    height: {type: 'number', default: 1},
    radius: {type: 'number', default: 0.25},
    color: {type: 'color', default: "#00FFFF"},
    helpText: {type: 'string', default: ""}
  },

  els: {
  },

  init: function() {
    this.els.rectMid = document.createElement('a-entity');
    this.els.rectTop = document.createElement('a-entity');
    this.els.rectBottom = document.createElement('a-entity');
    this.els.circTL = document.createElement('a-entity');
    this.els.circTR = document.createElement('a-entity');
    this.els.circBL = document.createElement('a-entity');
    this.els.circBR = document.createElement('a-entity');
    this.el.appendChild(this.els.rectMid);
    this.el.appendChild(this.els.rectTop);
    this.el.appendChild(this.els.rectBottom);
    this.el.appendChild(this.els.circTL);
    this.el.appendChild(this.els.circTR);
    this.el.appendChild(this.els.circBL);
    this.el.appendChild(this.els.circBR);
  },

  update: function() {
    this.els.rectMid.setAttribute('position', {x:0, y:0, z:0});
    this.els.rectMid.setAttribute('geometry', {
      primitive:'plane',
      height: this.data.height - (2*this.data.radius),
      width: this.data.width
    });
    this.els.rectMid.setAttribute('material', {color: this.data.color});
    this.els.rectMid.setAttribute('text', {value: this.data.helpText});

    this.els.rectTop.setAttribute('position', {x:0, y:((this.data.height-this.data.radius)/2), z:0});
    this.els.rectTop.setAttribute('geometry', {
      primitive:'plane',
      height: this.data.radius,
      width: this.data.width - (2*this.data.radius)
    });
    this.els.rectTop.setAttribute('material', {color: this.data.color});

    this.els.rectBottom.setAttribute('position', {x:0, y:-((this.data.height-this.data.radius)/2), z:0});
    this.els.rectBottom.setAttribute('geometry', {
      primitive:'plane',
      height: this.data.radius,
      width: this.data.width - (2*this.data.radius)
    });
    this.els.rectBottom.setAttribute('material', {color: this.data.color});

    this.els.circTL.setAttribute('position', {x:-(this.data.width/2-this.data.radius), y:this.data.height/2-this.data.radius, z:0})
    this.els.circTL.setAttribute('geometry', {
      primitive:'circle',
      radius: this.data.radius
    });
    this.els.circTL.setAttribute('material', {color: this.data.color});

    this.els.circTR.setAttribute('position', {x:this.data.width/2-this.data.radius, y:this.data.height/2-this.data.radius, z:0})
    this.els.circTR.setAttribute('geometry', {
      primitive:'circle',
      radius: this.data.radius
    });
    this.els.circTR.setAttribute('material', {color: this.data.color});

    this.els.circBR.setAttribute('position', {x:this.data.width/2-this.data.radius, y:-(this.data.height/2-this.data.radius), z:0})
    this.els.circBR.setAttribute('geometry', {
      primitive:'circle',
      radius: this.data.radius
    });
    this.els.circBR.setAttribute('material', {color: this.data.color});

    this.els.circBL.setAttribute('position', {x:-(this.data.width/2-this.data.radius), y:-(this.data.height/2-this.data.radius), z:0})
    this.els.circBL.setAttribute('geometry', {
      primitive:'circle',
      radius: this.data.radius
    });
    this.els.circBL.setAttribute('material', {color: this.data.color});
  }
});
