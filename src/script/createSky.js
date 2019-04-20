let THREE = require("three");
import { colours } from "./constants.js";

const Cloud = function() {
  // create an empty container that will hold the different parts of the cloud
  this.mesh = new THREE.Object3D();

  // create a cube geometry
  // this shape will be duplicated to create the cloud
  let geom = new THREE.BoxGeometry(20, 20, 20);

  // create a material
  let mat = new THREE.MeshPhongMaterial({
    color: colours.white
  });

  // duplicate the geometry a random number of times
  let nBlocs = 3 + Math.floor(Math.random() * 3);
  for (let i = 0; i < nBlocs; i++) {

    // create the mesh by cloning the geometry
    let cloudMesh = new THREE.Mesh(geom, mat);

    // set the position and the rotation of each cube randomly
    cloudMesh.position.x  = i * 15;
    cloudMesh.position.y = Math.random() * 10;
    cloudMesh.position.z = Math.random() * 10;
    cloudMesh.rotation.z = Math.random() * Math.PI * 2;
    cloudMesh.rotation.y = Math.random() * Math.PI * 2;

    // set the size of the cube randomly
    let cloudSize = 0.1 + Math.random() * 0.9;
    cloudMesh.scale.set(cloudSize, cloudSize, cloudSize);

    // allow each cube to cast and to receive shadows
    cloudMesh.castShadow = true;
    cloudMesh.receiveShadow = true;

    this.mesh.add(cloudMesh);
  }
}

const Sky = function() {
  // create an empty container
  this.mesh = new THREE.Object3D();

  // number of clouds to be scattered in the sky
  this.nClouds = 20;

  // to distribute the clouds consistently, we need to place them according to a uniform angle
  let stepAngle = Math.PI * 2 / this.nClouds;

  // create the clouds
  for(let i = 0; i < this.nClouds; i++) {
    let c = new Cloud();

    // set the rotation and the position of each cloud using trigonometry
    let angle = stepAngle * i; // final angle of cloud
    let hypotenuse = 750 + Math.random() * 200; // distance between center of axis and cloud

    // converting polar coordinates (angle, distance) into Cartesian coordinates (x, y)
    c.mesh.position.y = Math.sin(angle) * hypotenuse;
    c.mesh.position.x = Math.cos(angle) * hypotenuse;
    // position clouds at random depths inside of scene
    c.mesh.position.z = -400 - Math.random() * 400;

    // rotate the cloud according to its position
    c.mesh.rotation.z = angle + Math.PI / 2;

    // set random scale for each cloud
    let overallSize = 1 + Math.random() * 2;
    c.mesh.scale.set(overallSize, overallSize, overallSize);

    this.mesh.add(c.mesh);
  }
}

export default function createSky() {
  let sky = new Sky();
  sky.mesh.position.y = -600;

  return sky;
}
