/* global AFRAME THREE */

if (typeof AFRAME === "undefined") {
  throw "Component attempted to register before AFRAME was available.";
}

AFRAME.registerComponent("arrow", {
  schema: {
    direction: {
      type: "vec3",
      default: {
        x: 1,
        y: 0,
        z: 0
      }
    },
    length: {
      type: "number"
    },
    color: {
      type: "color",
      default: "#ff0"
    },
    headLength: {
      type: "number"
    },
    headWidth: {
      type: "number"
    }
  },
  init: function () {
    let data = this.data;
    let direction = new THREE.Vector3(data.direction.x, data.direction.y, data.direction.z);
    let length = data.length || direction.length();
    let headLength = data.headLength || length * .2;
    let headWidth = data.headWidth || headLength * .2;
    let color = new THREE.Color(data.color);
    this.arrow = new THREE.ArrowHelper(direction.normalize(), new THREE.Vector3(), length, color, headLength, headWidth);
    this.el.setObject3D("arrow", this.arrow);
  },
  update: function (oldData) {
    let data = this.data;
    let diff = AFRAME.utils.diff(data, oldData);
    if ("color" in diff) {
      this.arrow.setColor(new THREE.Color(data.color));
    }
    let length;
    if ("direction" in diff) {
      let direction = new THREE.Vector3(data.direction.x, data.direction.y, data.direction.z);
      length = direction.length();
      this.arrow.setDirection(direction.normalize());
    }
    if ("direction" in diff && typeof data.length === "undefined" || "length" in diff || "headLength" in diff || "headWidth" in diff) {
      length = data.length || length;
      let headLength = data.headLength || length * .2;
      let headWidth = data.headWidth || headLength * .2;
      this.arrow.setLength(length, headLength, headWidth);
    }
  }
});
