'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const isMobile = window.innerWidth < 640;

    // Scene setup
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 210;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
    } catch {
      return;
    }

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Particle nodes count & distance for crisp constellation web
    const nodeCount = isMobile ? 55 : 120;
    const maxDistance = isMobile ? 65 : 80;

    const positions = new Float32Array(nodeCount * 3);
    const velocities: THREE.Vector3[] = [];
    const colors = new Float32Array(nodeCount * 3);

    const cyanColor = new THREE.Color('#3df5ff');
    const limeColor = new THREE.Color('#c8ff3d');
    const softWhite = new THREE.Color('#ecebe6');

    const spreadX = isMobile ? 240 : 360;
    const spreadY = isMobile ? 220 : 250;
    const spreadZ = 130;

    for (let i = 0; i < nodeCount; i++) {
      const x = (Math.random() - 0.5) * spreadX;
      const y = (Math.random() - 0.5) * spreadY;
      const z = (Math.random() - 0.5) * spreadZ;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      velocities.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 0.18,
          (Math.random() - 0.5) * 0.18,
          (Math.random() - 0.5) * 0.18
        )
      );

      // Subtle, elegant colors tuned for low eye-strain & high text legibility
      const rand = Math.random();
      const nodeColor = rand > 0.4 ? cyanColor : rand > 0.15 ? softWhite : limeColor;
      colors[i * 3] = nodeColor.r;
      colors[i * 3 + 1] = nodeColor.g;
      colors[i * 3 + 2] = nodeColor.b;
    }

    const nodeGeometry = new THREE.BufferGeometry();
    nodeGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    nodeGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Refined, softer radial glow texture that doesn't overpower text
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      gradient.addColorStop(0, 'rgba(255,255,255,0.9)');
      gradient.addColorStop(0.25, 'rgba(61,245,255,0.65)');
      gradient.addColorStop(0.65, 'rgba(61,245,255,0.18)');
      gradient.addColorStop(1, 'rgba(61,245,255,0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 64, 64);
    }
    const particleTexture = new THREE.CanvasTexture(canvas);

    // Smaller, refined particle size for elegant readability
    const nodeMaterial = new THREE.PointsMaterial({
      size: isMobile ? 3.6 : 4.6,
      map: particleTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
      depthWrite: false,
      opacity: 0.7,
    });

    const pointCloud = new THREE.Points(nodeGeometry, nodeMaterial);
    scene.add(pointCloud);

    // Subtle connecting lines with tuned opacity
    const linePositions = new Float32Array(nodeCount * nodeCount * 6);
    const lineColors = new Float32Array(nodeCount * nodeCount * 6);
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    lineGeometry.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));

    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);

    // Interactive mouse & scroll
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;
    let scrollY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 50;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * -50;
    };

    const handleScroll = () => {
      scrollY = window.scrollY;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };
    window.addEventListener('resize', handleResize);

    // Animation loop
    let animId: number;

    const animate = () => {
      animId = requestAnimationFrame(animate);

      currentMouseX += (targetMouseX - currentMouseX) * 0.05;
      currentMouseY += (targetMouseY - currentMouseY) * 0.05;

      // Rotate group smoothly
      scene.rotation.y = currentMouseX * 0.008 + scrollY * 0.00025;
      scene.rotation.x = currentMouseY * 0.008 + scrollY * 0.00015;

      // Update positions
      const posAttr = nodeGeometry.attributes.position as THREE.BufferAttribute;
      const posArray = posAttr.array as Float32Array;

      for (let i = 0; i < nodeCount; i++) {
        const idx = i * 3;
        posArray[idx] += velocities[i].x;
        posArray[idx + 1] += velocities[i].y;
        posArray[idx + 2] += velocities[i].z;

        // Boundary bounce
        if (posArray[idx] < -spreadX / 2 || posArray[idx] > spreadX / 2) velocities[i].x *= -1;
        if (posArray[idx + 1] < -spreadY / 2 || posArray[idx + 1] > spreadY / 2) velocities[i].y *= -1;
        if (posArray[idx + 2] < -spreadZ / 2 || posArray[idx + 2] > spreadZ / 2) velocities[i].z *= -1;
      }
      posAttr.needsUpdate = true;

      // Update lines with softer alpha
      let lineIndex = 0;
      let colorIndex = 0;
      const linePos = lineGeometry.attributes.position as THREE.BufferAttribute;
      const linePosArray = linePos.array as Float32Array;
      const lineColor = lineGeometry.attributes.color as THREE.BufferAttribute;
      const lineColorArray = lineColor.array as Float32Array;

      for (let i = 0; i < nodeCount; i++) {
        for (let j = i + 1; j < nodeCount; j++) {
          const dx = posArray[i * 3] - posArray[j * 3];
          const dy = posArray[i * 3 + 1] - posArray[j * 3 + 1];
          const dz = posArray[i * 3 + 2] - posArray[j * 3 + 2];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < maxDistance) {
            // Softer line alpha to keep text clear and comfortable to read
            const alpha = (1 - dist / maxDistance) * 0.42;

            linePosArray[lineIndex++] = posArray[i * 3];
            linePosArray[lineIndex++] = posArray[i * 3 + 1];
            linePosArray[lineIndex++] = posArray[i * 3 + 2];

            linePosArray[lineIndex++] = posArray[j * 3];
            linePosArray[lineIndex++] = posArray[j * 3 + 1];
            linePosArray[lineIndex++] = posArray[j * 3 + 2];

            // Neon cyan line coloring
            lineColorArray[colorIndex++] = 0.24 * alpha;
            lineColorArray[colorIndex++] = 0.96 * alpha;
            lineColorArray[colorIndex++] = 1.0 * alpha;

            lineColorArray[colorIndex++] = 0.24 * alpha;
            lineColorArray[colorIndex++] = 0.96 * alpha;
            lineColorArray[colorIndex++] = 1.0 * alpha;
          }
        }
      }

      lineGeometry.setDrawRange(0, lineIndex / 3);
      linePos.needsUpdate = true;
      lineColor.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      nodeGeometry.dispose();
      nodeMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      particleTexture.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden opacity-75 transition-opacity duration-700"
      aria-hidden="true"
    />
  );
}
