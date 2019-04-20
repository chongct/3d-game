let THREE = require("three");
import { colours } from "./constants.js";

const Sea = function() {
  // create the geometry (shape) of the cylinder
  // the parameters are radius top, radius bottom, height, number of segments on the radius, number of segments vertically
  let geom = new THREE.CylinderGeometry(600, 600, 800, 40, 10);

  // rotate the geometry on the x axis
  geom.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI / 2));

  // create the material
  let mat = new THREE.MeshPhongMaterial({
    color: colours.blue,
    transparent: true,
    opacity: 6,
    flatShading: THREE.FlatShading
  });

  // to create an object in THREE.js, we have to create a mesh which is a combination of a geometry and some material
  this.mesh = new THREE.Mesh(geom, mat);

  // allow the sea to receive shadows
  this.mesh.receiveShadow = true;
}

export default function createSea() {
  let sea = new Sea();

  // push it a litte bit at the bottom of the scene
  sea.mesh.position.y = -600;

  return sea;
}
