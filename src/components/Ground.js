import Component from './Component';

export default class Ground extends Component {
    getInfo() {
        return this.info;
    }

    draw() {
        const {x, y, w, h} = this.getInfo();
        this.ctx.beginPath();
        this.ctx.rect(x, y, w, h);
        this.ctx.fillStyle = 'brown';
        this.ctx.fill();
        this.ctx.closePath();
    }
}
