// Three.js Logic for Backgrounds

// 1. Hero Background Scene (Floating Abstract Shapes)
const initHeroBackground = () => {
    const canvas = document.getElementById('bgCanvas');
    if (!canvas) return;

    const scene = new THREE.Scene();
    
    // Camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Objects - Instead of a character, we'll use an abstract glowing shape
    const geometry = new THREE.TorusKnotGeometry(1.5, 0.4, 128, 32);
    // Glowing purple material
    const material = new THREE.MeshStandardMaterial({
        color: 0x0A84FF,
        emissive: 0x1a052b,
        emissiveIntensity: 0.5,
        wireframe: true,
        transparent: true,
        opacity: 0.3
    });
    
    const torusKnot = new THREE.Mesh(geometry, material);
    scene.add(torusKnot);

    // Mouse interaction parameters
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX - windowHalfX);
        mouseY = (event.clientY - windowHalfY);
    });

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0xBF5AF2, 1, 100);
    pointLight.position.set(0, 0, 5);
    scene.add(pointLight);

    // Animation Loop
    const animate = () => {
        requestAnimationFrame(animate);

        targetX = mouseX * .001;
        targetY = mouseY * .001;

        torusKnot.rotation.y += 0.05 * (targetX - torusKnot.rotation.y);
        torusKnot.rotation.x += 0.05 * (targetY - torusKnot.rotation.x);
        
        // base rotation
        torusKnot.rotation.z += 0.002;

        renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
};

// 2. Tech Stack Globe Background
const initGlobeBackground = () => {
    const canvas = document.getElementById('globeCanvas');
    if (!canvas) return;

    // Get the tech section bounding box
    const section = document.getElementById('techstack');

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, section.clientWidth / section.clientHeight, 0.1, 1000);
    camera.position.z = 15;

    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    
    const setSize = () => {
        const width = section.clientWidth;
        const height = section.clientHeight;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    };
    setSize();

    // Globe Geometry - Wireframe sphere
    const geometry = new THREE.SphereGeometry(8, 32, 32);
    const material = new THREE.MeshBasicMaterial({ 
        color: 0x0A84FF,
        wireframe: true,
        transparent: true,
        opacity: 0.15
    });
    
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    // Animation Loop
    const animate = () => {
        requestAnimationFrame(animate);
        sphere.rotation.y += 0.002;
        sphere.rotation.x += 0.001;
        renderer.render(scene, camera);
    };

    animate();

    window.addEventListener('resize', setSize);
};

// Initialize after DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initHeroBackground();
    initGlobeBackground();
});
