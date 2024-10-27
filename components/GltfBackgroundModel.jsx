// components/GltfBackgroundModel.jsx
import { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

const GltfModel = ({ scrollY }) => {
  const modelRef = useRef();
  const { scene } = useGLTF('/assets/jais_website.gltf'); // Path to your GLTF model

  console.log('GltfModel component rendered');
  console.log('ScrollY value:', scrollY);

  // Comment out the useFrame hook
  // useFrame(() => {
  //   if (modelRef.current) {
  //     modelRef.current.rotation.y = scrollY * 0.001; // Adjust rotation speed here
  //     console.log('Model rotation updated:', modelRef.current.rotation.y);
  //   }
  // });

  // Comment out the scene traversal
  // scene.traverse((child) => {
  //   if (child.isMesh) {
  //     console.log('Mesh found:', child.name);
  //     child.material.color.set('#ffffff'); // Set base color to white
  //     child.material.roughness = 0.5; // Adjust roughness for shine
  //     child.material.metalness = 0.2; // Add a bit of metallic look
  //   }
  // });

  return (
    <primitive object={scene} ref={modelRef} scale={0.1} /> // Further scale down for zooming out
  );
};

const GltfCanvas = ({ scrollY }) => {
  console.log('GltfCanvas component rendered');

  return (
    <Canvas style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}>
      <ambientLight intensity={1} />
      <pointLight position={[10, 10, 10]} intensity={1.5} />
      {/* Set camera position higher and further back for a better overview */}
      <perspectiveCamera position={[0, 80, 170]} fov={75} /> {/* Adjust Y and Z values as needed */}
      <GltfModel scrollY={scrollY} />
    </Canvas>
  );
};

export default GltfCanvas;
