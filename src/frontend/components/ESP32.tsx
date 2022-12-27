import React, { Suspense } from 'react'
import { OrbitControls } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'

import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

function Mesh() {
    const gltf = useLoader(GLTFLoader, '/teste20.glb')
    const myMesh = React.useRef<any>(null)

    useFrame(({ clock }) => {
        myMesh.current.rotation.y = -(clock.getElapsedTime() / 4)
    })

    return (
        <Suspense fallback={<div>loading...</div> /* or null */}>
            <primitive ref={myMesh} object={gltf.scene} position={[0, 0, 0]} rotation={[0, 1.6, -0.04]} scale = {[5,5,5]} />
        </Suspense>
    )
}

const ESP32: React.FC = () => {
    return (
        <div style={{ height: '100%' }}>
            <Canvas camera={{ position: [0, 0, -40] }}>
                <OrbitControls enableZoom={false} />
                {/* <pointLight position={[-10, 0, 20]} intensity={2} />
                <pointLight position={[10, 0, 20]} intensity={2} />
                <pointLight position={[-10, 0, -20]} intensity={2} />
                <pointLight position={[10, 0, -20]} intensity={2} /> */}
                <pointLight position={[-10, 0, 30]} intensity={1.} />
                <pointLight position={[10, 0, 30]} intensity={1.5} />
                <pointLight position={[-10, 0, -30]} intensity={1.5} />
                <pointLight position={[10, 0, -30]} intensity={1.5} />

                <pointLight position={[10, 30, 1]} intensity={0.5} />
                <pointLight position={[-10, 30, 1]} intensity={0.5} />
                <pointLight position={[10, -30, 1]} intensity={0.5} />
                <pointLight position={[-10, -30, 1]} intensity={0.5} />
                <Mesh />
            </Canvas>
        </div>
    )
}

export default ESP32
