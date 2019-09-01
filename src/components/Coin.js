import Component from './Component';
import {EVENTS} from '../constants/events';

export default class Coin extends Component {
    constructor(props) {
        super(props);
        this.active = true;
        this.hero = null;
    }

    init() {
        this.background = new Image();
        this.background.src = 'assets/coin.png';
        this.background.onload = () => {
            this.resolveAssets();
        };
        this.bind();
    }

    getInfo() {
        return this.info;
    }

    setHero(hero) {
        this.hero = hero;
    }

    checkHero() {
        if (this.hero && this.active) {
            const intersectionInfo = this.getIntersectionInfo(this.hero.getInfo());
            if (0 >= intersectionInfo.left && 0 >= intersectionInfo.right && 0 >= intersectionInfo.top && 0 >= intersectionInfo.bottom) {
                this.active = false;
                this.eventEmitter.emit(EVENTS.COIN);
            }
        }
    }

    draw() {
        this.checkHero();
        if (this.active) {
            const {x, y, w, h} = this.getInfo();
            this.ctx.beginPath();
            this.ctx.drawImage(this.background, x, y, w, h);
            this.ctx.closePath();
        }
    }
}
