import Polygon from "../shapes/polygon.js";
import Rect from "../shapes/rectangle.js";
import Triangle from "../shapes/triangle.js";
import { checkCollisionsPolygons } from "../collision/collision.js";
import Vector2 from "../util/vector.js";

class PolygonTester {

    constructor() {

        const r1 = new Rect(600, 225, 100, 50);
        const r2 = new Rect(800, 225, 50, 150);

        const t1 = new Triangle(new Vector2(500, 225));
        const t2 = new Triangle(new Vector2(100, 50));


        let p1 = new Polygon(new Vector2(300, 300), 6, 50);
        let p2 = new Polygon(new Vector2(400, 300), 4, 50);
        let p3 = new Polygon(new Vector2(500, 350), 3, 50);
        let p4 = new Polygon(new Vector2(200, 200), 5, 50);
        this.shapes = [r1, r2, t1, t2, p1, p2, p3, p4];
        //this.shapes = [p1, p2, p3, p4];
        this.rotation = 0.01;
    }

    render(ctx) {

        this.shapes.forEach(s => {
            s.render(ctx);
            //s.rotate(this.rotation);
            s.col = false;
        }
        );

        checkCollisionsPolygons(this.shapes, ctx);

    }


    mouseMoved(v) {
        this.shapes[0].updateCenter(v);

    }



}

export default PolygonTester;