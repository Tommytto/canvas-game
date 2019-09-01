import SizeObserver from './services/SizeObserver';
import EventEmitter from './services/EventEmitter';
import Hero from './components/Hero';
import Camera from './services/Camera';
import MainLayer from './components/MainLayer';
import Ground from './components/Ground';
import Engine from './services/Engine';
import Coin from './components/Coin';
import CoinCounter from './components/CoinCounter';
import ShotCreator from './services/ShotCreator';
import Mob from './components/Mob';

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
        engine,
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
                x: 150,
                y: 600,
                w: 200,
                h: 100,
            },
            ...commonParams,
        }),
        new Ground({
            info: {
                x: 350,
                y: 400,
                w: 200,
                h: 100,
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

    const coins = [
        new Coin({
            info: {
                x: 300,
                y: 100,
                w: 200,
                h: 100,
            },
            ...commonParams,
        }),
        new Coin({
            info: {
                x: 900,
                y: 500,
                w: 50,
                h: 50,
            },
            ...commonParams,
        }),
        new Coin({
            info: {
                x: 1000,
                y: 500,
                w: 50,
                h: 50,
            },
            ...commonParams,
        }),
        new Coin({
            info: {
                x: 1100,
                y: 500,
                w: 50,
                h: 50,
            },
            ...commonParams,
        }),
    ];

    const mobs = [
        new Mob({
            info: {
                x: 1200,
                y: 500,
                w: 200,
                h: 200,
            },
            ...commonParams,
        }),
        new Mob({
            info: {
                x: 1400,
                y: 300,
                w: 200,
                h: 200,
            },
            ...commonParams,
        }),
    ];

    const hero = new Hero({blockingBlocks, ...commonParams});
    const mainLayer = new MainLayer(commonParams);
    const coinCounter = new CoinCounter(commonParams);
    const shotCreator = new ShotCreator({...commonParams, hero});

    [...coins, ...mobs].forEach((coin) => {
        coin.setHero(hero);
    });

    mobs.forEach((mob) => {
        mob.setShotCreator(shotCreator);
    });

    const all = [mainLayer, coinCounter, hero, ...blockingBlocks, ...coins, ...mobs];

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
        [...all, ...shotCreator.getShots()].forEach((item) => item.draw());
        window.requestAnimationFrame(draw);
    }
};
