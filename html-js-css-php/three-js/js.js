import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { ViewHelper } from 'three/addons/helpers/ViewHelper.js';

let mesh, renderer, scene, camera, controls, helper, clock;

init();
animate();

function init() {

    // renderer
    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.autoClear = false;
    document.body.appendChild( renderer.domElement );

    // scene
    scene = new THREE.Scene();
    
    // camera
    camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.set( 20, 20, 20 );

    // controls
    controls = new OrbitControls( camera, renderer.domElement );
    
    // clock
    clock = new THREE.Clock();
    
    // ambient
    scene.add( new THREE.AmbientLight( 0x222222 ) );
    
    // light
    const light = new THREE.DirectionalLight( 0xffffff, 1 );
    light.position.set( 20,20, 0 );
    scene.add( light );
    
}
