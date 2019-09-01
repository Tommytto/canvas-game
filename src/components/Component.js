export default class Component {
    constructor({ctx, engine, camera, sizeObserver, eventEmitter, info}) {
        this.ctx = ctx;
        this.camera = camera;
        this.engine = engine;
        this.eventEmitter = eventEmitter;
        this.sizeObserver = sizeObserver;
        this.info = info || {
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

    getIntersectionInfo(info) {
        const {x, y, w, h} = this.getInfo();

        const itemBottom = info.y + info.h;
        const itemRight = info.x + info.w;
        const itemLeft = info.x;
        const itemTop = info.y;

        return {
            top: y - itemBottom,
            left: x - itemRight,
            bottom: itemTop - (y + h),
            right: itemLeft - (x + w),
        };
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
