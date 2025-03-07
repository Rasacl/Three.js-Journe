import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import {RGBELoader} from 'three/examples/jsm/loaders/RGBELoader.js'


const gui = new GUI()
/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

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
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
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
    // Update objects
    // shpere.rotation.y = 0.1 * elapsedTime
    // plane.rotation.y = 0.1 * elapsedTime
    // torus.rotation.y = 0.1 * elapsedTime

    // shpere.rotation.x = -0.15 * elapsedTime
    // plane.rotation.x = -0.15 * elapsedTime
    // torus.rotation.x = -0.15 * elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

const textureLoader = new THREE.TextureLoader()
const doorColorTexture = textureLoader.load('/textures/door/color.jpg')
const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg')
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg')
const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg')
const matcapTexture = textureLoader.load('/textures/matcaps/7.png')
const gradientTexture = textureLoader.load('/textures/gradients/3.jpg')
// 指定颜色空间
doorColorTexture.colorSpace = THREE.SRGBColorSpace
matcapTexture.colorSpace = THREE.SRGBColorSpace

// 添加灯光
const ambientLight = new THREE.AmbientLight(0xffffff, 1)
scene.add(ambientLight)
const pointLight = new THREE.PointLight(0xffffff, 30)
pointLight.position.set(2, 3, 4)
scene.add(pointLight)
// const directionalLight = new THREE.DirectionalLight(0xffffff, 30)
// directionalLight.position.set(2, 3, 4)
// scene.add(directionalLight)

// 添加环境贴图
// 加载hdr
const rgbeLoader = new RGBELoader()
rgbeLoader.load('/textures/environmentMap/2k.hdr',(texture)=>{
    texture.mapping = THREE.EquirectangularReflectionMapping // 设置映射模式为环境映射
    scene.background = texture
    scene.environment = texture
})




// 基础网格材质
// const material = new THREE.MeshBasicMaterial({
//     map: doorColorTexture,
// })

// const material = new THREE.MeshBasicMaterial()
// material.map = doorColorTexture
// material.color = new THREE.Color('#ff0000')
// material.wireframe = true
// material.side = THREE.DoubleSide

// material.transparent = true
// material.opacity = 0.2 // 必须先设置透明才能设置透明度

// 透明纹理
// material.alphaMap = doorAlphaTexture

// 法线网格材质
// const material =  new THREE.MeshNormalMaterial()
//   // 材质是否使用平面着色进行渲染
// material.flatShading = true


// 高光网格材质 材质捕捉网格材质
// const material = new THREE.MeshMatcapMaterial()
// material.matcap = matcapTexture


// 光照网格材质 深度网格材质
// const material = new THREE.MeshDepthMaterial()


// 环境光网格材质一种非光泽表面的材质，没有镜面高光 必须添加灯光 性能最好, 但是参数不方便
// const material = new THREE.MeshLambertMaterial()


// 镜面网格材质 一种光泽表面的材质，有镜面高光
// const material = new THREE.MeshPhongMaterial()
// material.shininess = 100 // 高光程度
// material.specular = new THREE.Color('#00FF2A') // 高光颜色


//一种实现卡通着色的材质
// const material = new THREE.MeshToonMaterial()
// gradientTexture.minFilter = THREE.NearestFilter
// gradientTexture.magFilter = THREE.NearestFilter
// // gradientTexture.generateMipmaps = false
// // 梯度纹理
// material.gradientMap = gradientTexture


// 标准网格材质
// const material = new THREE.MeshStandardMaterial()
// material.metalness = 0.7 // 金属度
// material.roughness = 0.2 // 粗糙度
// material.map = doorColorTexture
// material.aoMap = doorAmbientOcclusionTexture // 环境遮挡贴图
// material.aoMapIntensity = 1 // 环境遮挡强度
// material.displacementMap = doorHeightTexture // 位移贴图
// material.displacementScale = 0.2 // 位移贴图的缩放
// material.metalnessMap = doorMetalnessTexture // 金属度贴图
// material.roughnessMap = doorRoughnessTexture // 粗糙度贴图
// material.normalMap = doorNormalTexture // 法线贴图
// material.normalScale.set(0.5, 0.5) // 法线贴图的缩放
// material.transparent = true // 透明
// material.alphaMap = doorAlphaTexture // 透明度贴图


// 物理网格材质
const material = new THREE.MeshPhysicalMaterial()
material.metalness = 0 // 金属度
material.roughness = 0 // 粗糙度
// material.map = doorColorTexture
// material.aoMap = doorAmbientOcclusionTexture // 环境遮挡贴图
// material.aoMapIntensity = 1 // 环境遮挡强度
// material.displacementMap = doorHeightTexture // 位移贴图
// material.displacementScale = 0.2 // 位移贴图的缩放
// material.metalnessMap = doorMetalnessTexture // 金属度贴图
// material.roughnessMap = doorRoughnessTexture // 粗糙度贴图
// material.normalMap = doorNormalTexture // 法线贴图
// material.normalScale.set(0.5, 0.5) // 法线贴图的缩放
// material.transparent = true // 透明
// material.alphaMap = doorAlphaTexture // 透明度贴图

// material.clearcoat = 1 // 清漆
// material.clearcoatRoughness = 0.05 // 清漆粗糙度

// material.sheen =1 // 光泽度
// material.sheenColor = new THREE.Color('#ff0000')
// material.sheenRoughness = 0.05 // 光泽度粗糙度

// material.iridescence = 1 // 红外反射
// material.iridescenceIOR = 1 // 红外反射折射率
// material.iridescenceThicknessRange = [100,800] // 红外反射厚度范围

material.transmission = 1 // 透射
material.ior = 1 // 透射折射率
material.thickness = 1 // 厚度






// 创建shpere
const shpereGeometry = new THREE.SphereGeometry(0.5, 64, 64)
const shpere = new THREE.Mesh(shpereGeometry, material)
shpere.position.x = -1.5

// 创建平面
const planeGeometry = new THREE.PlaneGeometry(1, 1, 100,100)
const plane = new THREE.Mesh(planeGeometry, material)

// 创建tours
const torusGeometry = new THREE.TorusGeometry(0.3, 0.1, 64, 128)
const torus = new THREE.Mesh(torusGeometry, material)
torus.position.x = 1.5



scene.add(shpere, plane, torus)


tick()

gui.add(material, 'metalness').min(0).max(1).step(0.001)
gui.add(material,'roughness').min(0).max(1).step(0.001)
gui.add(material,'aoMapIntensity').min(0).max(10).step(0.001)
gui.add(material,'displacementScale').min(0).max(1).step(0.001)
gui.add(material,'clearcoat').min(0).max(1).step(0.001)
gui.add(material,'clearcoatRoughness').min(0).max(1).step(0.001)
gui.add(material,'sheen').min(0).max(1).step(0.001)
gui.add(material,'sheenRoughness').min(0).max(1).step(0.001)
gui.addColor(material,'sheenColor')

gui.add(material,'iridescence').min(0).max(1).step(0.001)
gui.add(material,'iridescenceIOR').min(0).max(1).step(0.001)
gui.add(material.iridescenceThicknessRange,'0').min(0).max(1000).step(1)
gui.add(material.iridescenceThicknessRange,'1').min(0).max(1000).step(1)

gui.add(material,'transmission').min(0).max(1).step(0.001)
gui.add(material,'ior').min(0).max(10).step(0.001)
gui.add(material,'thickness').min(0).max(1).step(0.001)