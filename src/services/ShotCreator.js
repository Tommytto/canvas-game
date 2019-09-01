import Shot from '../components/Shot';

export default class ShotCreator {
    constructor(params) {
        this.props = params;
        this.hero = params.hero;
        this.lastShotIndex = 0;
        this.shots = {};

        this.bind();
    }

    bind() {
        document.addEventListener('keydown', this.handleKeyDown);
    }

    handleKeyDown = (e) => {
        if (' ' === e.key) {
            const heroInfo = this.hero.getInfo();
            this.shots[this.lastShotIndex] = new Shot({
                ...this.props,
                info: {
                    x: heroInfo.x + heroInfo.w,
                    y: heroInfo.y + heroInfo.h / 2,
                    w: 50,
                    h: 5,
                },
            });
            this.lastShotIndex++;
            const audio = new Audio('assets/shot.mp3');
            audio.play();
        }
    };

    getShots() {
        return Object.values(this.shots);
    }
}
