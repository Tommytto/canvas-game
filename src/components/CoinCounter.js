import Component from './Component';

export default class CoinCounter extends Component {
    constructor(props) {
        super(props);
        this.info = {
            x: 10,
            y: 50,
            w: 0,
            h: 0,
        };
    }
    draw() {
        const {x, y} = this.getInfo();
        this.ctx.beginPath();
        this.ctx.font = '30px Arial';
        this.ctx.fillStyle = 'black';
        this.ctx.fillText(this.engine.getCoinCount(), x, y);
        this.ctx.closePath();
    }
}
