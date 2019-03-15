let THREE = require("three");

export default function createLights() {
  // a hemisphere light is a gradient colored light
  // the first parameter is the sky colour, the second parameter is the ground colour, the third parameter is the intensity of the light
  let hemisphereLight = new THREE.HemisphereLight(0xAAAAAA, 0x000000, 0.9);

  // a directional light shines from a specific direction
  // it acts like the sun that means all the rays produced are parallel
  let shadowLight = new THREE.DirectionalLight(0xFFFFFF, 0.9);

  // set the direction of the light
  shadowLight.position.set(150, 350, 350);

  // allow shadow casting
  shadowLight.castShadow = true;

  // define the visible area of the projected shadow
  shadowLight.shadow.camera.left = -400;
  shadowLight.shadow.camera.right = 400;
  shadowLight.shadow.camera.top = 400;
  shadowLight.shadow.camera.bottom = -400;
  shadowLight.shadow.camera.near = 1;
  shadowLight.shadow.camera.far = 1000;

  // define the resolution of the shadow, the higher the better but also the more expensive and less performance
  shadowLight.shadow.mapSize.width = 2048;
  shadowLight.shadow.mapSize.height = 2048;

  return {
    hemisphereLight,
    shadowLight
  }
}
