import Component from './Component';

export default class MainLayer extends Component {
    init() {
        const [canvasWidth, canvasHeight] = this.sizeObserver.getCanvasSize();
        this.background = new Image();
        this.background.src = 'assets/back-pattern-2.jpg';
        this.background.onload = () => {
            this.resolveAssets();
        };
        this.info = {
            x: 0,
            y: 0,
            w: 5 * canvasWidth,
            h: canvasHeight,
        };

        this.bind();
    }

    getInfo() {
        const {left, top, right, bottom} = this.camera.getBounds();
        return {
            x: left,
            y: top,
            w: right - left,
            h: bottom - top,
        };
    }

    draw() {
        const {x, y, w, h} = this.getInfo();
        this.ctx.beginPath();
        this.ctx.fillStyle = this.ctx.createPattern(this.background, 'repeat');
        this.ctx.fillRect(x, y, w, h);
        this.ctx.closePath();
    }
}
