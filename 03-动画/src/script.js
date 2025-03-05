import * as THREE from 'three'
import gsap from 'gsap' // 动画库

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
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

// 创建 GSAP 时间轴
const timeline = gsap.timeline({
    repeat: 1 // -1 表示无限循环
})

// 添加连续的动画序列
timeline
    .to(mesh.position, {
        x: 2,
        duration: 1,
        ease: 'power2.inOut'
    })
    .to(mesh.position, {
        x: 0,
        duration: 1,
        ease: 'power2.inOut'
    })
    .to(mesh.rotation, {
        y: Math.PI * 2, // 旋转一圈
        duration: 1,
        ease: 'none'
    })
    .to(mesh.scale, {
        x: 1.5,
        y: 1.5,
        z: 1.5,
        duration: 0.5,
        ease: 'bounce.out'
    })
    .to(mesh.scale, {
        x: 1,
        y: 1,
        z: 1,
        duration: 0.5,
        ease: 'bounce.out'
    })

// 动画循环
const tick = () => {
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}

tick()