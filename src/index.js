import SizeObserver from './services/SizeObserver';
import EventEmitter from './services/EventEmitter';
import Hero from './components/Hero';
import Camera from './services/Camera';
import MainLayer from './components/MainLayer';
import Ground from './components/Ground';
import Engine from './services/Engine';

window.onload = function() {
    const canvas = document.querySelector('#canvas');
    const ctx = canvas.getContext('2d');

    // Utils
    const sizeObserver = new SizeObserver({ctx});
    const eventEmitter = new EventEmitter();
    const camera = new Camera({ctx, eventEmitter});
    const engine = new Engine({eventEmitter});
    const commonParams = {
        ctx,
        eventEmitter,
        camera,
        sizeObserver,
    };

    // Components
    const blockingBlocks = [
        new Ground({
            info: {
                x: 350,
                y: 700,
                w: 1000,
                h: 200,
            },
            ...commonParams,
        }),
        new Ground({
            info: {
                x: 650,
                y: 800,
                w: 1000,
                h: 200,
            },
            ...commonParams,
        }),
        new Ground({
            info: {
                x: 350,
                y: 700,
                w: 1000,
                h: 200,
            },
            ...commonParams,
        }),
        new Ground({
            info: {
                x: 1350,
                y: 600,
                w: 200,
                h: 100,
            },
            ...commonParams,
        }),
        new Ground({
            info: {
                x: 1650,
                y: 400,
                w: 200,
                h: 100,
            },
            ...commonParams,
        }),
        new Ground({
            info: {
                x: 1950,
                y: 100,
                w: 200,
                h: 100,
            },
            ...commonParams,
        }),
    ];

    const hero = new Hero({blockingBlocks, ...commonParams});
    const mainLayer = new MainLayer(commonParams);

    const all = [mainLayer, hero, ...blockingBlocks];

    all.forEach((component) => {
        component.init();
    });

    Promise.all([mainLayer.assetsLoaded()]).then(() => {
        draw();
    });

    function draw() {
        const [canvasWidth, canvasHeight] = sizeObserver.getCanvasSize();
        const [xOffset, yOffset] = camera.getOffset();
        ctx.clearRect(-xOffset, -yOffset, canvasWidth, canvasHeight);
        all.forEach((item) => item.draw());
        window.requestAnimationFrame(draw);
    }
};
