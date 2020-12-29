import { App } from './app.js';

const canvas = document.getElementById('canvas');
canvas.height = 630;
canvas.width = 1100;

const ctx = canvas.getContext('2d');
ctx.fillStyle = 'black';

window.app = new App(canvas, 5);
window.app.ramdomize();
window.app.paint = (x, y, size) => ctx.fillRect(x * size, y * size, size, size);

const loop = () =>
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    window.app.draw();
    window.app.step();
    window.requestAnimationFrame(loop);
}
window.requestAnimationFrame(loop);
