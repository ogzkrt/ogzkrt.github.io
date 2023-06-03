import Vector2, { rotateAround } from '../util/vector.js';
class Polygon {
    constructor(c, n, l) {
        this.c = c;
        this.n = n;
        this.l = l;
        this.vertices = this.generateVertices(n);
        this.col = false;
    }

    generateVertices(n) {

        let angle = 0;
        let offset = (360 / n) * (Math.PI / 180);
        let l = this.l;

        let result = []

        for (let i = 0; i < n; i++) {
            let x = Math.cos(angle) * l;
            let y = Math.sin(angle) * l;
            let tmp = new Vector2(x, y);
            tmp.addTo(this.c);
            result.push(tmp);
            angle += offset;
        }
        return result;
    }

    getVertices() {
        return this.vertices;
    }

    render(ctx) {

        if (this.col) {
            ctx.strokeStyle = 'red';
        } else {
            ctx.strokeStyle = 'black';
        }

        ctx.lineWidth = 2;
        ctx.fillStyle = '#ff0ff0aa';
        ctx.beginPath();
        ctx.moveTo(this.vertices[0].x, this.vertices[0].y)
        for (let i = 1; i < this.vertices.length; i++) {
            ctx.lineTo(this.vertices[i].x, this.vertices[i].y);
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

    }

    move(v) {
        this.updateCenter(v.addTo(this.c));
    }

    updateCenter(c) {

        let diff = c.subtract(this.c);
        for (let i = 0; i < this.n; i++) {
            this.vertices[i].addTo(diff);
        }
        this.c = c;



    }

    rotate(angle) {

        for (let i = 0; i < this.n; i++) {
            rotateAround(this.vertices[i], this.c, angle);
        }

    }
}

export default Polygon;