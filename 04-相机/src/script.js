import * as THREE from 'three'
// 导入轨道控制器
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// 鼠标移动更新摄像机位置
const cursor = {
    x: 0,
    y: 0
}
window.addEventListener('mousemove', (event) => {
    // 为什么要减 0.5 因为要保证鼠标在中心点 -0.5 ~ 0.5 之间
    cursor.x = event.clientX / sizes.width - 0.5
    cursor.y = -(event.clientY / sizes.height - 0.5)
    
})


// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Object
 */
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

// 添加 resize 事件监听
window.addEventListener('resize', () => {
    // 更新尺寸
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // 更新相机
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // 更新渲染器
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)) // 防止像素化
})

/**
 * Camera
 * 透视相机 参数 1. 视角 2. 宽高比 3. 近面 4. 远面
 * 
 * 正交相机 
 * @param left — Camera frustum left plane. Default -1.
 * @param right — Camera frustum right plane. Default 1.
 * @param top — Camera frustum top plane. Default 1.
 * @param bottom — Camera frustum bottom plane. Default -1.
 * @param near — Camera frustum near plane. Default 0.1.
 * @param far — Camera frustum far plane. Default 1000.
 * @param far — Camera frustum far plane. Default 2000.
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000)
// const aspectRatio = sizes.width / sizes.height // 宽高比
// const camera = new THREE.OrthographicCamera(-1 * aspectRatio, 1 * aspectRatio, 1, -1, 0.1, 1000)
camera.position.set(0, 0.5, 5)
scene.add(camera)
const controls = new OrbitControls( camera, canvas );
// 增加阻尼
controls.enableDamping = true
// controls.target.y =2
// controls.update()
/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

/**
 * Animate
 */
const clock = new THREE.Clock()

function animate() {

    const elapsedTime = clock.getElapsedTime()
    // mesh.rotation.y = elapsedTime

    // 更新相机
    // camera.position.x = cursor.x * 10
    // camera.position.y = cursor.y * 10

    // camera.position.x = Math.sin(cursor.x *Math.PI*2) *3
    // camera.position.z = Math.cos(cursor.x * Math.PI*2)*3
    // camera.position.y = cursor.y * 5
    // camera.lookAt(mesh.position)
    controls.update()
    renderer.render(scene, camera)

    window.requestAnimationFrame(animate)
}

animate()