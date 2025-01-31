"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useCallback } from "react";
import { Vector2, Color, Mesh, ShaderMaterial, PlaneGeometry } from "three";

const vertexShader = `
varying vec2 vUv;

void main() {
  vUv = uv;

  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;
}
`;

const fragmentShader = `
uniform float u_time;
uniform vec3 u_bg;
uniform vec3 u_colorA;
uniform vec3 u_colorB;
uniform vec2 u_mouse;

varying vec2 vUv;

//
// Description : Array and textureless GLSL 2D simplex noise function.
//      Author : Ian McEwan, Ashima Arts.
//  Maintainer : ijm
//     Lastmod : 20110822 (ijm)
//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.
//               Distributed under the MIT License. See LICENSE file.
//               https://github.com/ashima/webgl-noise
//

// https://github.com/hughsk/glsl-noise/blob/master/simplex/2d.glsl

vec3 mod289(vec3 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec2 mod289(vec2 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec3 permute(vec3 x) {
  return mod289(((x*34.0)+1.0)*x);
}

float snoise(vec2 v)
  {
  const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0
                      0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)
                     -0.577350269189626,  // -1.0 + 2.0 * C.x
                      0.024390243902439); // 1.0 / 41.0
// First corner
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);

// Other corners
  vec2 i1;
  //i1.x = step( x0.y, x0.x ); // x0.x > x0.y ? 1.0 : 0.0
  //i1.y = 1.0 - i1.x;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  // x0 = x0 - 0.0 + 0.0 * C.xx ;
  // x1 = x0 - i1 + 1.0 * C.xx ;
  // x2 = x0 - 1.0 + 2.0 * C.xx ;
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;

// Permutations
  i = mod289(i); // Avoid truncation effects in permutation
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
    + i.x + vec3(0.0, i1.x, 1.0 ));

  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m ;
  m = m*m ;

// Gradients: 41 points uniformly over a line, mapped onto a diamond.
// The ring size 17*17 = 289 is close to a multiple of 41 (41*7 = 287)

  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;

// Normalise gradients implicitly by scaling m
// Approximation of: m *= inversesqrt( a0*a0 + h*h );
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );

// Compute final noise value at P
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}
// End of Simplex Noise Code


void main() {
  vec3 color = u_bg;

  // float noise1 = snoise(vUv + u_time * (sin(u_mouse.x * 0.001) + 0.2));
  // float noise2 = snoise(vUv + u_time * (sin(u_mouse.y * 0.001) + 0.2));
  float noise1 = snoise(vUv + u_time * 0.2 + u_mouse * 0.005);
float noise2 = snoise(vUv + u_time * 0.3 - u_mouse * 0.005);


  color = mix(color, u_colorA, noise1);
  color = mix(color, u_colorB, noise2);
  
  gl_FragColor = vec4(color ,1.0);
}
`;
const Gradient = () => {
  const mesh = useRef<Mesh<PlaneGeometry, ShaderMaterial>>(null);
  const mousePosition = useRef<Vector2>(new Vector2(0, 0));
  const smoothedMouse = useRef<Vector2>(new Vector2(0, 0)) // Add smoothed reference


  const updateMousePosition = useCallback((e: MouseEvent) => {
    mousePosition.current.set(e.clientX, e.clientY)
}, [])

  const uniforms = useMemo(
    () => ({
      u_time: { value: 0.0 },
      u_mouse: { value: new Vector2(0, 0) },
      u_bg: { value: new Color("#F8F9FA") },      
      u_colorA: { value: new Color("#D98299") },   
      u_colorB: { value: new Color("#FDFDFD") }
    }),
    [],
  );

  useEffect(() => {
    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, [updateMousePosition]);

  // 4. Type-safe frame loop
  // useFrame((state) => {
  //   if (!mesh.current) return;

  //   const material = mesh.current.material;
  //   material.uniforms.u_time.value = state.clock.getElapsedTime();
  //   material.uniforms.u_mouse.value.copy(mousePosition.current);
  // });

  useFrame((state) => {
    if (!mesh.current) return
    
    // Add damping calculation
    smoothedMouse.current.lerp(
        new Vector2(
            (mousePosition.current.x / window.innerWidth) * 1.5 - 0.75,
            -(mousePosition.current.y / window.innerHeight) * 1 + 0.5
        ),
        0.01 // Damping factor (0.1 = fast follow, 0.01 = slow follow)
    )

    const material = mesh.current.material
    material.uniforms.u_time.value = state.clock.getElapsedTime()
    material.uniforms.u_mouse.value.copy(smoothedMouse.current) // Use smoothed mouse
})

  return (
    // <mesh ref={mesh} position={[0, 0, 0]} scale={[3, 2, 1]}>
    <mesh ref={mesh} position={[0, 0, 0]} scale={[3, 2, 1]}>
      <planeGeometry args={[1, 1, 32, 32]} />
      <shaderMaterial
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        uniforms={uniforms}
        wireframe={false}
      />
    </mesh>
  );
};

const Scene = () => {
  return (
    // <Canvas
    //   camera={{ position: [0.0, 0.0, 1.5] }}
    //   className=" fixed top-0 left-0 h-full w-full"
    // >
    //   <Gradient />
    // </Canvas>
    <Canvas
      orthographic
      camera={{
        left: -1.5,
        right: 1.5,
        top: 1,
        bottom: -1,
        near: 0.1,
        far: 1000,
        position: [0, 0, 1],
      }}
      className="fixed top-0 left-0 h-screen w-screen"
    >
      <Gradient />
    </Canvas>
  );
};
export default Scene;
