import Circle from "../shapes/circle.js";
import { checkCircles } from "../collision/collision.js";

class CircleTester {

    constructor() {

        this.circles = [];

        for (let i = 0; i < 40; i++) {

            let c = new Circle(Math.random() * 1000, Math.random() * 500, 25);
            this.circles.push(c);
        }

    }

    render(ctx) {

        this.circles.forEach(c => {
            c.render(ctx);
            c.col = false;
        });

        checkCircles(this.circles);

    }

    mouseMoved(v) {
        this.circles[0].updateCenter(v);
    } s

}


export default CircleTester;