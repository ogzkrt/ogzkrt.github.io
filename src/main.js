import CircleTester from './tests/circletester.js';
import PolygonTester from './tests/polygontester.js';
import Vector2 from './util/vector.js';


window.onload = () => {


    console.log('window loaded.');


    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    const GW = 1000;
    const GH = 500;

    canvas.width = GW;
    canvas.height = GH;


    const polyTester = new PolygonTester();
    const circleTester = new CircleTester();



    const render = () => {

        ctx.clearRect(0, 0, GW, GH);

        polyTester.render(ctx);
        //circleTester.render(ctx);

        requestAnimationFrame(render);
    }

    render();




    window.onmousemove = (e) => {

        polyTester.mouseMoved(new Vector2(e.offsetX, e.offsetY));
        circleTester.mouseMoved(new Vector2(e.offsetX, e.offsetY));
    }




}