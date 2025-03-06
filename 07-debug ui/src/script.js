import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import gsap from 'gsap' // 动画库


const debugObject = {}

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Object
 */

debugObject.color = '#ff0000'
const geometry = new THREE.BoxGeometry(1, 1, 1,2,2,2)
const material = new THREE.MeshBasicMaterial({ color: debugObject.color, wireframe: true })
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

// window.addEventListener('dblclick', () => {
//     const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement
//     if (!fullscreenElement) {
//         if (canvas.requestFullscreen) {
//             canvas.requestFullscreen()
//         } else if (canvas.webkitRequestFullscreen) {
//             canvas.webkitRequestFullscreen()
//         }
//     } else {
//         if (document.exitFullscreen) {
//             document.exitFullscreen()
//         } else if (document.webkitExitFullscreen) {
//             document.webkitExitFullscreen()
//         }
//     }
// })

function animate() {

    // const elapsedTime = clock.getElapsedTime()
    controls.update()
    renderer.render(scene, camera)

    window.requestAnimationFrame(animate)
}

animate()
debugObject.spin = () => {
    gsap.to(mesh.rotation, {
        duration: 1,
        y: mesh.rotation.y + Math.PI * 2
    })
}
// ui调试
const gui = new GUI({
    width: 300,
    title: '调试',
    closeFolders: false, // 关闭所有文件夹
})
// gui.close()
gui.hide()
window.addEventListener('keydown', (e) => {
    if (e.key === 'h') {
        gui._hidden ? gui.show() : gui.hide()
    }
})
const cuveTweaks = gui.addFolder('属性')
// cuveTweaks.close()
cuveTweaks.add(mesh.position, 'x').min(-3).max(3).step(0.01).name('移动x轴')
cuveTweaks.add(material, 'wireframe').name('显示线框')
cuveTweaks.addColor(debugObject, 'color').name('颜色').onChange(() => {
    material.color.set(debugObject.color)
})
cuveTweaks.add(mesh, 'visible').name('是否显示')
gui.add(debugObject, 'spin').name('旋转')
debugObject.subdivisions = 2
gui.add(debugObject,'subdivisions').min(1).max(30).step(1).name('subdivisions').onFinishChange(() => {
    mesh.geometry.dispose()
    mesh.geometry = new THREE.BoxGeometry(1, 1, 1,debugObject.subdivisions,debugObject.subdivisions,debugObject.subdivisions)
})