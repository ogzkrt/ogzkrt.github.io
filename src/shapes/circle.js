class Circle {
    constructor(x, y, r) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.col = false;
        this.color = '#' + Math.floor(Math.random() * 16777215).toString(16);
    }
    render(ctx) {

        if (this.col) {
            ctx.strokeStyle = 'red';
        } else {
            ctx.strokeStyle = 'black';
        }

        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fill();
    }

    move(v) {
        this.x += v.x;
        this.y += v.y;
    }

    updateCenter(v) {
        this.x = v.x;
        this.y = v.y;
    }

}


export default Circle;
