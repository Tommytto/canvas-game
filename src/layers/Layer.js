export default class Layer {
    constructor({ctx, camera, sizeObserver, eventEmitter}) {
        this.ctx = ctx;
        this.camera = camera;
        this.sizeObserver = sizeObserver;
        this.eventEmitter = eventEmitter;

        this.info = {
            x: 0,
            y: 0,
            w: 0,
            h: 0,
        };

        this.assetsPromise = null;
        this.initAssetsPromise();
        this.init();
        this.bind();
    }

    bind() {}

    draw() {
        throw new Error('Override method');
    }
}
