AFRAME.Bezier = (p0, p1, p2, p3) => {

  const fn = (t, dim) =>
    Math.pow(1-t, 3) * p0[dim] +
    3 * Math.pow(1-t, 2) * t * p1[dim] +
    3 * (1-t) * Math.pow(t, 2) * p2[dim] +
    Math.pow(t,3) * p3[dim];

  return t => ({
    x: fn(t,'x'),
    y: fn(t, 'y'),
    z: fn(t, 'z')
  });
};

// let bezier = Bezier(
//   {x:0, y:0, z:0},
//   {x:0, y:2, z:0},
//   {x:1, y:2, z:0},
//   {x:1, y:1, z:0},
// );
//
// for (let i=0; i<=100; i++) {
//   console.log(bezier(i/100));
// }
