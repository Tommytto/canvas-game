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

    runJump2() {
        const {dy, speed} = this.verticalMove;
        this.moveUp(speed);
        this.verticalMove.speed -= dy;
        if (0 >= speed) {
            this.up = false;
        }
    }

    runJump() {
        const {dy} = this.verticalMove;

        const {y, ...rest} = this.getInfo();
        const newHeroInfo = {
            ...rest,
            y: y + this.verticalMove.speed,
        };
        let closestBlock;

        for (let i = 0; i < this.blockingBlocks.length; i++) {
            const intersectionInfo = this.blockingBlocks[i].getIntersectionInfo(newHeroInfo);
            const horizontalInside = 0 > intersectionInfo.left && 0 > intersectionInfo.right;
            const isBlockAbove = this.verticalMove.speed <= intersectionInfo.bottom;

            if (horizontalInside && isBlockAbove) {
                if (!closestBlock || intersectionInfo.bottom < closestBlock.bottom) {
                    closestBlock = intersectionInfo;
                }
            }
        }

        const newTop = closestBlock ? Math.min(this.verticalMove.speed, closestBlock.bottom - this.verticalMove.speed) : this.verticalMove.speed;
        if (0 !== newTop || !closestBlock) {
            this.moveUp(newTop);
            this.verticalMove.speed -= dy;
            if (0 >= this.verticalMove.speed) {
                this.up = false;
            }
        } else {
            this.up = false;
            this.verticalMove.speed = 0;
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
            const horizontalInside = 0 > intersectionInfo.left && 0 > intersectionInfo.right;
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

    checkLeft() {
        if (this.left) {
            // this.moveLeft(this.horizontalMove.dx);
            const {x, ...rest} = this.getInfo();
            const newHeroInfo = {
                ...rest,
                x: x - this.horizontalMove.dx,
            };
            let closestBlock;

            for (let i = 0; i < this.blockingBlocks.length; i++) {
                const intersectionInfo = this.blockingBlocks[i].getIntersectionInfo(newHeroInfo);
                const verticalInside = 0 > intersectionInfo.top && 0 > intersectionInfo.bottom;
                const isLeftSide = -this.horizontalMove.dx <= intersectionInfo.right;
                if (verticalInside && isLeftSide) {
                    if (!closestBlock || intersectionInfo.right < closestBlock.right) {
                        closestBlock = intersectionInfo;
                    }
                }
            }

            const newLeft = closestBlock ? Math.min(this.horizontalMove.dx, this.horizontalMove.dx + closestBlock.right) : this.horizontalMove.dx;
            if (0 !== newLeft || !closestBlock) {
                this.moveLeft(newLeft);
            }
        }
    }

    checkRight() {
        if (this.right) {
            const {x, ...rest} = this.getInfo();
            const newHeroInfo = {
                ...rest,
                x: x + this.horizontalMove.dx,
            };
            let closestBlock;

            for (let i = 0; i < this.blockingBlocks.length; i++) {
                const intersectionInfo = this.blockingBlocks[i].getIntersectionInfo(newHeroInfo);
                const verticalInside = 0 > intersectionInfo.top && 0 > intersectionInfo.bottom;
                const isRightSide = -this.horizontalMove.dx <= intersectionInfo.left;
                if (verticalInside && isRightSide) {
                    if (!closestBlock || intersectionInfo.left < closestBlock.left) {
                        closestBlock = intersectionInfo;
                    }
                }
            }
            const newLeft = closestBlock ? Math.min(this.horizontalMove.dx, this.horizontalMove.dx + closestBlock.left) : this.horizontalMove.dx;
            if (0 !== newLeft || !closestBlock) {
                this.moveRight(newLeft);
            }
        }
    }

    getClosestBlocks() {}

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
