import {EVENTS} from '../constants/events';

export default class Engine {
    constructor({eventEmitter}) {
        this.eventEmitter = eventEmitter;

        this.bind();
    }

    bind() {
        this.eventEmitter.on(EVENTS.HERO_DIE, this.handleHeroDie);
        this.eventEmitter.on(EVENTS.HOLE_BOUND, this.handleHeroDie);
    }

    handleHeroDie = () => {
        location.reload();
    };
}
