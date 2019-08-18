export default class Component {
    constructor({ctx, camera, sizeObserver, eventEmitter}) {
        this.ctx = ctx;
        this.camera = camera;
        this.eventEmitter = eventEmitter;
        this.sizeObserver = sizeObserver;
        this.info = {
            x: 0,
            y: 0,
            w: 0,
            h: 0,
        };

        this.initAssetsPromise();
    }

    initAssetsPromise() {
        this.assetsPromise = new Promise((resolve) => {
            this.resolveAssets = resolve;
        });
    }

    init() {
        this.resolveAssets();
        this.bind();
    }

    assetsLoaded() {
        return this.assetsPromise;
    }

    bind() {}

    updateInfo(info) {
        this.info = {
            ...this.info,
            ...info,
        };
    }

    getInfo() {
        const {x, y, w, h} = this.info;
        const [xOffset, yOffset] = this.camera.getOffset();
        return {x: x - xOffset, y: y - yOffset, w, h};
    }

    draw() {
        throw new Error('Override method');
    }
}
