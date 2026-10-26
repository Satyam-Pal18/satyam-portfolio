// src/components/DeveloperAvatar3D.jsx
import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

/**
 * DeveloperAvatar3D - Interactive 3D Cartoon Developer Boy
 * Built with Three.js:
 * - Stylized 3D character in modern black hoodie with orange accents
 * - Sleek developer headphones with glowing orange LED rings
 * - Interactive laptop with screen glow
 * - Natural idle animations: breathing, blinking, subtle head tracking
 * - Synchronized speech animations: expressive mouth movement, head nods, pulsing audio glow
 * - Comprehensive cleanup & WebGL fallback
 */
export default function DeveloperAvatar3D({ isSpeaking = false, speechIntensity = 0.5 }) {
  const mountRef = useRef(null)
  const [hasWebGL, setHasWebGL] = useState(true)
  const isSpeakingRef = useRef(isSpeaking)
  isSpeakingRef.current = isSpeaking

  useEffect(() => {
    const container = mountRef.current
    if (!container) return

    // Verify WebGL availability
    try {
      const testCanvas = document.createElement('canvas')
      const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl')
      if (!gl) {
        setHasWebGL(false)
        return
      }
    } catch {
      setHasWebGL(false)
      return
    }

    let animationFrameId
    const width = container.clientWidth || 320
    const height = container.clientHeight || 320

    // 1. Scene setup
    const scene = new THREE.Scene()

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100)
    camera.position.set(0, 0.2, 3.8)

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.15
    container.appendChild(renderer.domElement)

    // 4. Lighting - Cyberpunk Black & Orange Theme
    const ambientLight = new THREE.AmbientLight(0xfff5ea, 1.2)
    scene.add(ambientLight)

    // Key Light (warm soft light)
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.0)
    keyLight.position.set(2, 3, 3)
    scene.add(keyLight)

    // Rim Light (Iconic Orange Glow from behind)
    const rimLight = new THREE.DirectionalLight(0xff7a00, 3.8)
    rimLight.position.set(-3, 2, -2)
    scene.add(rimLight)

    // Secondary Orange Fill
    const fillLight = new THREE.DirectionalLight(0xff9a40, 1.5)
    fillLight.position.set(2, -1, 1)
    scene.add(fillLight)

    // Laptop Screen Point Light (illuminates face from below)
    const laptopGlow = new THREE.PointLight(0xff7a00, 2.2, 3)
    laptopGlow.position.set(0, -0.4, 0.9)
    scene.add(laptopGlow)

    // 5. Build Stylized 3D Cartoon Developer Character
    const characterGroup = new THREE.Group()
    scene.add(characterGroup)
    characterGroup.position.y = -0.15

    // Materials
    const skinMaterial = new THREE.MeshStandardMaterial({
      color: 0xffd1b3,
      roughness: 0.45,
      metalness: 0.05,
    })

    const hairMaterial = new THREE.MeshStandardMaterial({
      color: 0x18181b,
      roughness: 0.7,
      metalness: 0.1,
    })

    const hoodieMaterial = new THREE.MeshStandardMaterial({
      color: 0x121215,
      roughness: 0.8,
      metalness: 0.1,
    })

    const orangeAccentMaterial = new THREE.MeshStandardMaterial({
      color: 0xff7a00,
      emissive: 0xff7a00,
      emissiveIntensity: 0.6,
      roughness: 0.3,
    })

    const orangeGlowMaterial = new THREE.MeshStandardMaterial({
      color: 0xff7a00,
      emissive: 0xff7a00,
      emissiveIntensity: 1.2,
      roughness: 0.2,
    })

    const eyeWhiteMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff })
    const pupilMaterial = new THREE.MeshBasicMaterial({ color: 0x0f172a })
    const eyelidMaterial = new THREE.MeshStandardMaterial({ color: 0xffc4a0, roughness: 0.5 })
    const mouthMaterial = new THREE.MeshBasicMaterial({ color: 0xbe123c })

    // --- Head Group ---
    const headGroup = new THREE.Group()
    headGroup.position.set(0, 0.45, 0)
    characterGroup.add(headGroup)

    // Head base (curved cube-sphere for friendly stylized cartoon proportions)
    const headGeo = new THREE.SphereGeometry(0.52, 32, 32)
    headGeo.scale(1, 1.08, 0.95)
    const headMesh = new THREE.Mesh(headGeo, skinMaterial)
    headGroup.add(headMesh)

    // Ears
    const earGeo = new THREE.SphereGeometry(0.1, 16, 16)
    earGeo.scale(0.6, 1, 0.7)
    const leftEar = new THREE.Mesh(earGeo, skinMaterial)
    leftEar.position.set(-0.52, 0.02, 0)
    headGroup.add(leftEar)
    const rightEar = leftEar.clone()
    rightEar.position.x = 0.52
    headGroup.add(rightEar)

    // Nose (subtle stylized cartoon nose)
    const noseGeo = new THREE.SphereGeometry(0.06, 16, 16)
    noseGeo.scale(0.8, 0.7, 1)
    const nose = new THREE.Mesh(noseGeo, skinMaterial)
    nose.position.set(0, 0, 0.51)
    headGroup.add(nose)

    // --- Eyes with Blinking Eyelids ---
    const eyeGroup = new THREE.Group()
    headGroup.add(eyeGroup)

    const eyeGeo = new THREE.SphereGeometry(0.095, 24, 24)
    eyeGeo.scale(1, 1.2, 0.6)

    // Left Eye
    const leftEye = new THREE.Mesh(eyeGeo, eyeWhiteMaterial)
    leftEye.position.set(-0.19, 0.08, 0.44)
    eyeGroup.add(leftEye)

    const pupilGeo = new THREE.SphereGeometry(0.05, 16, 16)
    pupilGeo.scale(1, 1.1, 0.4)
    const leftPupil = new THREE.Mesh(pupilGeo, pupilMaterial)
    leftPupil.position.set(-0.19, 0.08, 0.485)
    eyeGroup.add(leftPupil)

    // Right Eye
    const rightEye = leftEye.clone()
    rightEye.position.x = 0.19
    eyeGroup.add(rightEye)

    const rightPupil = leftPupil.clone()
    rightPupil.position.x = 0.19
    eyeGroup.add(rightPupil)

    // Eyelids for Blinking
    const eyelidGeo = new THREE.SphereGeometry(0.105, 24, 16, 0, Math.PI * 2, 0, Math.PI * 0.5)
    eyelidGeo.scale(1, 1.2, 0.7)
    const leftEyelid = new THREE.Mesh(eyelidGeo, eyelidMaterial)
    leftEyelid.position.set(-0.19, 0.1, 0.45)
    leftEyelid.rotation.x = -Math.PI * 0.5
    leftEyelid.scale.set(1, 0.05, 1) // Open by default
    eyeGroup.add(leftEyelid)

    const rightEyelid = leftEyelid.clone()
    rightEyelid.position.x = 0.19
    eyeGroup.add(rightEyelid)

    // Eyebrows
    const browGeo = new THREE.BoxGeometry(0.16, 0.035, 0.04)
    const leftBrow = new THREE.Mesh(browGeo, hairMaterial)
    leftBrow.position.set(-0.19, 0.24, 0.46)
    leftBrow.rotation.z = 0.1
    headGroup.add(leftBrow)

    const rightBrow = leftBrow.clone()
    rightBrow.position.x = 0.19
    rightBrow.rotation.z = -0.1
    headGroup.add(rightBrow)

    // --- Animated Mouth ---
    const mouthGeo = new THREE.CapsuleGeometry(0.04, 0.11, 8, 16)
    mouthGeo.rotateZ(Math.PI / 2)
    const mouthMesh = new THREE.Mesh(mouthGeo, mouthMaterial)
    mouthMesh.position.set(0, -0.18, 0.48)
    headGroup.add(mouthMesh)

    // --- Stylized Modern Hair (Layered Tufts) ---
    const hairGroup = new THREE.Group()
    headGroup.add(hairGroup)

    const mainHairGeo = new THREE.SphereGeometry(0.55, 32, 32)
    mainHairGeo.scale(1.02, 1.05, 1.02)
    const hairBase = new THREE.Mesh(mainHairGeo, hairMaterial)
    hairBase.position.set(0, 0.1, -0.04)
    hairGroup.add(hairBase)

    // Stylish front hair tufts / bangs
    const tuftGeo = new THREE.ConeGeometry(0.16, 0.35, 8)
    tuftGeo.rotateX(Math.PI * 0.3)

    const tuft1 = new THREE.Mesh(tuftGeo, hairMaterial)
    tuft1.position.set(-0.15, 0.48, 0.38)
    tuft1.rotation.z = -0.25
    hairGroup.add(tuft1)

    const tuft2 = new THREE.Mesh(tuftGeo, hairMaterial)
    tuft2.position.set(0.08, 0.52, 0.39)
    tuft2.rotation.z = 0.2
    tuft2.scale.set(1.1, 1.2, 1.1)
    hairGroup.add(tuft2)

    const tuft3 = new THREE.Mesh(tuftGeo, hairMaterial)
    tuft3.position.set(0.25, 0.42, 0.35)
    tuft3.rotation.z = 0.4
    tuft3.scale.set(0.85, 0.9, 0.85)
    hairGroup.add(tuft3)

    // --- Developer Headphones with Glowing Orange Rings ---
    const headphoneGroup = new THREE.Group()
    headGroup.add(headphoneGroup)

    // Headband
    const bandCurve = new THREE.EllipseCurve(0, 0, 0.56, 0.58, 0, Math.PI, false, 0)
    const bandPoints = bandCurve.getPoints(32)
    const bandGeo = new THREE.TubeGeometry(
      new THREE.CatmullRomCurve3(bandPoints.map((p) => new THREE.Vector3(p.x, p.y, 0))),
      32,
      0.04,
      8,
      false
    )
    const headband = new THREE.Mesh(bandGeo, hoodieMaterial)
    headband.position.set(0, 0.05, 0.02)
    headphoneGroup.add(headband)

    // Earcups with glowing neon rings
    const cupGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.12, 24)
    cupGeo.rotateZ(Math.PI / 2)

    const leftCup = new THREE.Mesh(cupGeo, hoodieMaterial)
    leftCup.position.set(-0.56, 0.04, 0.02)
    headphoneGroup.add(leftCup)

    const rightCup = leftCup.clone()
    rightCup.position.x = 0.56
    headphoneGroup.add(rightCup)

    // Orange Glowing Rings on Earcups
    const ringGeo = new THREE.TorusGeometry(0.14, 0.022, 16, 32)
    ringGeo.rotateY(Math.PI / 2)

    const leftRing = new THREE.Mesh(ringGeo, orangeGlowMaterial)
    leftRing.position.set(-0.625, 0.04, 0.02)
    headphoneGroup.add(leftRing)

    const rightRing = leftRing.clone()
    rightRing.position.x = 0.625
    headphoneGroup.add(rightRing)

    // --- Torso / Hoodie ---
    const bodyGroup = new THREE.Group()
    characterGroup.add(bodyGroup)

    const bodyGeo = new THREE.CylinderGeometry(0.36, 0.48, 0.8, 32)
    const bodyMesh = new THREE.Mesh(bodyGeo, hoodieMaterial)
    bodyMesh.position.set(0, -0.25, -0.05)
    bodyGroup.add(bodyMesh)

    // High collar
    const collarGeo = new THREE.TorusGeometry(0.28, 0.07, 16, 32)
    collarGeo.rotateX(Math.PI / 2)
    const collar = new THREE.Mesh(collarGeo, hoodieMaterial)
    collar.position.set(0, 0.08, -0.02)
    bodyGroup.add(collar)

    // Orange Zipper / Accent Line
    const zipperGeo = new THREE.BoxGeometry(0.025, 0.6, 0.02)
    const zipper = new THREE.Mesh(zipperGeo, orangeAccentMaterial)
    zipper.position.set(0, -0.22, 0.35)
    bodyGroup.add(zipper)

    // Shoulders
    const shoulderGeo = new THREE.SphereGeometry(0.18, 24, 24)
    const leftShoulder = new THREE.Mesh(shoulderGeo, hoodieMaterial)
    leftShoulder.position.set(-0.48, -0.08, -0.02)
    bodyGroup.add(leftShoulder)

    const rightShoulder = leftShoulder.clone()
    rightShoulder.position.x = 0.48
    bodyGroup.add(rightShoulder)

    // Forearms reaching towards laptop
    const armGeo = new THREE.CylinderGeometry(0.11, 0.12, 0.45, 16)
    armGeo.rotateX(Math.PI * 0.35)

    const leftArm = new THREE.Mesh(armGeo, hoodieMaterial)
    leftArm.position.set(-0.35, -0.25, 0.22)
    leftArm.rotation.z = -0.3
    bodyGroup.add(leftArm)

    const rightArm = leftArm.clone()
    rightArm.position.x = 0.35
    rightArm.rotation.z = 0.3
    bodyGroup.add(rightArm)

    // Hands
    const handGeo = new THREE.SphereGeometry(0.09, 16, 16)
    const leftHand = new THREE.Mesh(handGeo, skinMaterial)
    leftHand.position.set(-0.25, -0.34, 0.45)
    bodyGroup.add(leftHand)

    const rightHand = leftHand.clone()
    rightHand.position.x = 0.25
    bodyGroup.add(rightHand)

    // --- Developer Laptop with Glowing Orange Screen ---
    const laptopGroup = new THREE.Group()
    laptopGroup.position.set(0, -0.42, 0.62)
    laptopGroup.rotation.x = -0.15
    characterGroup.add(laptopGroup)

    // Laptop Base / Keyboard deck
    const deckGeo = new THREE.BoxGeometry(0.68, 0.025, 0.48)
    const deckMesh = new THREE.Mesh(deckGeo, hoodieMaterial)
    laptopGroup.add(deckMesh)

    // Keyboard glow
    const kbGeo = new THREE.BoxGeometry(0.56, 0.005, 0.28)
    const kbMesh = new THREE.Mesh(kbGeo, orangeAccentMaterial)
    kbMesh.position.set(0, 0.015, 0.03)
    laptopGroup.add(kbMesh)

    // Laptop Screen Lid (Open at angle)
    const lidGroup = new THREE.Group()
    lidGroup.position.set(0, 0.015, -0.23)
    lidGroup.rotation.x = -Math.PI * 0.38
    laptopGroup.add(lidGroup)

    const screenBackGeo = new THREE.BoxGeometry(0.68, 0.44, 0.02)
    const screenBackMesh = new THREE.Mesh(screenBackGeo, hoodieMaterial)
    screenBackMesh.position.set(0, 0.22, 0)
    lidGroup.add(screenBackMesh)

    // Glowing Screen with code aesthetic
    const screenDisplayGeo = new THREE.PlaneGeometry(0.62, 0.38)
    const screenDisplayMat = new THREE.MeshBasicMaterial({
      color: 0x09090b,
    })
    const screenDisplay = new THREE.Mesh(screenDisplayGeo, screenDisplayMat)
    screenDisplay.position.set(0, 0.22, 0.012)
    lidGroup.add(screenDisplay)

    // Code lines on screen
    const codeGroup = new THREE.Group()
    screenDisplay.add(codeGroup)
    for (let c = 0; c < 5; c++) {
      const codeLineGeo = new THREE.PlaneGeometry(0.25 + (c % 3) * 0.12, 0.018)
      const codeLineMat = new THREE.MeshBasicMaterial({
        color: c === 0 ? 0xff7a00 : 0x38bdf8,
      })
      const codeLine = new THREE.Mesh(codeLineGeo, codeLineMat)
      codeLine.position.set(-0.1 + (c % 2) * 0.04, 0.11 - c * 0.05, 0.001)
      codeGroup.add(codeLine)
    }

    // --- Floating Glowing Ambient Tech Rings ---
    const ringAuraGeo = new THREE.TorusGeometry(0.85, 0.008, 16, 64)
    ringAuraGeo.rotateX(Math.PI / 2)
    const auraMesh = new THREE.Mesh(ringAuraGeo, orangeGlowMaterial)
    auraMesh.position.set(0, -0.4, 0)
    characterGroup.add(auraMesh)

    // 6. Interactive Mouse Tracking
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 }
    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect()
      const clientX = e.clientX - rect.left - rect.width / 2
      const clientY = e.clientY - rect.top - rect.height / 2
      mouse.targetX = (clientX / (rect.width / 2)) * 0.4
      mouse.targetY = -(clientY / (rect.height / 2)) * 0.3
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    // 7. Blinking state machine
    let isBlinking = false
    let blinkTimer = 0
    let nextBlinkTime = 2.5 + Math.random() * 2

    // Check reduced motion preference
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // 8. Animation Loop
    const clock = new THREE.Clock()

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)

      const delta = clock.getDelta()
      const time = clock.getElapsedTime()
      const speaking = isSpeakingRef.current

      // Mouse Look interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.06
      mouse.y += (mouse.targetY - mouse.y) * 0.06

      if (prefersReducedMotion) {
        // Reduced motion: stable, non-oscillating pose
        characterGroup.position.y = -0.15
        bodyGroup.scale.set(1, 1, 1)
        headGroup.rotation.y = mouse.x * 0.3
        headGroup.rotation.x = -mouse.y * 0.25
        headGroup.rotation.z = 0

        if (speaking) {
          const speechCadence = Math.abs(Math.sin(time * 10)) * 0.08
          mouthMesh.scale.y = 1 + speechCadence * 3
          leftRing.material.emissiveIntensity = 1.3
          laptopGlow.intensity = 2.2
        } else {
          mouthMesh.scale.set(1, 1, 1)
          leftRing.material.emissiveIntensity = 0.9
          laptopGlow.intensity = 1.8
        }
      } else {
        // Idle Floating Animation
        const floatY = Math.sin(time * 1.8) * 0.045
        characterGroup.position.y = -0.15 + floatY

        // Breathing Animation (Chest & Shoulders expand gently)
        const breath = Math.sin(time * 2.2) * 0.02
        bodyGroup.scale.set(1 + breath, 1 + breath * 0.6, 1 + breath)

        // Head Orientation (Mouse Tracking + Gentle Natural Sway)
        const naturalSwayY = Math.sin(time * 1.2) * 0.05
        const naturalSwayX = Math.cos(time * 1.5) * 0.025
        headGroup.rotation.y = mouse.x * 0.6 + naturalSwayY
        headGroup.rotation.x = -mouse.y * 0.5 + naturalSwayX

        // Eye Blinking logic
        blinkTimer += delta
        if (!isBlinking && blinkTimer > nextBlinkTime) {
          isBlinking = true
          blinkTimer = 0
          leftEyelid.scale.y = 1
          rightEyelid.scale.y = 1
        } else if (isBlinking && blinkTimer > 0.12) {
          isBlinking = false
          blinkTimer = 0
          nextBlinkTime = 2.5 + Math.random() * 3.5
          leftEyelid.scale.y = 0.05
          rightEyelid.scale.y = 0.05
        }

        // --- Speaking Animation Mode ---
        if (speaking) {
          // Natural speech mouth opening & articulation cadence
          const speechCadence = Math.abs(Math.sin(time * 14)) * 0.09 + Math.abs(Math.cos(time * 9)) * 0.04
          mouthMesh.scale.y = 1 + speechCadence * 3.5
          mouthMesh.scale.x = 1 - speechCadence * 0.6

          // Conversational head nods & gestures
          const speechNod = Math.sin(time * 6) * 0.04
          headGroup.rotation.x += speechNod
          headGroup.rotation.z = Math.sin(time * 3) * 0.025

          // Glowing orange headphone LED intensity reacts to speech
          leftRing.material.emissiveIntensity = 1.2 + Math.sin(time * 12) * 0.6
          laptopGlow.intensity = 2.4 + Math.sin(time * 10) * 0.8
          auraMesh.rotation.z += 0.02
          auraMesh.scale.setScalar(1 + Math.sin(time * 8) * 0.03)
        } else {
          // Return to neutral resting smile
          mouthMesh.scale.set(1, 1, 1)
          leftRing.material.emissiveIntensity = 0.9
          laptopGlow.intensity = 1.8
          auraMesh.rotation.z += 0.005
          auraMesh.scale.setScalar(1)
        }
      }

      renderer.render(scene, camera)
    }

    animate()

    // Handle Resize with dimension protection
    const handleResize = () => {
      if (!container) return
      const newWidth = container.clientWidth
      const newHeight = container.clientHeight
      if (newWidth > 0 && newHeight > 0) {
        camera.aspect = newWidth / newHeight
        camera.updateProjectionMatrix()
        renderer.setSize(newWidth, newHeight)
      }
    }
    window.addEventListener('resize', handleResize)

    // Cleanup on unmount
    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)

      // Dispose geometries & materials
      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose()
        if (obj.material) {
          if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose())
          else obj.material.dispose()
        }
      })

      renderer.dispose()
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement)
      }
    }
  }, [])

  // Graceful Fallback if WebGL is disabled or unsupported
  if (!hasWebGL) {
    return (
      <div className="relative w-56 h-56 sm:w-64 sm:h-64 lg:w-72 lg:h-72 rounded-full overflow-hidden border-2 border-orange-500/40 glow-orange flex items-center justify-center bg-dark-800">
        <div className="text-center p-6">
          <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-3 rounded-full bg-gradient-to-tr from-orange-500 to-orange-400/80 flex items-center justify-center shadow-lg">
            <span className="text-3xl sm:text-4xl">👨‍💻</span>
          </div>
          <p className="font-display font-bold text-white text-sm sm:text-base">Satyam Pal</p>
          <p className="text-xs font-mono text-orange-400 mt-1">Frontend Developer</p>
        </div>
      </div>
    )
  }

  return (
    <div
      ref={mountRef}
      className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 flex items-center justify-center pointer-events-auto"
      aria-label="Interactive 3D Cartoon Developer Character"
    />
  )
}
