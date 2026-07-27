"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/** Glints usam a mesma família, mas um tom por partícula (não um mix de
 *  dois) — cada faísca "escolhe" uma cor ao nascer. */
// const GLINT_COLORS = [
//   "#B7C696", // sálvia pastel
//   "#8CB6AF", // verde-azulado pastel
//   "#E9D6AE", // champanhe claro
//   "#D3A06D", // ouro suave
//   "#A57C5C", // marrom quente claro
//   "#D0936F", // terracota clara
//   "#CC8A93", // vinho rosado
// ] as const;
const GLINT_COLORS = [
  "#FFFDF2", // quase branco quente
  "#FFF9E6", // creme muito claro
  "#FFF3CC", // amarelo manteiga
  "#FFEDB3", // baunilha
  "#FFE79A", // amarelo suave
  "#FFE180", // dourado claro
  "#FFDB66", // amarelo mel claro
] as const;

const GLINT_COUNT = 120;

/** Distância da câmera e FOV fixos → altura visível constante (~8.3 un.). */
const CAMERA_Z = 10;
const CAMERA_FOV = 45;

const GLINT_VERTEX = /* glsl */ `
  attribute float aPhase;
  attribute float aSpeed;
  attribute vec3 aColor;
  attribute float aSize;
  uniform float uTime;
  uniform float uPixelRatio;
  varying float vAlpha;
  varying vec3 vColor;

  void main() {
    vec3 p = position;

    // Sobe devagar a partir da base e recomeça (posições normalizadas;
    // o objeto é escalado para o tamanho do viewport).
    float progress = fract(aPhase + uTime * aSpeed);
    p.y += progress * 0.34;
    p.x += sin(uTime * (0.4 + aPhase) + aPhase * 6.2831) * 0.015;

    vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    // Tudo vive no mesmo plano de profundidade: aSize já é o tamanho em px.
    gl_PointSize = aSize * uPixelRatio;

    // Cintilação: seno elevado ao cubo deixa o pico curto, como um lampejo.
    float twinkle = 0.5 + 0.5 * sin(uTime * (1.2 + 2.5 * aPhase) + aPhase * 40.0);
    twinkle = twinkle * twinkle * twinkle;
    float fade = smoothstep(0.0, 0.15, progress) * (1.0 - smoothstep(0.5, 1.0, progress));
    vAlpha = twinkle * fade;
    vColor = aColor;
  }
`;

const GLINT_FRAGMENT = /* glsl */ `
  varying float vAlpha;
  varying vec3 vColor;

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float dist = length(uv);

    // Núcleo pequeno e nítido — o "corpo" aceso da faísca.
    float core = smoothstep(0.22, 0.02, dist);

    // Clarão em cruz nos eixos do ponto — glint de estrela de quatro pontas.
    float star =
      max(0.0, 1.0 - abs(uv.x * uv.y) * 140.0) * smoothstep(0.3, 0.0, dist);

    // Glow — halo amplo e suave que se estende além do núcleo, como luz
    // difusa ao redor da faísca (não apenas um ponto nítido).
    float glow = pow(smoothstep(0.5, 0.0, dist), 1.05);

    float alpha = clamp(core + star * 0.75 + glow * 0.85, 0.0, 1.0) * vAlpha;
    if (alpha < 0.01) discard;

    // O núcleo clareia quase a branco; o halo também recebe um toque de
    // brilho para não ler como uma mancha plana da cor da faísca.
    vec3 color = mix(vColor, vec3(1.0), core * 0.6 + glow * 0.25);
    gl_FragColor = vec4(color, alpha);
  }
`;

interface MoteState {
  mesh: THREE.Mesh;
  radius: number;
  baseX: number;
  speed: number;
  swayAmp: number;
  swayFreq: number;
  phase: number;
}

