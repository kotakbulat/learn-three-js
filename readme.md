# Simple Three.js Portfolio Example

A basic example demonstrating essential features of the Three.js library for creating 3D graphics on the web. Built using Vite for a fast development experience.

## Features Demonstrated

This project showcases the following core Three.js concepts, which are also listed interactively in the application's UI overlay:

*   **Scene:** The container for all 3D objects, lights, and cameras.
*   **Camera (Perspective):** Defines the viewpoint and projection.
*   **Renderer (WebGL):** Draws the scene to the HTML canvas using WebGL.
*   **Geometry:** Defines the shape and structure of objects (e.g., Box, Plane).
*   **Material:** Defines the appearance of objects (e.g., color, texture, PBR properties with `MeshStandardMaterial`).
*   **Mesh:** Combines Geometry and Material to create a renderable object.
*   **Lighting:** Illuminates the scene (using `AmbientLight` and `DirectionalLight`).
*   **Shadows:** Adding realism by allowing objects to cast and receive shadows.
*   **Model Loading (GLTF/GLB):** Importing 3D models created in external software using `GLTFLoader`.
*   **Controls (OrbitControls):** Enabling user interaction to navigate the scene (orbit, zoom, pan).
*   **Animation Loop (`requestAnimationFrame`):** Continuously rendering frames for animation and updates.
*   **Responsiveness:** Adapting the scene rendering to different window sizes.
*   **Basic Interaction:** Connecting HTML UI elements (button) to control scene elements (cube rotation).

## Tech Stack

*   **Core Library:** [Three.js](https://threejs.org/)
*   **Build Tool / Dev Server:** [Vite](https://vitejs.dev/)
*   **Language:** JavaScript (ES Modules)
*   **Package Manager:** npm (or yarn)

## Setup and Running

**Prerequisites:**

*   [Node.js](https://nodejs.org/) (includes npm) installed (LTS version recommended).
*   A modern web browser that supports WebGL.
*   A code editor like [Visual Studio Code](https://code.visualstudio.com/).

**Steps:**

1.  **Clone or Download:** Get the project files onto your local machine.
2.  **Navigate to Project Directory:**
    ```bash
    cd path/to/simple-threejs-portfolio
    ```
3.  **Install Dependencies:**
    ```bash
    npm install
    ```
4.  **Add a 3D Model:**
    *   Download a 3D model in `.glb` or `.gltf` format (e.g., from Kenney Assets, Sketchfab).
    *   Create a `public` directory in the project root if it doesn't exist.
    *   Place the downloaded model inside the `public` directory.
    *   **Important:** Rename the model file to `myModel.glb` or update the `modelPath` variable in `main.js` to match your model's filename (e.g., `const modelPath = '/your_model_name.glb';`). Files in `public` are served from the root (`/`).
5.  **Run the Development Server:**
    ```bash
    npm run dev
    ```
6.  **Open in Browser:** Vite will output a local URL (usually `http://localhost:5173/`). Open this URL in your web browser.

## Interaction

*   **Orbit:** Left-click and drag the mouse.
*   **Zoom:** Use the mouse scroll wheel.
*   **Pan:** Right-click and drag the mouse.
*   **Toggle Cube Spin:** Click the button in the top-left overlay.

## File Structure

*   `index.html`: The main HTML entry point, includes the canvas container and UI overlay.
*   `style.css`: Styles for the page and UI overlay.
*   `main.js`: The core JavaScript file where all the Three.js setup, logic, and animation loop reside.
*   `public/`: Static assets directory. Place your 3D models (`.glb`/`.gltf`) here. Files in this directory are served at the root path (`/`).
*   `package.json`: Lists project dependencies and scripts.
*   `vite.config.js`: Vite configuration file (usually minimal for basic setups).
*   `README.md`: This file.