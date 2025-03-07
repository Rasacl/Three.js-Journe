import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// 添加环境光和平行光
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
directionalLight.position.set(2, 2, 2)
scene.add(directionalLight)
// 纹理加载
// loading管理器
const loadingManager = new THREE.LoadingManager()
// loadingManager.onStart = () => {
//     console.log('loading start')
// }
// loadingManager.onLoad = () => {
//     console.log('loading finish')
// }
// loadingManager.onProgress = (url, loaded, total) => {
//     console.log('loading progressing', url, loaded, total)
// }
// loadingManager.onError = () => {
//     console.log('loading error')
// }

const textureLoader = new THREE.TextureLoader(loadingManager)
const colorTexture = textureLoader.load('/textures/door/color.jpg')
// colorTexture.repeat.x = 2  // 横向重复次数
// colorTexture.repeat.y = 3
// colorTexture.wrapS = THREE.RepeatWrapping // 横向重复方式
// colorTexture.wrapT = THREE.RepeatWrapping // 纵向重复方式

// // 偏移
// colorTexture.offset.x = 0.5
// colorTexture.offset.y = 0.5
// 旋转
// colorTexture.rotation = Math.PI * 0.25
// colorTexture.center.x = 0.5
// colorTexture.center.y = 0.5
colorTexture.generateMipmaps = false // 不生成mipmaps
colorTexture.minFilter = THREE.NearestFilter // 最近过滤

const alphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const heightTexture = textureLoader.load('/textures/door/height.jpg')
const normalTexture = textureLoader.load('/textures/door/normal.jpg')
const ambientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const metalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const roughnessTexture = textureLoader.load('/textures/door/roughness.jpg')


/**
 * Object
 */
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ 
    // 纹理贴图
    map: colorTexture, // 颜色贴图
    // alphaMap: alphaTexture, // 透明贴图 （黑色：完全透明；白色：完全不透明
    // transparent: true, // 透明
    // normalTexture: normalTexture, // 法线贴图
    // heightTexture: heightTexture, // 高度贴图
    // ambientOcclusionTexture: ambientOcclusionTexture, // 环境遮挡贴图
    // metalnessTexture: metalnessTexture, // 金属度贴图
    // roughnessTexture: roughnessTexture, // 粗糙度贴图
    // side: THREE.DoubleSide // 双面
    // wireframe: true // 线框

 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
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

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 1
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    // 抗锯齿
    antialias: true  

})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()