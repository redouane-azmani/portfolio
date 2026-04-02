import { vertexShaderSource, fragmentShaderSource } from './shaders.js';

class WebGLProjects {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'webgl-canvas';
        document.querySelector('.hero').appendChild(this.canvas);

        this.gl = this.canvas.getContext('webgl');
        this.program = null;
        this.uniforms = {};
        this.mousePos = { x: 0, y: 0 };
        this.time = 0;

        this.init();
    }

    init() {
        this.setupCanvas();
        this.createShaderProgram();
        this.setupGeometry();
        this.setupUniforms();
        this.setupEventListeners();
        this.animate();
    }

    setupCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    }

    createShaderProgram() {
        const vertexShader = this.createShader(this.gl.VERTEX_SHADER, vertexShaderSource);
        const fragmentShader = this.createShader(this.gl.FRAGMENT_SHADER, fragmentShaderSource);

        this.program = this.gl.createProgram();
        this.gl.attachShader(this.program, vertexShader);
        this.gl.attachShader(this.program, fragmentShader);
        this.gl.linkProgram(this.program);
        this.gl.useProgram(this.program);
    }

    createShader(type, source) {
        const shader = this.gl.createShader(type);
        this.gl.shaderSource(shader, source);
        this.gl.compileShader(shader);

        if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
            console.error('Erreur de compilation du shader:', this.gl.getShaderInfoLog(shader));
            this.gl.deleteShader(shader);
            return null;
        }

        return shader;
    }

    setupGeometry() {
        const positions = new Float32Array([
            -1.0, -1.0,
            1.0, -1.0,
            -1.0,  1.0,
            1.0,  1.0
        ]);

        const buffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, positions, this.gl.STATIC_DRAW);

        const positionLocation = this.gl.getAttribLocation(this.program, 'position');
        this.gl.enableVertexAttribArray(positionLocation);
        this.gl.vertexAttribPointer(positionLocation, 2, this.gl.FLOAT, false, 0, 0);
    }

    setupUniforms() {
        this.uniforms = {
            resolution: this.gl.getUniformLocation(this.program, 'u_resolution'),
            time: this.gl.getUniformLocation(this.program, 'u_time'),
            mouse: this.gl.getUniformLocation(this.program, 'u_mouse')
        };

        this.gl.uniform2f(this.uniforms.resolution, this.canvas.width, this.canvas.height);
    }

    setupEventListeners() {
        window.addEventListener('resize', () => {
            this.setupCanvas();
            this.gl.uniform2f(this.uniforms.resolution, this.canvas.width, this.canvas.height);
        });

        document.addEventListener('mousemove', (e) => {
            this.mousePos.x = e.clientX / this.canvas.width;
            this.mousePos.y = 1.0 - (e.clientY / this.canvas.height);
        });
    }

    animate() {
        this.time += 0.01;

        this.gl.uniform1f(this.uniforms.time, this.time);
        this.gl.uniform2f(this.uniforms.mouse, this.mousePos.x, this.mousePos.y);

        this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);
        requestAnimationFrame(() => this.animate());
    }

    addDistortionEffect(intensity) {
        this.gl.uniform1f(
            this.gl.getUniformLocation(this.program, 'u_distortion'),
            intensity
        );
    }
}

export default WebGLProjects;