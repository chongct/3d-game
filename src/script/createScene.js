let THREE = require("three");
import { colours } from "./constants.js";

let HEIGHT, WIDTH;
let renderer, camera;

export default function createScene() {
  HEIGHT = window.innerHeight;
  WIDTH = window.innerWidth;

  // create scene
  let scene = new THREE.Scene();

  // add fog effect
  scene.fog = new THREE.Fog(colours.background, 100, 950);

  // create camera
  let aspectRatio = WIDTH / HEIGHT;
  let fieldOfView = 60;
  let nearPlane = 1;
  let farPlane = 10000;
  camera = new THREE.PerspectiveCamera(
    fieldOfView,
    aspectRatio,
    nearPlane,
    farPlane
  );
  // set the position of the camera
  camera.position.x = 0;
  camera.position.y = 100;
  camera.position.z = 200;

  // create the renderer
  renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true
  });
  renderer.setSize(WIDTH, HEIGHT);
  renderer.shadowMap.enabled = true;

  // add DOM element of the renderer to the container created in HTML
  let container = document.getElementById("world");
  container.appendChild(renderer.domElement);

  // handle resizing, update camera and renderer size
  window.addEventListener("resize", handleWindowResize, false);

  return {
    scene,
    camera,
    renderer
  };
}


function handleWindowResize() {
  // update height and width of the camera and renderer
  HEIGHT = window.innerHeight;
  WIDTH = window.innerWidth;
  renderer.setSize(WIDTH, HEIGHT);
  camera.aspect = WIDTH / HEIGHT;
  camera.updateProjectionMatrix();
}
