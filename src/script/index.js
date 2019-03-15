import "../styles/styles.scss";

import createScene from "./createScene.js";
import createLights from "./createLights.js";
import createSea from "./createSea.js";

window.addEventListener("load", init, false);

function init() {
  // set up the scene, the camera and the renderer
  let createSceneObject = createScene();
  let scene = createSceneObject.scene;
  let camera = createSceneObject.camera;
  let renderer = createSceneObject.renderer;

  // add the lights
  let createLightObject = createLights();
  let hemisphereLight = createLightObject.hemisphereLight;
  let shadowLight = createLightObject.shadowLight;
  scene.add(hemisphereLight);
  scene.add(shadowLight);

  // add the objects
  let sea = createSea();
  scene.add(sea.mesh);

  renderer.render(scene, camera);
}
