/**
 * scene.js — Three.js 3D Background
 * Creates particles, wireframe spheres, and floating tetrahedrons
 * with mouse-driven parallax camera movement.
 */

const Scene3D = (() => {
  // ─── Private State ───
  let renderer, scene, camera;
  let particles, sphere, sphere2;
  let triangles = [];
  let mouseX = 0;
  let mouseY = 0;
  let frame = 0;

  // ─── Configuration ───
  const CONFIG = {
    particleCount: 1800,
    particleSpread: { x: 120, y: 120, z: 80 },
    particleSize: 0.18,
    particleOpacity: 0.6,
    cameraZ: 30,
    parallaxStrength: { x: 3, y: 2 },
    parallaxSmoothing: 0.05,
  };

  /**
   * Creates the particle field geometry and material.
   * @returns {THREE.Points}
   */
  function createParticles() {
    const { particleCount, particleSpread } = CONFIG;
    const positions = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * particleSpread.x;
      positions[i * 3 + 1] = (Math.random() - 0.5) * particleSpread.y;
      positions[i * 3 + 2] = (Math.random() - 0.5) * particleSpread.z;
      sizes[i] = Math.random() * 0.6 + 0.1;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    const material = new THREE.PointsMaterial({
      color: 0x00fff5,
      size: CONFIG.particleSize,
      transparent: true,
      opacity: CONFIG.particleOpacity,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    });

    return new THREE.Points(geometry, material);
  }

  /**
   * Creates a wireframe sphere.
   * @param {number} radius
   * @param {number} segments
   * @param {number} color
   * @param {number} opacity
   * @param {{ x: number, y: number, z: number }} position
   * @returns {THREE.Mesh}
   */
  function createWireframeSphere(radius, segments, color, opacity, position) {
    const geometry = new THREE.SphereGeometry(radius, segments, segments);
    const material = new THREE.MeshBasicMaterial({
      color,
      wireframe: true,
      transparent: true,
      opacity,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(position.x, position.y, position.z);
    return mesh;
  }

  /**
   * Creates a wireframe tetrahedron.
   * @param {number} size
   * @param {number} color
   * @param {{ x: number, y: number, z: number }} position
   * @returns {THREE.Mesh}
   */
  function createTetrahedron(size, color, position) {
    const geometry = new THREE.TetrahedronGeometry(size, 0);
    const material = new THREE.MeshBasicMaterial({
      color,
      wireframe: true,
      transparent: true,
      opacity: 0.12,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(position.x, position.y, position.z);
    return mesh;
  }

  /**
   * Handles the animation loop — rotates objects and applies parallax.
   */
  function animate() {
    requestAnimationFrame(animate);
    frame++;
    const t = frame * 0.005;

    // Rotate particles
    particles.rotation.y = t * 0.03;
    particles.rotation.x = t * 0.01;

    // Rotate spheres
    sphere.rotation.y += 0.003;
    sphere.rotation.x += 0.001;
    sphere2.rotation.y -= 0.004;
    sphere2.rotation.z += 0.002;

    // Rotate triangles
    triangles[0].rotation.y += 0.008;
    triangles[0].rotation.x += 0.004;
    triangles[1].rotation.x += 0.006;
    triangles[1].rotation.z += 0.003;
    triangles[2].rotation.y -= 0.005;
    triangles[2].rotation.z += 0.007;

    // Mouse parallax on camera
    const { parallaxStrength, parallaxSmoothing } = CONFIG;
    camera.position.x += (mouseX * parallaxStrength.x - camera.position.x) * parallaxSmoothing;
    camera.position.y += (-mouseY * parallaxStrength.y - camera.position.y) * parallaxSmoothing;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
  }

  /**
   * Handles viewport resize events.
   */
  function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  /**
   * Tracks mouse position for parallax effect.
   * @param {MouseEvent} event
   */
  function onMouseMove(event) {
    mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (event.clientY / window.innerHeight - 0.5) * 2;
  }

  // ─── Public API ───
  return {
    /**
     * Initializes the 3D scene, attaches it to the canvas, and starts animation.
     */
    init() {
      const canvas = document.getElementById("bg-canvas");

      // Renderer
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      // Scene & Camera
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = CONFIG.cameraZ;

      // Build objects
      particles = createParticles();
      scene.add(particles);

      sphere = createWireframeSphere(10, 28, 0x00fff5, 0.04, { x: 18, y: -5, z: -10 });
      scene.add(sphere);

      sphere2 = createWireframeSphere(6, 16, 0xff006e, 0.03, { x: -20, y: 8, z: -15 });
      scene.add(sphere2);

      triangles = [
        createTetrahedron(2, 0x00fff5, { x: -15, y: 10, z: -5 }),
        createTetrahedron(1.5, 0xff006e, { x: 12, y: -8, z: -3 }),
        createTetrahedron(1, 0xffbe0b, { x: 5, y: 15, z: -8 }),
      ];
      triangles.forEach((tri) => scene.add(tri));

      // Events
      document.addEventListener("mousemove", onMouseMove);
      window.addEventListener("resize", onResize);

      // Start
      animate();
    },
  };
})();
