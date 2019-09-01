import Component from './Component';

export default class Shot extends Component {
    getInfo() {
        return this.info;
    }

    update() {
        this.info.x += 20;
    }
    draw() {
        const {x, y, w, h} = this.getInfo();
        this.ctx.beginPath();
        this.ctx.rect(x, y, w, h);
        this.ctx.fillStyle = 'red';
        this.ctx.fill();
        this.ctx.closePath();
        this.update();
    }
}
