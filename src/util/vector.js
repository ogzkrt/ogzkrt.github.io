class Vector2 {

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    add(v) {
        return new Vector2(v.x + this.x, this.y + v.y);
    }
    subtract(v) {
        return new Vector2(this.x - v.x, this.y - v.y);
    }

    scale(n) {
        return new Vector2(this.x * n, this.y * n);
    }

    len() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    normal() {
        return new Vector2(-this.y, this.x);
    }

    normalize() {
        return new Vector2(this.x / this.len(), this.y / this.len());
    }

    dot(v) {
        return this.x * v.x + this.y * v.y;
    }

    addTo(v) {
        this.x += v.x;
        this.y += v.y;
        return this;
    }
    reverse() {
        return new Vector2(-this.x, -this.y);
    }


}

export default Vector2;

export const rotateAround = (point, center, angle) => {

    let cos = Math.cos(angle);
    let sin = Math.sin(angle);

    let diff = point.subtract(center);
    let x = cos * diff.x - sin * diff.y + center.x;
    let y = sin * diff.x + cos * diff.y + center.y;
    point.x = x;
    point.y = y;

}



