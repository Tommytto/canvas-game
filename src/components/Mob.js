import Component from './Component';
import {EVENTS} from '../constants/events';

export default class Mob extends Component {
    constructor(props) {
        super(props);
        this.active = true;
        this.hero = null;
        this.shotCreator = null;
    }

    init() {
        this.background = new Image();
        this.background.src = 'assets/mob.png';
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

    setShotCreator(shotCreator) {
        this.shotCreator = shotCreator;
    }

    checkHero() {
        if (this.hero && this.active) {
            const intersectionInfo = this.getIntersectionInfo(this.hero.getInfo());
            if (0 >= intersectionInfo.left && 0 >= intersectionInfo.right && 0 >= intersectionInfo.top && 0 >= intersectionInfo.bottom) {
                this.active = false;
                // this.eventEmitter.emit(EVENTS.COIN);
            }
        }
    }

    checkShot() {
        if (this.shotCreator && this.active) {
            this.shotCreator.getShots().forEach((shot) => {
                const intersectionInfo = this.getIntersectionInfo(shot.getInfo());
                if (0 >= intersectionInfo.left && 0 >= intersectionInfo.right && 0 >= intersectionInfo.top && 0 >= intersectionInfo.bottom) {
                    this.active = false;
                    this.eventEmitter.emit(EVENTS.MOB_DEATH);
                }
            });
        }
    }

    draw() {
        // this.checkHero();
        this.checkShot();
        if (this.active) {
            const {x, y, w, h} = this.getInfo();
            this.ctx.beginPath();
            this.ctx.drawImage(this.background, x, y, w, h);
            this.ctx.closePath();
        }
    }
}
