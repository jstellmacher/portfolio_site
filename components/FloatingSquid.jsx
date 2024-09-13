'use client';

import React, { useRef, useEffect, useState } from 'react';
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

const RotatingSquid = ({ scrollY, modelPath, rotationSpeed = 0.005, isSmall }) => {
    const squidModel = useLoader(GLTFLoader, modelPath, (loader) => {
      loader.onError = (error) => {
        console.error('Error loading GLTF model:', error);
      };
    });
  
    const squidMeshRef = useRef();
    const [time, setTime] = useState(0); // Initialize time state
  
    useEffect(() => {
      if (squidMeshRef.current) {
        squidMeshRef.current.rotation.set(0, 0, 0);
      }
    }, []);
  
    useFrame((_, delta) => {
        if (squidMeshRef.current) {
          squidMeshRef.current.rotation.y = scrollY * rotationSpeed;
      
          // Update time and use it for the bobbing effect, starting downward
          setTime((prevTime) => {
            const newTime = prevTime + delta;
            const bobbingAmount = Math.sin(newTime * 2 + Math.PI) * 0.4; // Shift sine wave by π to start with downward motion
            squidMeshRef.current.position.y = (isSmall ? -3.5 : -20) + bobbingAmount; // Adjust the initial y-position for both small and normal size
            return newTime;
          });
        }
      });
  
    const scale = isSmall ? [0.02, 0.02, 0.02] : [0.1, 0.1, 0.1];
    const position = isSmall ? [0, -3.5, 0] : [0, -20, 0];
  
    return (
      <mesh ref={squidMeshRef} position={position} castShadow>
        <primitive object={squidModel.scene} scale={scale} />
      </mesh>
    );
  };

const CameraSetup = ({ isSmall }) => {
  const { camera } = useThree();

  useEffect(() => {
    if (isSmall) {
      camera.position.set(-30, 0, 0); // Set to -30.5, halfway between -30 and -31
      camera.fov = 24; // Adjusted FOV to fine-tune the zoom level
    } else {
      camera.position.set(-90, 0, 0);
      camera.fov = 40;
    }
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    camera.updateProjectionMatrix();
  }, [camera, isSmall]);

  return null;
};

const SquidScene = ({ scrollY }) => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 1024); // Adjust this breakpoint as needed
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <div className={`fixed ${isSmallScreen ? 'right-4 top-28' : 'right-0 top-0 bottom-0 w-1/2'} pointer-events-none flex items-center justify-center`} style={{ zIndex: -1 }}>
      <div className={`relative ${isSmallScreen ? 'w-20 h-20' : 'w-[80vmin] h-[80vmin] max-w-[600px] max-h-[600px]'}`}>
        {isSmallScreen ? (
          <>
            <div className="absolute inset-[-20%] rounded-full bg-blue-900 opacity-10 blur-xl"></div>
            <div className="absolute inset-[-15%] rounded-full bg-blue-700 opacity-15 blur-lg"></div>
            <div className="absolute inset-0 rounded-full overflow-hidden border-2 border-blue-300 shadow-lg shadow-blue-500/50">
              <div className="absolute inset-0 bg-transparent"></div>
              <Canvas className="w-full h-full">
                <ambientLight intensity={0.8} />
                <pointLight position={[10, 10, 10]} intensity={1.2} />
                <CameraSetup isSmall={isSmallScreen} />
                <RotatingSquid scrollY={scrollY} modelPath="assets/squid-Mesh 1113983/24_09_09_17_35_11_332.gltf" isSmall={isSmallScreen} />
              </Canvas>
              <div className="absolute inset-0 bg-gradient-to-t from-blue-500 to-transparent opacity-10"></div>
            </div>
          </>
        ) : (
          <>
            <div className="absolute inset-[-5%] rounded-full bg-black opacity-50 blur-xl"></div>
            <div className="absolute inset-0 rounded-full border-[24px] border-gray-800 overflow-hidden shadow-[inset_0_0_30px_10px_rgba(0,0,0,0.5)]">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-blue-800 opacity-40"></div>
              <img 
                src="https://picsum.photos/1920/1080" 
                alt="Underwater scene"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <Canvas className="absolute inset-0">
                <ambientLight intensity={1} />
                <pointLight position={[10, 10, 10]} />
                <CameraSetup isSmall={isSmallScreen} />
                <RotatingSquid scrollY={scrollY} modelPath="assets/squid-Mesh 1113983/24_09_09_17_35_11_332.gltf" isSmall={isSmallScreen} />
              </Canvas>
              <div className="absolute inset-0 border-[24px] border-gray-800 rounded-full">
                <div className="absolute inset-4 border-8 border-gray-700 rounded-full"></div>
                {[...Array(16)].map((_, i) => (
                  <div key={i} className="absolute w-6 h-6 bg-gray-800 rounded-full shadow-inner" style={{
                    top: `${50 + 46 * Math.cos(i * Math.PI / 8)}%`,
                    left: `${50 + 46 * Math.sin(i * Math.PI / 8)}%`,
                    transform: 'translate(-50%, -50%)'
                  }}></div>
                ))}
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-white to-transparent opacity-10 rounded-full"></div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SquidScene;