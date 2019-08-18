import Component from './Component';

export default class Ground extends Component {
    constructor({info, ...rest}) {
        super(rest);
        this.info = info;
    }

    getInfo() {
        return this.info;
    }

    getIntersectionInfo(info) {
        const {x, y, w, h} = this.getInfo();

        const itemBottom = info.y + info.h;
        const itemRight = info.x + info.w;
        const itemLeft = info.x;
        const itemTop = info.y;

        return {
            top: y - itemBottom,
            left: x - itemRight,
            bottom: y + h - itemTop,
            right: x + w - itemLeft,
        };
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
