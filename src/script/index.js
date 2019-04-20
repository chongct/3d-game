import "../styles/styles.scss";

import createScene from "./createScene.js";
import createLights from "./createLights.js";
import createSea from "./createSea.js";
import createSky from "./createSky.js";
import createPlane from "./createPlane.js";

class Game {
  constructor() {
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

    this.loop();
  }

  loop() {
    // rotate the propeller, the sea and the sky
    this.plane.propeller.rotation.x += 0.03;
    this.sea.mesh.rotation.z += 0.005;
    this.sky.mesh.rotation.z += 0.01;

    // render the scene
    this.renderer.render(this.scene, this.camera);

    // call the loop function again
    requestAnimationFrame(this.loop.bind(this));
  }
}

const game = new Game();
window.addEventListener("load", game.init(), false);
