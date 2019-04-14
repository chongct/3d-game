let THREE = require("three");
import { colours } from "./constants.js";

let Airplane = function() {
  // create an empty container that will hold the airplane
  this.mesh = new THREE.Object3D();

  // create the cabin
  let geomCockpit = new THREE.BoxGeometry(60, 50, 50, 1, 1, 1);
  let matCockpit = new THREE.MeshPhongMaterial({
    color: colours.red,
    flatShading: true
  });
  let cockpit = new THREE.Mesh(geomCockpit, matCockpit);
  cockpit.castShadow = true;
  cockpit.receiveShadow = true;
  this.mesh.add(cockpit);

  // create the engine
  let geomEngine = new THREE.BoxGeometry(20, 50, 50, 1, 1, 1);
  let matEngine = new THREE.MeshPhongMaterial({
    color: colours.white,
    flatShading: true
  });
  let engine = new THREE.Mesh(geomEngine, matEngine);
  engine.position.x = 40;
  engine.castShadow = true;
  engine.receiveShadow = true;
  this.mesh.add(engine);
}

export default function createPlane() {
  let airplane = new Airplane();
  airplane.mesh.scale.set(0.25, 0.25, 0.25);
  airplane.mesh.position.y = 100;

  return airplane;
}
