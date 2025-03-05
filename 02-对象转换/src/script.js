import * as THREE from 'three'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Object
 */
// const geometry = new THREE.BoxGeometry(1, 1, 1)
// const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
// const mesh = new THREE.Mesh(geometry, material)
// // 设置物体在三个轴向上的位置
// // mesh.position.x = 0.7    // x轴正方向移动0.7个单位
// // mesh.position.y = - 0.6  // y轴负方向移动0.6个单位
// // mesh.position.z = 0.65   // z轴正方向移动0.65个单位

// mesh.position.set(0, 0, 0) // 设置物体位置 一次性设置
// scene.add(mesh)

// // normalize()方法会将向量的长度归一化为1，保持方向不变
// // 这意味着物体会沿着从原点到当前位置的方向移动，但距离会变为1个单位
// // mesh.position.normalize()

// // length()方法返回从原点(0,0,0)到物体当前位置的距离
// // console.log(mesh.position.length())
// // 缩放
// mesh.scale.set(2, 0.5, 0.5) // 设置物体缩放 一次性设置

// // 旋转  属性选装 和 quaternion 四元数旋转
// const PI = Math.PI

// mesh.rotation.reorder('YXZ') // 设置旋转顺序
// mesh.rotation.y = PI * 0.25
// mesh.rotation.x = PI * 0.25


//  创建一个组
const group = new THREE.Group()

scene.add(group)

const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
const  cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0x00ff00 }),
)
cube1.position.set(1.5, 0, 0)

group.add(cube)
group.add(cube1)

// mesh.rotation.set(0, 90, 0) // 设置物体旋转 一次性设置 属性选装 

// 四元数旋转
//  创建 AxesHelper 辅助轴线
const axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper)

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
// camera.position.z = 3
camera.position.set(1, 1, 3) // 设置相机位置 一次性设置
scene.add(camera)

// 设置摄像机看向物体
// camera.lookAt(mesh.position)

// distanceTo()方法计算两个点之间的欧几里得距离
// 这里计算的是物体中心到相机位置的直线距离
// console.log(mesh.position.distanceTo(camera.position))

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)