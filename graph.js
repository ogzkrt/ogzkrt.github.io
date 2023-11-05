window.onload = () => {


    const canvas = document.getElementById('graph');
    const ctx = canvas.getContext('2d');
    canvas.width = 500;
    canvas.height = 500;

    const render = () => {

        ctx.clearRect(0, 0, 500, 500);

        ctx.fillStyle = 'red';
        ctx.rect(0, 0, 50, 50);
        ctx.fill();

        requestAnimationFrame(render);
    }

    render();

};