import Vector2, { rotateAround } from '../util/vector.js';

class Rect {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.col = false;
        this.c = new Vector2(x + w / 2, y + h / 2);
        this.vertices = this.initVertices();

    }

    render(ctx) {

        if (this.col) {
            ctx.strokeStyle = 'red';
        } else {
            ctx.strokeStyle = 'black';
        }

        ctx.fillStyle = '#0000ffaa';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(this.vertices[0].x, this.vertices[0].y);
        for (let i = 1; i < this.vertices.length; i++) {
            ctx.lineTo(this.vertices[i].x, this.vertices[i].y);
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    }

    getVertices() {
        return this.vertices;
    }

    initVertices() {

        let result = [];
        result.push(new Vector2(this.x, this.y));
        result.push(new Vector2(this.x + this.w, this.y));
        result.push(new Vector2(this.x + this.w, this.y + this.h));
        result.push(new Vector2(this.x, this.y + this.h));
        return result;

    }
    move(v) {

        this.updateCenter(v.add(this.c));
    }

    rotate(angle) {
        for (let i = 0; i < this.vertices.length; i++) {
            rotateAround(this.vertices[i], this.c, angle);
        }
    }

    updateCenter(c) {

        let diff = c.subtract(this.c);
        for (let i = 0; i < this.vertices.length; i++) {
            this.vertices[i].addTo(diff);
        }
        this.c = c;



    }


}


export default Rect;