// Variables 

let container, camera, renderer, scene, house;

function init() {
    container = document.querySelector('.scene');

    //**********Create Scene*************//

    // Camera
    scene = new THREE.Scene();

    const fov = 35;
    const aspect = container.clientWidth / container.clientHeight;
    const near = 0.1;
    const far  = 500;


    camera = new THREE.PerspectiveCamera(fov,aspect,near,far);

    camera.position.set(0, -5, 25);

    const ambient = new THREE.AmbientLight(0x404040, 2);
    scene.add(ambient);

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(10,10,10);
    scene.add(light);

    //Renderer
    renderer = new THREE.WebGLRenderer({antialias:true, alpha:true});
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    container.appendChild(renderer.domElement);
    
    // Load The Model

    let loader = new THREE.GLTFLoader();
    loader.load("scene.gltf", function(gltf){
        scene.add(gltf.scene);
        house = gltf.scene.children[0];
        renderer.render(scene, camera);
    });
    
}

function animate(){
    requestAnimationFrame(animate);
    house.rotation.z += 0.01;
    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(container.clientWidth,container.clientHeight);
}

window.addEventListener('resize', onWindowResize);

init();
animate();