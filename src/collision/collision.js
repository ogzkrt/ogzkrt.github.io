import { min, max } from '../util/math.js';
import Polygon from '../shapes/polygon.js';
import Vector2 from '../util/vector.js';

export const checkSAT = (s1, s2, ctx) => {

    let vert1 = s1.getVertices();
    let vert2 = s2.getVertices();

    let distance = Number.MAX_VALUE;
    let axisVector = null;


    for (let i = 0; i < vert1.length; i++) {

        const v1 = vert1[i];
        const v2 = vert1[(i + 1) % vert1.length];

        const v12 = v2.subtract(v1);
        const axis = v12.normal();

        const pr1 = projectAxis(vert1, axis);
        const pr2 = projectAxis(vert2, axis);

        if (pr1.min >= pr2.max || pr2.min >= pr1.max) {

            return false;

        }

        let tmpDistance = min(pr1.max - pr2.min, pr2.max - pr1.min)
        if (tmpDistance <= distance) {
            distance = tmpDistance;
            axisVector = axis;
        }

    }
    for (let i = 0; i < vert2.length; i++) {

        const v1 = vert2[i];
        const v2 = vert2[(i + 1) % vert2.length];

        const v12 = v2.subtract(v1);
        const axis = v12.normal();

        const pr1 = projectAxis(vert1, axis);
        const pr2 = projectAxis(vert2, axis);

        if (pr1.min >= pr2.max || pr2.min >= pr1.max) {

            return false;
        }
        let tmpDistance = min(pr1.max - pr2.min, pr2.max - pr1.min)
        if (tmpDistance <= distance) {
            distance = tmpDistance;
            axisVector = axis;
        }
    }

    resolvePolygonCollision(s1, s2, axisVector, distance, ctx);

    return true;




};

const projectAxis = (vertices, axis) => {

    let min = Number.MAX_VALUE;
    let max = -Number.MAX_SAFE_INTEGER;

    for (let i = 0; i < vertices.length; i++) {
        const v = vertices[i];
        const result = v.dot(axis);

        if (result <= min) {
            min = result;
        }
        if (result >= max) {
            max = result;
        }
    }
    return { min, max }

}


export const checkCircles = (circles) => {

    for (let i = 0; i < circles.length - 1; i++) {
        for (let j = i + 1; j < circles.length; j++) {
            let s1 = circles[i];
            let s2 = circles[j];
            if (checkCircleCollision(s1, s2)) {

            }
        }
    }

}

const checkCircleCollision = (r1, r2) => {

    const v1 = new Vector2(r1.x, r1.y);
    const v2 = new Vector2(r2.x, r2.y);

    if (v1.subtract(v2).len() <= r1.r + r2.r) {
        const normal = v2.subtract(v1);
        const distance = normal.len() - (r1.r + r2.r);
        r1.col = true;
        r2.col = true;
        resolveCircleCollision(r1, r2, normal, distance);

    }

}

const resolveCircleCollision = (c1, c2, normal, distance) => {
    c1.move(normal.normalize().scale(distance / 2));
    c2.move(normal.normalize().scale(-distance / 2));

}

export const checkCollisionsPolygons = (shapes, ctx) => {
    for (let i = 0; i < shapes.length - 1; i++) {
        for (let j = i + 1; j < shapes.length; j++) {
            let s1 = shapes[i];
            let s2 = shapes[j];
            if (checkSAT(s1, s2, ctx)) {
                s1.col = true;
                s2.col = true;
            }
        }
    }
}

const resolvePolygonCollision = (r1, r2, axisVector, distance, ctx) => {

    distance = distance / axisVector.len();

    let check = r2.c.subtract(r1.c);

    if (check.dot(axisVector) < 0) {
        axisVector = axisVector.scale(-1);
    };

    r1.move(axisVector.normalize().scale(-distance / 2));
    r2.move(axisVector.normalize().scale(distance / 2));



    ctx.beginPath();
    ctx.moveTo(r1.c.x, r1.c.y);
    ctx.lineTo(r1.c.subtract(axisVector).x, r1.c.subtract(axisVector).y);

    ctx.moveTo(r2.c.x, r2.c.y);
    ctx.lineTo(r2.c.add(axisVector).x, r2.c.add(axisVector).y);

    ctx.stroke();



}

