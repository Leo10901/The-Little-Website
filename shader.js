export const simulationVertexShader = `
    varying vec2 vUv;
    void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`;

export const simulationFragmentShader = `
    varying vec2 vUv;
    uniform sampler2D textureA;
    uniform vec2 mouse;
    uniform vec2 resolution;
    uniform float time;
    uniform int frame;

    void main() {
        vec2 uv = vUv;
        vec4 data = texture2D(textureA, uv);
        float dist = distance(uv * resolution, mouse);
        float strength = 0.5 * exp(-dist * dist / 1000.0);
        
        // Simple wave propagation math
        float shadow = texture2D(textureA, uv + vec2(0.01, 0.0)).r;
        data.r += (strength + (shadow - data.r) * 0.05);
        
        gl_FragColor = data;
    }
`;

export const renderVertexShader = `
    varying vec2 vUv;
    void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`;

export const renderFragmentShader = `
    varying vec2 vUv;
    uniform sampler2D simulationTexture;
    uniform sampler2D textTexture;

    void main() {
        float distortion = texture2D(simulationTexture, vUv).r;
        vec2 distortedUv = vUv + vec2(distortion * 0.05);
        gl_FragColor = texture2D(textTexture, distortedUv);
    }
`;
