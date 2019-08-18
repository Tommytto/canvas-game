import Component from './Component';
import {EVENTS} from '../constants/events';

export default class Hero extends Component {
    constructor({blockingBlocks, ...rest}) {
        super(rest);
        this.blockingBlocks = blockingBlocks;
    }
    init() {
        const [canvasW, canvasH] = this.sizeObserver.getCanvasSize();
        const heroWidth = 100;
        this.info = {
            x: Math.floor((canvasW - heroWidth) / 2),
            y: 500,
            w: heroWidth,
            h: 100,
        };

        this.up = false;
        this.down = false;
        this.left = false;
        this.right = false;

        this.canUp = true;

        this.verticalMove = {
            interval: null,
            counter: 0,
            dy: 3,
            speed: 0,
        };
        this.horizontalMove = {
            interval: null,
            counter: 0,
            dx: 10,
            speed: 0,
        };
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);

        this.bind();
    }

    bind() {
        document.addEventListener('keydown', this.handleKeyDown);
        document.addEventListener('keyup', this.handleKeyUp);
    }

    handleKeyDown(e) {
        switch (e.key) {
            case 'ArrowRight':
                this.right = true;
                break;
            case 'ArrowLeft':
                this.left = true;
                break;
            case 'ArrowUp':
                this.initJump();
                break;
            default:
                break;
        }
    }

    handleKeyUp(e) {
        switch (e.key) {
            case 'ArrowRight':
                this.right = false;
                break;
            case 'ArrowLeft':
                this.left = false;
                break;
            case 'ArrowUp':
                this.canUp = true;
                break;
            default:
                break;
        }
    }

    moveLeft(offset) {
        this.eventEmitter.emit(`${EVENTS.HERO_MOVE}`, {x: offset});
    }

    moveRight(offset) {
        this.eventEmitter.emit(`${EVENTS.HERO_MOVE}`, {x: -offset});
    }

    moveUp(offset) {
        this.eventEmitter.emit(`${EVENTS.HERO_MOVE}`, {y: offset});
    }

    moveDown(offset) {
        this.eventEmitter.emit(`${EVENTS.HERO_MOVE}`, {y: -offset});
    }

    initJump() {
        if (this.canUp && !this.down && !this.up) {
            this.canUp = false;
            this.up = true;
            this.verticalMove.speed = this.verticalMove.dy * 15;
        }
    }

    runJump() {
        const {dy, speed} = this.verticalMove;
        this.moveUp(speed);
        this.verticalMove.speed -= dy;
        if (0 >= speed) {
            this.up = false;
        }
    }

    checkJump() {
        if (this.up) {
            this.runJump();
        }
    }

    runFalling() {}

    checkFalling() {
        if (this.up) {
            return;
        }
        const {y, ...rest} = this.getInfo();
        this.verticalMove.speed += this.verticalMove.dy;
        const newHeroInfo = {
            ...rest,
            y: y + this.verticalMove.speed,
        };
        let closestBlock;

        for (let i = 0; i < this.blockingBlocks.length; i++) {
            const intersectionInfo = this.blockingBlocks[i].getIntersectionInfo(newHeroInfo);
            const horizontalInside = 0 > intersectionInfo.left && 0 < intersectionInfo.right;
            const isBlockUnder = -this.verticalMove.speed <= intersectionInfo.top;

            if (horizontalInside && isBlockUnder) {
                if (!closestBlock || intersectionInfo.top < closestBlock.top) {
                    closestBlock = intersectionInfo;
                }
            }
        }
        const newTop = closestBlock ? Math.min(this.verticalMove.speed, this.verticalMove.speed + closestBlock.top) : this.verticalMove.speed;

        if (0 !== newTop || !closestBlock) {
            this.down = true;
            this.moveDown(newTop);
        } else {
            this.down = false;
            this.verticalMove.speed = 0;
        }
    }

    checkRight() {
        if (this.right) {
            this.moveRight(this.horizontalMove.dx);
        }
    }

    getClosestBlocks() {

    }

    checkLeft() {
        if (this.left) {
            this.moveLeft(this.horizontalMove.dx);
        }
    }

    draw() {
        this.checkJump();
        this.checkFalling();
        this.checkLeft();
        this.checkRight();
        const {x, y, w, h} = this.getInfo();
        this.ctx.beginPath();
        this.ctx.rect(x, y, w, h);
        this.ctx.fillStyle = 'green';
        this.ctx.fill();
        this.ctx.closePath();
    }
}
