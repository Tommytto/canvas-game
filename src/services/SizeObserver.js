export default class SizeObserver {
    constructor({ctx}) {
        this.ctx = ctx;

        this.init();
        this.bind();
    }

    init() {
        this.updateSizes();
    }

    bind() {
        window.addEventListener('resize', this.handleWindowResize);
    }

    updateSizes = () => {
        this.ctx.canvas.width = window.innerWidth;
        this.ctx.canvas.height = window.innerHeight;
    };

    handleWindowResize = () => {
        this.updateSizes();
    };

    getCanvasSize() {
        return [this.ctx.canvas.width, this.ctx.canvas.height];
    }
}
