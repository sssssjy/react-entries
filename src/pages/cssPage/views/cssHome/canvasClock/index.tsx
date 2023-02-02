import {useEffect} from "react";

class RotateSemicircle {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    size: number;
    deg: number;
    constructor() {
        this.canvas = document.getElementById('canvas') as HTMLCanvasElement;
        this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
        this.size = 400;
        this.canvas.width = this.size;
        this.canvas.height = this.size;
        this.deg = 0;

        this.draw();
    }

    draw() {
        this.ctx.fillStyle = `rgba(0,0,0,0.1)`;
        this.ctx.fillRect(0, 0, this.size, this.size);
        for (let i = 0; i < 8; i ++) {
            this.ctx.beginPath();
            const x = this.size / 4 * Math.cos(i / 4 * Math.PI + this.deg / 5) + this.size / 2;
            const y = this.size / 4 * Math.sin(i / 4 * Math.PI + this.deg / 5) + this.size / 2;
            this.ctx.arc(x, y, this.size / 4, this.deg + i / 4 * Math.PI, Math.PI + this.deg + i / 4 * Math.PI, false);
            this.ctx.strokeStyle = `hsl(${this.deg * 50}deg, 80%, 50%)`;
            this.ctx.lineWidth = 2;
            this.ctx.stroke();
        }

        this.deg += 0.04;
        this.deg = this.deg % 360;
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        this.draw();
    }
}

class ClockCanvas {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    size: number;
    clock: HTMLDivElement;
    constructor() {
        this.canvas = document.getElementById('canvas') as HTMLCanvasElement;
        this.clock = document.getElementById('clock') as HTMLDivElement;
        this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
        this.size = 400;
        this.canvas.width = this.size;
        this.canvas.height = this.size;
    }

    draw() {
        this.ctx.clearRect(0, 0 , this.size, this.size);
        const date = new Date();

        //每秒 360 / 60 = 6 deg
        //每毫秒 360 / 60 * 1000 = 6 / 1000 deg
        //每小时 360 / 12 = 30deg
        const secDeg = date.getSeconds() * 6 + date.getMilliseconds() * 6 / 1000;
        const minDeg = date.getMinutes() * 6 + secDeg / 60;
        //12小时制 取余
        const hourDeg = date.getHours() % 12 * 30 + minDeg / 60;

        const lines = [hourDeg, minDeg, secDeg];
        this.ctx.lineWidth = 10;
        //末端圆形
        this.ctx.lineCap = 'round';

        for (let i = 0; i < 3; i++) {
            //表盘底色
            this.ctx.beginPath();
            this.ctx.arc(this.size / 2, this.size / 2, 140 + i * 20, 0, Math.PI * 2, false);
            this.ctx.strokeStyle = `hsl(210deg, 30%, 10%)`;
            this.ctx.stroke();

            //表盘
            this.ctx.beginPath();
            this.ctx.arc(this.size / 2, this.size / 2, 140 + i * 20, -Math.PI / 2, lines[i] / 180 * Math.PI - Math.PI / 2);
            this.ctx.strokeStyle = `hsl(${i * 120}deg, 45%, 60%)`;
            this.ctx.stroke();
        }

        //刻度
        for (let i = 0; i < 12; i++) {
            const bx = 200 + 180 * Math.cos(i * 30 * Math.PI / 180);
            const by = 200 + 180 * Math.sin(i * 30 * Math.PI / 180);
            this.ctx.fillStyle = '#6fd08c';
            this.ctx.beginPath();
            this.ctx.arc(bx, by, 3, 0, Math.PI * 2);
            this.ctx.fill();
        }

        const x = Math.cos((secDeg + 90) * Math.PI / 180);
        const y = Math.sin((secDeg + 90) * Math.PI / 180);
        this.clock.style.textShadow = `${x}px ${y}px 5px hsl(${minDeg | 0}, 50%, 70%)`;
        this.clock.style.color = `hsl(${secDeg | 0}, 50%, 80%)`;
        this.clock.innerText = `${('0' + date.getHours()).slice(-2)}:${('0' + date.getMinutes()).slice(-2)}:${('0' + date.getSeconds()).slice(-2)}`;
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        this.draw();
    }
}

class Sphere {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    radius: number;
    particles: Particle[];
    constructor() {
        this.canvas = document.getElementById('canvas') as HTMLCanvasElement;
        this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
        // eslint-disable-next-line no-restricted-globals
        this.canvas.width = innerWidth;
        // eslint-disable-next-line no-restricted-globals
        this.canvas.height = innerHeight;
        this.radius = 200;
        this.particles = [];

    }
}

class Particle {
    x: number;
    y: number;
    r: number;
    d: number;
    op: number;
    vx: number;
    vy: number;
    ctx: CanvasRenderingContext2D;

    /**
     * @param d 椭圆角度
     * @param x 圆心
     * @param y 圆心
     * @param r 半径
     * @param canvas
     * @param ctx
     */
    constructor(d: number, x: number, y: number, r: number, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.r = r;
        this.d = d;
        this.op = 1;

        //椭圆圆心 坐标
        this.ctx = ctx;
        this.vx = x;
        this.vy = y;
    }
}

export default () => {

    useEffect(() => {
        // const ani = new RotateSemicircle();
        // ani.animate();

        // const clock = new ClockCanvas();
        // clock.animate();
    }, [])

    return <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative'}}>
        <canvas id="canvas" />
        <div id="clock" style={{fontSize: '60px', position: 'absolute'}} />
    </div>
}
