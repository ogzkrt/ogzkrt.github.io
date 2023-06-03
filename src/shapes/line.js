import Vector2, { rotateAround } from '../util/vector.js';

class Line {
    constructor(s, e) {
        this.s = s;
        this.e = e;
        this.c = new Vector2((s.x + e.x) / 2, (s.y + e.y) / 2);
    }

    render(ctx) {
        ctx.beginPath();
        ctx.moveTo(this.s.x, this.s.y);
        ctx.lineTo(this.e.x, this.e.y);
        ctx.stroke();
    }

    rotate(angle) {

        rotateAround(this.s, this.c, angle);
        rotateAround(this.e, this.c, angle);


    }


}

export default Line;