export function HeroMotes() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    } catch {
      return;
    }
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(CAMERA_FOV, 1, 0.1, 50);
    camera.position.z = CAMERA_Z;

    const visibleHeight =
      2 * Math.tan(THREE.MathUtils.degToRad(CAMERA_FOV / 2)) * CAMERA_Z;
    let visibleWidth = visibleHeight;

    // --- Motas de resina --------------------------------------------------
    const moteGeometry = new THREE.SphereGeometry(1, 40, 28);
    const motes: MoteState[] = [];

    // for (let i = 0; i < MOTE_COUNT; i++) {
    //   const material = new THREE.ShaderMaterial({
    //     vertexShader: MOTE_VERTEX,
    //     fragmentShader: MOTE_FRAGMENT,
    //     uniforms: {
    //       uColor: {
    //         value: new THREE.Color(
    //           MOTE_COLORS[Math.floor(Math.random() * MOTE_COLORS.length)],
    //         ),
    //       },
    //       uOpacity: { value: 0.55 + Math.random() * 0.4 },
    //     },
    //     transparent: true,
    //     depthWrite: false,
    //   });
    //   const mesh = new THREE.Mesh(moteGeometry, material);
    //   // Menores → leem como poeira acesa, não como bokeh escuro sobre a madeira.
    //   const radius = 0.09 + Math.random() ** 2 * 0.32;
    //   mesh.scale.setScalar(radius);
    //   scene.add(mesh);
    //   motes.push({
    //     mesh,
    //     radius,
    //     baseX: Math.random() * 2 - 1, // fração da meia-largura, definida no resize
    //     speed: 0.1 + Math.random() * 0.2,
    //     swayAmp: 0.1 + Math.random() * 0.3,
    //     swayFreq: 0.3 + Math.random() * 0.5,
    //     phase: Math.random() * Math.PI * 2,
    //   });
    //   // Espalha as motas pela altura toda para a cena já nascer povoada.
    //   mesh.position.y = -visibleHeight / 2 + Math.random() * visibleHeight;
    // }

    // --- Faíscas (glints) -------------------------------------------------
    // Posições normalizadas em [-0.5, 0.5]; o objeto é escalado ao viewport.
    const glintGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(GLINT_COUNT * 3);
    const phases = new Float32Array(GLINT_COUNT);
    const speeds = new Float32Array(GLINT_COUNT);
    const colors = new Float32Array(GLINT_COUNT * 3);
    const sizes = new Float32Array(GLINT_COUNT);
    const glintPalette = GLINT_COLORS.map((hex) => new THREE.Color(hex));
    for (let i = 0; i < GLINT_COUNT; i++) {
      positions[i * 3] = Math.random() - 0.5;
      positions[i * 3 + 1] = -0.5 + Math.random() * 0.35; // sobe da base
      positions[i * 3 + 2] = 0;
      phases[i] = Math.random();
      speeds[i] = 0.02 + Math.random() * 0.05;
      const color =
        glintPalette[Math.floor(Math.random() * glintPalette.length)]!;
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
      sizes[i] = 6 + Math.random() * 16;
    }
    glintGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3),
    );
    glintGeometry.setAttribute("aPhase", new THREE.BufferAttribute(phases, 1));
    glintGeometry.setAttribute("aSpeed", new THREE.BufferAttribute(speeds, 1));
    glintGeometry.setAttribute("aColor", new THREE.BufferAttribute(colors, 3));
    glintGeometry.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));

    const glintTime = { value: 0 };
    const glintMaterial = new THREE.ShaderMaterial({
      vertexShader: GLINT_VERTEX,
      fragmentShader: GLINT_FRAGMENT,
      uniforms: {
        uTime: glintTime,
        uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
      },
      transparent: true,
      depthWrite: false,
    });
    const glints = new THREE.Points(glintGeometry, glintMaterial);
    glints.scale.set(visibleWidth, visibleHeight, 1);
    scene.add(glints);

    // --- Loop -------------------------------------------------------------
    const clock = new THREE.Clock();
    let elapsed = 0;

    const renderFrame = (delta: number) => {
      elapsed += delta;
      const halfW = visibleWidth / 2;
      const halfH = visibleHeight / 2;

      for (const mote of motes) {
        const { mesh, radius, speed, swayAmp, swayFreq, phase } = mote;
        mesh.position.y += speed * delta;
        if (mesh.position.y > halfH + radius) {
          mesh.position.y = -halfH - radius;
          mote.baseX = Math.random() * 2 - 1;
        }
        mesh.position.x =
          mote.baseX * (halfW - radius - swayAmp) +
          Math.sin(elapsed * swayFreq + phase) * swayAmp;
        // Respiração sutil no tamanho, como a poeira girando ao subir.
        mesh.scale.setScalar(
          radius * (1 + 0.04 * Math.sin(elapsed * 2 + phase)),
        );
      }

      glintTime.value = elapsed;
      renderer.render(scene, camera);
    };

    const resize = () => {
      const { clientWidth: width, clientHeight: height } = container;
      if (width === 0 || height === 0) return;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      visibleWidth = visibleHeight * camera.aspect;
      glints.scale.set(visibleWidth, visibleHeight, 1);
      renderFrame(0);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    resize();

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let frameId = 0;
    if (!reducedMotion) {
      const animate = () => {
        renderFrame(Math.min(clock.getDelta(), 0.1));
        frameId = requestAnimationFrame(animate);
      };
      frameId = requestAnimationFrame(animate);
    }

    // Evita o "pop" do canvas: entra com fade depois do primeiro frame.
    renderer.domElement.style.opacity = "0";
    renderer.domElement.style.transition = "opacity 1.2s ease";
    requestAnimationFrame(() => {
      renderer.domElement.style.opacity = "1";
    });

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      moteGeometry.dispose();
      for (const mote of motes) {
        (mote.mesh.material as THREE.Material).dispose();
      }
      glintGeometry.dispose();
      glintMaterial.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 [&>canvas]:h-full [&>canvas]:w-full"
    />
  );
}
