import {EVENTS} from '../constants/events';

export default class Engine {
    constructor({eventEmitter}) {
        this.eventEmitter = eventEmitter;
        this.coinCount = 0;
        this.bind();
    }

    bind() {
        this.eventEmitter.on(EVENTS.HERO_DIE, this.handleHeroDie);
        this.eventEmitter.on(EVENTS.HOLE_BOUND, this.handleHeroDie);
        this.eventEmitter.on(EVENTS.COIN, this.handleCoinUp);
        this.eventEmitter.on(EVENTS.MOB_DEATH, this.handleMobDeath);
    }

    handleMobDeath = () => {
        const audio = new Audio('assets/death.mp3');
        audio.play();
    };

    getCoinCount() {
        return this.coinCount;
    }

    handleCoinUp = () => {
        const audio = new Audio('assets/coin.mp3');
        audio.play();
        this.coinCount++;
    };

    handleHeroDie = () => {
        location.reload();
    };
}
