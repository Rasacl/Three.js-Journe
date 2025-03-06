import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Object
 */
// const geometry = new THREE.BoxGeometry(1, 1, 1,3,2,2)
// const positionArray = new Float32Array([ // 创建 顶点坐标
//     0, 0, 0,  // 第一个顶点
//     0, 1, 0,  // 第二个顶点
//     1, 0, 0, // 第三个顶点
// ])
// const positionAttribute = new THREE.BufferAttribute(positionArray, 3)   // 创建 顶点属性
const count = 500
const positionArray = new Float32Array(count * 3 * 3) // 创建 顶点坐标  创建50个三角形 一个三角形有三个顶点 每个顶点有三个坐标
for (let i = 0; i < count * 3 * 3; i++) {
    positionArray[i] = (Math.random() - 0.5) * 4 // 随机生成坐标
}
const positionAttribute = new THREE.BufferAttribute(positionArray, 3)

const geometry = new THREE.BufferGeometry()
geometry.setAttribute('position', positionAttribute)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000,wireframe:true })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)
/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true  // 启用抗锯齿
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

window.addEventListener('dblclick', () => {
    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement
    if (!fullscreenElement) {
        if (canvas.requestFullscreen) {
            canvas.requestFullscreen()
        } else if (canvas.webkitRequestFullscreen) {
            canvas.webkitRequestFullscreen()
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen()
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen()
        }
    }
})

function animate() {

    // const elapsedTime = clock.getElapsedTime()
    controls.update()
    renderer.render(scene, camera)

    window.requestAnimationFrame(animate)
}

animate()