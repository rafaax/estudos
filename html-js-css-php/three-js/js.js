import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { ViewHelper } from 'three/addons/helpers/ViewHelper.js';

let mesh, renderer, scene, camera, controls, helper, clock;

init();
animate();

