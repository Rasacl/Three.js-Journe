import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';

// 创建场景、相机和渲染器
const scene = new THREE.Scene();
const canvas = document.querySelector('canvas.webgl')
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize(window.innerWidth, window.innerHeight);

// 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = true;

// 添加环境光和方向光
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(0, 1, 2);
scene.add(directionalLight);

// 添加环境光和方向光之后，添加圆柱体
const cylinderGeometry = new THREE.CylinderGeometry(2, 2, 4, 32);
const cylinderMaterial = new THREE.MeshPhongMaterial({ 
    color: 0x808080,
    transparent: true,
    opacity: 0.5
});
const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
scene.add(cylinder);

// 修改字体加载部分
const fontLoader = new FontLoader();
fontLoader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function(font) {
    const text = "Three.js 3D is better than 2D";
    const characters = text.split('');
    const radius = 2; // 与圆柱体半径相同
    
    characters.forEach((char, index) => {
        const textGeometry = new TextGeometry(char, {
            font: font,
            size: 0.3,
            height: 0, // 减小厚度，使其更贴合
            curveSegments: 12,
            bevelEnabled: false
        });
        
        textGeometry.computeBoundingBox();
        const centerOffset = -(textGeometry.boundingBox.max.x - textGeometry.boundingBox.min.x) / 2;
        
        const textMaterial = new THREE.MeshPhongMaterial({ 
            color: 0x00ffff,
            emissive: 0x0066ff,
            emissiveIntensity: 0.5
        });
        
        const textMesh = new THREE.Mesh(textGeometry, textMaterial);
        
        // 计算圆柱表面的位置
        const angle = (index / characters.length) * Math.PI * 2;
        textMesh.position.x = Math.sin(angle) * (radius + 0.01);
        textMesh.position.z = Math.cos(angle) * (radius + 0.01);
        textMesh.position.y = 0;
        
        // 设置初始旋转，使文字贴合圆柱体表面
        textMesh.rotation.y = -angle - Math.PI / 2;
        
        // 修改更新函数
        const updateTextRotation = () => {
            const cameraPosition = new THREE.Vector3();
            camera.getWorldPosition(cameraPosition);
            
            // 保持Y轴旋转不变，只更新X和Z轴的旋转
            const lookAtVector = new THREE.Vector3();
            lookAtVector.subVectors(cameraPosition, textMesh.position);
            lookAtVector.y = textMesh.position.y; // 锁定Y轴
            textMesh.lookAt(lookAtVector);
            
            // 保持文字垂直
            textMesh.rotation.z = 0;
        };
        
        // 在动画循环中更新文字朝向
        updateFunctions.push(updateTextRotation);

        scene.add(textMesh);
    });
});

// 创建更新函数数组
const updateFunctions = [];

// 删除重复的相机位置设置，只保留一个
camera.position.set(0, 2, 10);
camera.lookAt(0, 0, 0);

// 修改动画循环
function animate() {
    requestAnimationFrame(animate);
    controls.update(); // 添加这行来更新轨道控制器
    updateFunctions.forEach(fn => fn());
    renderer.render(scene, camera);
}
animate();

// 响应窗口大小变化
window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
});