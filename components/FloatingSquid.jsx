'use client';

import React, { useRef, useEffect } from 'react';
import { useFrame, useLoader, Canvas, useThree } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';

// Helper function to resize the renderer based on the canvas size
const resizeRendererToDisplaySize = (renderer) => {
  const canvas = renderer.domElement;
  const pixelRatio = window.devicePixelRatio;
  const width = Math.floor(canvas.clientWidth * pixelRatio);
  const height = Math.floor(canvas.clientHeight * pixelRatio);

  if (canvas.width !== width || canvas.height !== height) {
    renderer.setSize(width, height, false);
    return true;
  }
  return false;
};

const RotatingSquid = ({ scrollY, modelPath, rotationSpeed = 0.005 }) => {
  const squidModel = useLoader(GLTFLoader, modelPath, (loader) => {
    loader.onError = (error) => {
      console.error('Error loading GLTF model:', error);
    };
  });

  const squidMeshRef = useRef();

  useEffect(() => {
    if (squidMeshRef.current) {
      squidMeshRef.current.rotation.set(0, 0, 0); // Reset rotation
    }
  }, []);

  useFrame(({ gl, camera }) => {
    if (resizeRendererToDisplaySize(gl)) {
      const { width, height } = gl.domElement;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    }

    if (squidMeshRef.current) {
      squidMeshRef.current.rotation.y = scrollY * rotationSpeed; // Reduced multiplier
    }
  });

  return (
    <mesh ref={squidMeshRef} position={[0, -20, 0]} castShadow> {/* Adjusted position */}
      <primitive object={squidModel.scene} scale={[0.1, 0.1, 0.1]} /> {/* Adjusted scale */}
    </mesh>
  );
};

const CameraSetup = () => {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(-90, 0, 0); // Adjust camera position
    camera.lookAt(new THREE.Vector3(0, 0, 0)); // Ensure camera is focused on the squid
    camera.fov = 40; // Adjust field of view
    camera.updateProjectionMatrix();
  }, [camera]);

  return null;
};
const SquidScene = ({ scrollY }) => (
  <div className="fixed right-0 top-0 h-screen w-[50vw] bg-transparent z-[-1] flex items-center justify-center">
    <div className="relative h-[80vh] w-[80vw] bg-transparent rounded-full flex items-center justify-center overflow-visible">
      {/* Outer shadow effect */}
      <div className="absolute inset-[-40px] rounded-full bg-black opacity-50 blur-2xl z-20"></div>
      
      {/* Porthole content */}
      <div className="relative h-full w-full rounded-full border-[24px] border-gray-800 flex items-center justify-center overflow-hidden shadow-[inset_0_0_30px_10px_rgba(0,0,0,0.5)] z-30">
        {/* Glass Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-blue-800 opacity-40 z-10"></div>
        
        {/* Placeholder Image */}
        <img 
          src="https://picsum.photos/1920/1080" 
          alt="Underwater scene"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        
        <Canvas className="h-full w-full relative z-20">
          <ambientLight intensity={1} />
          <pointLight position={[10, 10, 10]} />
          <CameraSetup />
          <RotatingSquid scrollY={scrollY} modelPath="assets/squid-Mesh 1113983/24_09_09_17_35_11_332.gltf" />
        </Canvas>
        
        {/* Porthole Frame */}
        <div className="absolute inset-0 border-[24px] border-gray-800 shadow-2xl shadow-black rounded-full z-30">
          {/* Inner ring */}
          <div className="absolute inset-4 border-8 border-gray-700 rounded-full "></div>
          {/* Rivets */}
          {[...Array(16)].map((_, i) => (
            <div key={i} className="absolute w-6 h-6 bg-gray-800 rounded-full shadow-inner" style={{
              top: `${50 + 46 * Math.cos(i * Math.PI / 8)}%`,
              left: `${50 + 46 * Math.sin(i * Math.PI / 8)}%`,
              transform: 'translate(-50%, -50%)'
            }}></div>
          ))}
        </div>
        
        
        {/* Reflection Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-white to-transparent opacity-10 z-50 rounded-full"></div>
      </div>
    </div>
  </div>
);
export default SquidScene;