import React, { useRef, useEffect, useState, Suspense } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// Loading fallback component
const ModelLoader = () => (
  <mesh>
    <boxGeometry args={[1, 1, 1]} />
    <meshStandardMaterial color="gray" />
  </mesh>
);

// Custom shader material for iOS-style smooth rounded corners
const createRoundedVideoMaterial = (videoTexture: THREE.VideoTexture, cornerRadius: number = 0.12) => {
  const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    uniform sampler2D videoTexture;
    uniform float cornerRadius;
    varying vec2 vUv;

    // iOS-style rounded rectangle SDF with smoother curves
    float roundedBoxSDF(vec2 p, vec2 b, float r) {
      vec2 q = abs(p) - b + r;
      return min(max(q.x, q.y), 0.0) + length(max(q, 0.0)) - r;
    }

    void main() {
      // Convert UV to centered coordinates
      vec2 p = (vUv - 0.5) * 2.0; // Scale to -1 to 1
      
      // Define the box size (slightly smaller for better proportions)
      vec2 boxSize = vec2(1.03, 1);
      
      // Calculate distance to rounded rectangle
      float dist = roundedBoxSDF(p, boxSize, cornerRadius);
      
      // Smooth anti-aliasing using fwidth for screen-space derivatives
      float alpha = 1.0 - smoothstep(-0.01, 0.01, dist);
      
      // If alpha is too low, discard the fragment for performance
      if (alpha < 0.001) {
        discard;
      }
      
      // Sample the video texture
      vec4 videoColor = texture2D(videoTexture, vUv);
      
      // Apply smooth alpha for anti-aliasing
      gl_FragColor = vec4(videoColor.rgb, videoColor.a * alpha);
    }
  `;

  return new THREE.ShaderMaterial({
    uniforms: {
      videoTexture: { value: videoTexture },
      cornerRadius: { value: cornerRadius }
    },
    vertexShader,
    fragmentShader,
    transparent: true,
    side: THREE.FrontSide,
    // Enable derivatives for smooth anti-aliasing
    extensions: {
      derivatives: true
    }
  });
};

function PhoneModel({ videoTexture }: { videoTexture: THREE.VideoTexture }) {
  const gltf = useLoader(GLTFLoader, '/scene.gltf');
  const groupRef = useRef<THREE.Group>(null);
  const [roundedMaterial, setRoundedMaterial] = useState<THREE.ShaderMaterial | null>(null);

  useEffect(() => {
    if (videoTexture) {
      const material = createRoundedVideoMaterial(videoTexture, 0.22); // iOS-style corner radius
      setRoundedMaterial(material);

      return () => {
        material.dispose();
      };
    }
  }, [videoTexture]);

  useFrame((state) => {
    // Gentle horizontal rotation only
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.15;
    }
  });

  return (
      <group ref={groupRef}>
        {/* Render the iPhone model - scaled up for better visibility */}
        <primitive 
          object={gltf.scene} 
          scale={[0.85, 0.85, 0.85]} 
          position={[0, -0.063, 0]}
          castShadow
          receiveShadow
        />

        {/* Video screen overlay with rounded corners */}
        {videoTexture && roundedMaterial && (
            <mesh 
              position={[0, 0.0007, 0.0035]} 
              scale={[0.77, 0.8, 0.8]}
              castShadow
              receiveShadow
            >
              {/* Video screen */}
              <planeGeometry args={[0.075, 0.155]} />
              <primitive object={roundedMaterial} />
            </mesh>
        )}
      </group>
  );
}

export function PhoneScreen() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const [videoTexture, setVideoTexture] = useState<THREE.VideoTexture | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Intersection Observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Only load once
        }
      },
      { threshold: 0.1 }
    );

    if (canvasRef.current) {
      observer.observe(canvasRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (videoRef.current && isVisible) {
      const video = videoRef.current;

      // Set video properties
      video.crossOrigin = 'anonymous';
      video.preload = 'auto';
      video.playsInline = true;
      video.muted = true;
      video.loop = true;
      video.autoplay = true;
      // Start video and create texture
      const startVideo = () => {
        // Try to play the video, but create the texture regardless of play() success
        video.play().catch((error) => {
          console.warn('Video play() failed, proceeding anyway:', error);
        }).finally(() => {
          // Create video texture
          const texture = new THREE.VideoTexture(video);
          texture.minFilter = THREE.LinearFilter;
          texture.magFilter = THREE.LinearFilter;
          texture.format = THREE.RGBAFormat;
          texture.generateMipmaps = false;
          // Correct video orientation if needed
          texture.flipY = true;
          setVideoTexture(texture);
        });
      };

      startVideo();
    }
  }, [isVisible]);

  return (
      <div className="w-full h-full" ref={canvasRef}>
        {/* Hidden video element */}
        <video
            ref={videoRef}
            src="/output.mp4"
            autoPlay
            loop
            muted
            playsInline
            style={{ display: 'none' }}
        />

        {/* 3D Canvas - Only render when visible */}
        {isVisible && (
          <Canvas
              camera={{ position: [0, 0, 0.2], fov: 50 }}
              style={{
                width: '100%',
                height: '100%',
                borderRadius: '8px',
                overflow: 'hidden'
              }}
              gl={{
                antialias: true,
                alpha: true,
                powerPreference: 'high-performance',
                toneMapping: THREE.ACESFilmicToneMapping,
                toneMappingExposure: 1.2,
                preserveDrawingBuffer: false,
                failIfMajorPerformanceCaveat: false
              }}
              shadows
          >
            {/* Bright ambient lighting for overall visibility */}
            <ambientLight intensity={1.0} />
            
            {/* Main directional light with shadows */}
            <directionalLight 
              position={[5, 8, 5]} 
              intensity={1.5}
              castShadow
              shadow-mapSize-width={2048}
              shadow-mapSize-height={2048}
              shadow-camera-far={50}
              shadow-camera-left={-10}
              shadow-camera-right={10}
              shadow-camera-top={10}
              shadow-camera-bottom={-10}
            />
            
            {/* Bright fill light to eliminate dark areas */}
            <directionalLight 
              position={[-3, 3, 2]} 
              intensity={1.0}
              castShadow
            />
            
            {/* Front light for phone visibility */}
            <directionalLight 
              position={[0, 0, 2]} 
              intensity={0.8}
            />
            
            {/* Top light for overall brightness */}
            <directionalLight 
              position={[0, 5, 0]} 
              intensity={0.6}
            />
            
            {/* Additional point lights for phone details */}
            <pointLight position={[2, 0, 0]} intensity={0.4} />
            <pointLight position={[-2, 0, 0]} intensity={0.4} />

            {/* Shadow plane beneath the phone */}
            <mesh 
              rotation={[-Math.PI / 2, 0, 0]} 
              position={[0, -0.2, 0]} 
              receiveShadow
            >
              <planeGeometry args={[2, 2]} />
              <shadowMaterial transparent opacity={0.5} />
            </mesh>

            {videoTexture && (
              <Suspense fallback={<ModelLoader />}>
                <PhoneModel videoTexture={videoTexture} />
              </Suspense>
            )}

            <OrbitControls
                enableZoom={false}
                enablePan={false}
                autoRotate={false}
                maxPolarAngle={Math.PI / 2}
                minPolarAngle={Math.PI / 2}
                maxAzimuthAngle={Math.PI / 2}
                minAzimuthAngle={-Math.PI / 2}
            />
          </Canvas>
        )}
      </div>
  );
}