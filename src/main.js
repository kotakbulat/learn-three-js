import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// --- Essential Feature: Scene ---
// The scene is the container for all objects, lights, and cameras.
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x282c34); // Set background color

// --- Essential Feature: Camera ---
// PerspectiveCamera(FOV, Aspect Ratio, Near Clipping Plane, Far Clipping Plane)
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(5, 5, 10); // Position the camera
camera.lookAt(0, 0, 0); // Make camera look at the center of the scene

// --- Essential Feature: Renderer ---
// WebGLRenderer renders the scene using WebGL.
const renderer = new THREE.WebGLRenderer({ antialias: true }); // Enable anti-aliasing for smoother edges
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio); // Adjust for high-DPI screens

// --- Essential Feature: Shadows ---
// Enable shadow mapping in the renderer
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Softer shadows

// Append the renderer's canvas element to the DOM
document.getElementById('app').appendChild(renderer.domElement);

// --- Essential Feature: Controls ---
// OrbitControls allow the user to interact with the scene (rotate, zoom, pan).
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Add smooth damping effect
controls.dampingFactor = 0.05;
controls.screenSpacePanning = false; // Keep panning aligned with ground plane
controls.minDistance = 3;
controls.maxDistance = 50;
controls.maxPolarAngle = Math.PI / 2 - 0.05; // Prevent looking underneath the ground

// --- Essential Feature: Lighting ---
// AmbientLight provides a basic overall illumination.
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Color, Intensity
scene.add(ambientLight);

// DirectionalLight simulates sunlight and casts shadows.
const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
directionalLight.position.set(5, 10, 7.5);
directionalLight.castShadow = true; // Enable shadow casting for this light

// Configure shadow properties
directionalLight.shadow.mapSize.width = 1024; // Shadow map resolution
directionalLight.shadow.mapSize.height = 1024;
directionalLight.shadow.camera.near = 0.5;
directionalLight.shadow.camera.far = 50;
directionalLight.shadow.camera.left = -10;
directionalLight.shadow.camera.right = 10;
directionalLight.shadow.camera.top = 10;
directionalLight.shadow.camera.bottom = -10;

scene.add(directionalLight);
// Optional: Add a helper to visualize the light's direction and shadow frustum
// const lightHelper = new THREE.DirectionalLightHelper(directionalLight, 1);
// scene.add(lightHelper);
// const shadowCameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
// scene.add(shadowCameraHelper);

// --- Essential Feature: Geometry & Material & Mesh ---
// Plane Geometry (for the ground)
const groundGeometry = new THREE.PlaneGeometry(20, 20);
const groundMaterial = new THREE.MeshStandardMaterial({ color: 0x808080, side: THREE.DoubleSide }); // Gray, PBR material
const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
groundMesh.rotation.x = -Math.PI / 2; // Rotate to lay flat
groundMesh.receiveShadow = true; // Allow the ground to receive shadows
scene.add(groundMesh);

// Box Geometry (a spinning cube)
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshStandardMaterial({ color: 0x61dafb }); // React-like blue
const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);
cubeMesh.position.set(0, 1, 0); // Position above the ground
cubeMesh.castShadow = true; // Allow the cube to cast shadows
scene.add(cubeMesh);

// --- Essential Feature: Model Loading (GLTF/GLB) ---
const loader = new GLTFLoader();
const modelPath = '/myModel.glb'; // Path relative to the 'public' folder

loader.load(
  modelPath,
  // Success callback
  function (gltf) {
    const loadedModel = gltf.scene;
    loadedModel.position.set(3, 0.5, 2); // Adjust position as needed
    loadedModel.scale.set(0.5, 0.5, 0.5); // Adjust scale as needed

    // Enable shadows for all meshes within the loaded model
    loadedModel.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true; // Optional: If parts of model should receive shadows from others
      }
    });

    scene.add(loadedModel);
    console.log('Model loaded successfully!');
    document.getElementById('check-loader').checked = true; // Update UI checklist
  },
  // Progress callback (optional)
  function (xhr) {
    // console.log((xhr.loaded / xhr.total * 100) + '% loaded');
  },
  // Error callback
  function (error) {
    console.error('An error happened loading the model:', error);
    const featureList = document.getElementById('feature-list');
    const errorLi = document.createElement('li');
    errorLi.style.color = 'red';
    errorLi.innerHTML = `<strong>Model Loading Error:</strong> Could not load ${modelPath}. Make sure it's in the 'public' folder and the path is correct.`;
    featureList.appendChild(errorLi);
    document.getElementById('check-loader').checked = false; // Update UI checklist
  }
);

// --- Essential Feature: Responsiveness ---
// Handle window resize events
window.addEventListener('resize', () => {
  // Update camera aspect ratio
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  // Update renderer size
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio); // Important for retina/high-dpi displays
}, false);

// --- Interactive Element ---
let isSpinning = true;
const toggleSpinButton = document.getElementById('toggle-spin');
toggleSpinButton.addEventListener('click', () => {
    isSpinning = !isSpinning;
    toggleSpinButton.textContent = isSpinning ? 'Toggle Cube Spin (On)' : 'Toggle Cube Spin (Off)';
});


// --- Essential Feature: Animation Loop ---
// The animate function is called recursively using requestAnimationFrame for smooth animation.
function animate() {
  requestAnimationFrame(animate); // Schedule the next frame

  // Update animations
  if (isSpinning) {
      cubeMesh.rotation.x += 0.01;
      cubeMesh.rotation.y += 0.01;
  }


  // Update controls (needed if enableDamping is true)
  controls.update();

  // Render the scene from the perspective of the camera
  renderer.render(scene, camera);
}

// Start the animation loop
animate();

// Mark initial checks (most features are active on load)
document.getElementById('check-scene').checked = true;
document.getElementById('check-camera').checked = true;
document.getElementById('check-renderer').checked = true;
document.getElementById('check-geometry').checked = true;
document.getElementById('check-material').checked = true;
document.getElementById('check-mesh').checked = true;
document.getElementById('check-lights').checked = true;
document.getElementById('check-shadows').checked = true;
// Loader check is handled in its callback
document.getElementById('check-controls').checked = true;
document.getElementById('check-animation').checked = true;
document.getElementById('check-responsive').checked = true;