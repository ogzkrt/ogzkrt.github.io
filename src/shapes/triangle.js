import Vector2, { rotateAround } from '../util/vector.js';

class Triangle {

    constructor(c, l = 100) {
        this.c = c;
        this.l = l;
        this.v1 = new Vector2(c.x, c.y - l * Math.sin(Math.PI / 6));
        this.v2 = new Vector2(c.x - l / 2, c.y + Math.sin(Math.PI / 6) * l / 2);
        this.v3 = new Vector2(c.x + l / 2, c.y + Math.sin(Math.PI / 6) * l / 2);

        this.col = false;


    }


    updateCenter(c) {

        let diff = c.subtract(this.c);
        this.v1.addTo(diff);
        this.v2.addTo(diff);
        this.v3.addTo(diff);
        this.c = c;

    }

    render(ctx) {

        if (this.col) {
            ctx.strokeStyle = 'red';
        } else {
            ctx.strokeStyle = 'black';
        }


        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.fillStyle = '#ffff00aa';

        ctx.moveTo(this.v1.x, this.v1.y);
        ctx.lineTo(this.v2.x, this.v2.y);
        ctx.lineTo(this.v3.x, this.v3.y);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    }

    getVertices() {

        return [this.v1, this.v2, this.v3];
    }

    rotate(angle) {

        rotateAround(this.v1, this.c, angle);
        rotateAround(this.v2, this.c, angle);
        rotateAround(this.v3, this.c, angle);

    }

    move(v) {
        this.updateCenter(v.addTo(this.c));
    }


}

export default Triangle;