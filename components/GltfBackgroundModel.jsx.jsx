// components/GltfBackgroundModel.jsx
import { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

const GltfModel = ({ scrollY }) => {
  const modelRef = useRef();
  const { scene } = useGLTF('/assets/jais_website.gltf'); // Path to your GLTF model

  // Rotate the model based on scroll position
  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y = scrollY * 0.001; // Adjust rotation speed here
    }
  });

  return (
    <primitive object={scene} ref={modelRef} scale={0.5} /> // Adjust scale as needed
  );
};

const GltfCanvas = ({ scrollY }) => {
  return (
    <Canvas style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1.5} />
      <GltfModel scrollY={scrollY} />
    </Canvas>
  );
};

export default GltfCanvas;