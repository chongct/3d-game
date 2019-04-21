import "../styles/styles.scss";

import createScene from "./createScene.js";
import createLights from "./createLights.js";
import createSea from "./createSea.js";
import createSky from "./createSky.js";
import createPlane from "./createPlane.js";

class Game {
  constructor() {
    this.mousePos = {
      x: 0,
      y: 0
    };
  }

  init() {
    // set up the scene, the camera and the renderer
    let createSceneObject = createScene();
    this.scene = createSceneObject.scene;
    this.camera = createSceneObject.camera;
    this.renderer = createSceneObject.renderer;

    // add the lights
    let createLightObject = createLights();
    let hemisphereLight = createLightObject.hemisphereLight;
    let shadowLight = createLightObject.shadowLight;
    this.scene.add(hemisphereLight);
    this.scene.add(shadowLight);

    // add the objects
    this.sea = createSea();
    this.scene.add(this.sea.mesh);
    this.sky = createSky();
    this.scene.add(this.sky.mesh);
    this.plane = createPlane();
    this.scene.add(this.plane.mesh);

    // add mouse listener
    document.addEventListener("mousemove", this.handleMouseMove.bind(this), false);

    this.loop();
  }

  loop() {
    // rotate the propeller, the sea and the sky
    // this.plane.propeller.rotation.x += 0.03;
    this.sea.mesh.rotation.z += 0.005;
    this.sky.mesh.rotation.z += 0.01;

    // update the plane on each frame
    this.updatePlane();

    // render the scene
    this.renderer.render(this.scene, this.camera);

    // call the loop function again
    requestAnimationFrame(this.loop.bind(this));
  }

  handleMouseMove(event) {
    // convert the mouse position value received to a normalized value varying between -1 and 1
    // formula for the horizontal axis
    let WIDTH = window.innerWidth;
    let tx = -1 + (event.clientX / WIDTH) * 2;

    // for the vertical axis, inverse the formula because the 2D y-axis goes the opposite direction of the 3D y-axis
    let HEIGHT = window.innerHeight;
    let ty = 1 - (event.clientY / HEIGHT) * 2;
    this.mousePos = {
      x: tx,
      y: ty
    };
  }

  updatePlane() {
    // move the airplane between -100 and 100 on the horizontal axis and between 25 and 175 on the vertical axis
    let targetX = this.normalize(this.mousePos.x, -1, 1, -100, 100);
    let targetY = this.normalize(this.mousePos.y, -1, 1, 25, 175);

    // update airplane's position
    this.plane.mesh.position.x = targetX;
    this.plane.mesh.position.y = targetY;
    this.plane.propeller.rotation.x += 0.3;
  }

  normalize(v, vmin, vmax, tmin, tmax) {
    let nv = Math.max(Math.min(v, vmax), vmin);
    let dv = vmax - vmin;
    let pc = (nv - vmin) / dv;
    let dt = tmax - tmin;
    let tv = tmin + (pc * dt);
    return tv;
  }
}

const game = new Game();
window.addEventListener("load", game.init(), false);
