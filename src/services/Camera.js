import {EVENTS} from '../constants/events';

export default class Camera {
    constructor({eventEmitter, ctx}) {
        this.eventEmitter = eventEmitter;
        this.ctx = ctx;
        this.viewOffset = {
            x: 0,
            y: 0,
        };

        this.bounds = {
            left: -2000,
            top: -2000,
            bottom: 2000,
            right: 6000,
        };

        this.bind();
    }

    updateOffset({x = 0, y = 0}) {
        this.viewOffset.x += Number(x);
        this.viewOffset.y += Number(y);

        if (this.viewOffset.y < -this.bounds.bottom) {
            this.eventEmitter.emit(EVENTS.HOLE_BOUND);
        }
    }

    getBounds() {
        return this.bounds;
    }

    bind() {
        this.eventEmitter.on(`${EVENTS.HERO_MOVE}`, ({x = 0, y = 0} = {}) => {
            this.updateOffset({x, y});
            this.ctx.translate(x, y);
        });
    }

    getOffset() {
        return [this.viewOffset.x, this.viewOffset.y];
    }
}
