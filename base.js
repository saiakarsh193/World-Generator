import './three/three.js';
// import { OrbitControls } from './three/OrbitControls.js';
import { getBlockData, getColorMap, tester } from './blockgen.js';

tester();
main();

function main()
{
    const canvas = document.querySelector('#c');
    const renderer = new THREE.WebGLRenderer({canvas});

    const fov = 75;
    const aspect = 16 / 9;
    const near = 0.1;
    const far = 100;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(0, 5, 10);
    camera.lookAt(0, 0, 0);

    // const controls = new OrbitControls(camera, renderer.domElement);
    // controls.update();
    // controls.autoRotate = true;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#66ffed');

    {
        const color = 'white';
        const intensity = 1;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(6, 4, 3);
        scene.add(light);
    }

    let groundsize = 10;

    {
        let ground;
        let geometry = new THREE.BoxGeometry(groundsize, 0.1, groundsize);
        let material = new THREE.MeshPhongMaterial();
        material.color = new THREE.Color('black');
        ground = new THREE.Mesh(geometry, material);
        ground.position.set(0, -0.05, 0);
        scene.add(ground);
    }

    let gridsize = 64;
    let layersize = 3;
    let chunk_x = 0;
    let chunk_y = 0;
    let colormap = getColorMap();
    let blockdata = [];
    {
        for(let layer = 0;layer < layersize;layer ++)
        {
            blockdata.push(getBlockData(chunk_x, chunk_y, gridsize, layer));
        }
    }

    {
        let cside = groundsize / gridsize;
        let geometry = new THREE.BoxGeometry(cside, cside, cside);
        for(let layer = 0;layer < layersize;layer ++)
        {
            for(let row = 0;row < gridsize;row ++)
            {
                for(let col = 0;col < gridsize;col ++)
                {
                    let curcolor = colormap[blockdata[layer][row][col]];
                    if(curcolor == 'Empty')
                        continue;
                    let material = new THREE.MeshPhongMaterial();
                    material.color.setRGB(curcolor[0], curcolor[1], curcolor[2]);
                    let cube = new THREE.Mesh(geometry, material);
                    cube.position.set(-(groundsize / 2) + (cside / 2) + cside * row, (cside / 2) + cside * layer, (groundsize / 2) - (cside / 2) - cside * col);
                    scene.add(cube);
                }
            }
        }
    }

    function resizeRendererToDisplaySize(renderer)
    {
        const canvas = renderer.domElement;
        const pixelRatio = window.devicePixelRatio;
        const width  = canvas.clientWidth  * pixelRatio | 0;
        const height = canvas.clientHeight * pixelRatio | 0;
        const needResize = canvas.width !== width || canvas.height !== height;
        if(needResize)
        {
            renderer.setSize(width, height, false);
        }
        return needResize;
    }

    function render(time)
    {
        time *= 0.001;

        if(resizeRendererToDisplaySize(renderer))
        {
            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
        }

        // controls.update();
        renderer.render(scene, camera);
        // requestAnimationFrame(render);
    }
    // requestAnimationFrame(render);
    
    render();

    // controls.addEventListener('change', render);
    window.addEventListener('resize', render);
}