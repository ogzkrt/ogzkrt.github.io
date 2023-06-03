const WIDTH = 500;
const HEIGHT = 500;
const margin = 10;
const offset = 0;



const n = 99;
const doRandom = false;
const randomRate = 0.2;
const centerIndex = 49;


let fps = 1;
let timeToSleep = 1000 / fps;

const defaultSpeedValue = 150;

const T = 1.86;
const R = 1;
const P = 0;
const S = 0;

let running = false;

let renderText = false;
let timeStepCounter = 1;
let freqs = []

class Grid {

    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.score = 0;
        this.nextType = 'C';
        this.type = 'C';
        this.prevType = 'C'
        this.neighbours = []


    }

    render(ctx) {

        ctx.strokeStyle = '#000';
        if (this.type == 'C' && this.prevType == 'C') {
            ctx.fillStyle = '#0000FF';
        } else if (this.type == 'D' && this.prevType == 'D') {
            ctx.fillStyle = '#ff4221';
        }
        // DEFECT BUT PREVIOUSLY COOPERATE
        else if (this.type == 'D' && this.prevType == 'C') {
            ctx.fillStyle = '#FFFF00';
        }
        // COOPERATE BUT PREVIOUSLY DEFECT
        else if (this.type == 'C' && this.prevType == 'D') {
            ctx.fillStyle = '#00FF00'
        }
        ctx.fillRect(this.x, this.y, this.w, this.h);
        if (renderText) {
            ctx.fillStyle = '#000000';
            ctx.font = "15px Arial";
            ctx.fillText(this.type, this.x + this.w / 2, this.y + this.h / 2);
            ctx.fill();

        }

    }
}



const getRandom = (range) => {
    return Math.floor(Math.random() * range) % range;
}

window.onload = () => {

    const canvas = document.getElementById('canvas');
    canvas.height = WIDTH;
    canvas.width = HEIGHT;
    const ctx = canvas.getContext('2d');


    let speed = document.getElementById('speed');
    speed.value = fps;
    document.getElementById('anim-speed').innerHTML = `${fps} FPS`;

    speed.oninput = () => {

        const val = parseFloat(speed.value);
        timeToSleep = 1000 / val;
        document.getElementById('anim-speed').innerHTML = `${val} FPS`;

    }

    let btnStop = document.getElementById('btnStop');
    btnStop.onclick = () => {
        running = false;
        console.log(freqs)
    }

    let btnStart = document.getElementById('btnStart');
    btnStart.onclick = () => {
        running = true;
    }

    let btnSave = document.getElementById('btnSave');
    btnSave.onclick = () => {
        let image = canvas.toDataURL("image/png").replace('image/png', 'image/octet-stream');
        var download = document.createElement('a');
        // Add the name of the file to the link
        download.download = `prisoner${timeStepCounter}.png`;
        // Attach the data to the link
        download.href = image;
        // Get the code to click the download link
        download.click();
    }

    const gridW = (WIDTH - margin - n * offset) / n;
    const gridH = (HEIGHT - margin - n * offset) / n;

    const nodeDict = {}

    const initBoard = () => {
        // initiliase and set location.
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                const x = (gridW + offset) * (j) + margin / 2;
                const y = (gridH + offset) * (i) + margin / 2;
                let g = new Grid(x, y, gridW, gridH)
                nodeDict[i + ',' + j] = g
            }
        }
    }

    const initRandomDefects = (nodes, randomRate) => {
        for (let node of nodes) {
            let r = getRandom(10);
            if (r < 10 * randomRate) {
                node.type = "D";
                node.prevType = "D";
            }
        }
    }

    const initGraph = () => {
        // initiliase and set location.
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                g = nodeDict[i + ',' + j]

                if (i + 1 < n) {
                    g.neighbours.push((i + 1) + ',' + j);
                    nodeDict[(i + 1) + ',' + j].neighbours.push(i + ',' + j);
                }
                if (j + 1 < n) {
                    g.neighbours.push(i + ',' + (j + 1));
                    nodeDict[i + ',' + (j + 1)].neighbours.push(i + ',' + j);
                }
                if (i + 1 < n && j + 1 < n) {
                    g.neighbours.push((i + 1) + ',' + (j + 1));
                    nodeDict[(i + 1) + ',' + (j + 1)].neighbours.push(i + ',' + j);
                }
                if (i + 1 < n && j - 1 >= 0) {
                    g.neighbours.push((i + 1) + ',' + (j - 1));
                    nodeDict[(i + 1) + ',' + (j - 1)].neighbours.push(i + ',' + j);
                }

            }
        }
    }



    const sleep = (ms) => {
        return new Promise(res => { setTimeout(res, ms) })
    }

    const render = (nodes) => {
        for (let node of nodes) {
            node.render(ctx);
        }
    }

    const evalRule = (f, s) => {


        if (f == 'D' && s == 'C') {
            return T
        }
        else if (f == 'D' && s == 'D') {
            return P
        }
        else if (f == 'C' && s == 'C') {
            return R
        }
        else if (f == 'C' && s == 'D') {
            return S
        }

    }

    const calculateScores = (nodes) => {
        for (let node of nodes) {
            let score = node.score;
            score += evalRule(node.type, node.type)
            for (let n of node.neighbours) {
                n = nodeDict[n]
                score += evalRule(node.type, n.type)
            }
            node.score = score;
        }

    }

    const calculateFrequencies = (nodes) => {
        let cops = nodes.filter(n => n.type == 'C');
        return parseFloat(cops.length / nodes.length)
    }

    const findMaxNeigh = (nodes) => {
        for (let node of nodes) {
            let maxScore = node.score;
            let ntype = node.type
            for (let n of node.neighbours) {
                n = nodeDict[n]
                if (n.score > maxScore) {
                    maxScore = n.score;
                    ntype = n.type;
                }
            }
            node.nextType = ntype;

        }

        for (let node of nodes) {
            if (node.nextType != node.type) {
                node.prevType = node.type
                node.type = node.nextType
            }
            else {
                node.prevType = node.type;
            }
        }



    }

    const resetScore = (nodes) => {
        for (let node of nodes) {
            node.score = 0;
        }
    }

    let timeStep = document.getElementById('timeStep');


    const animate = async () => {

        initBoard();
        initGraph();

        if (doRandom) {
            let nodes = Object.keys(nodeDict).map(k => nodeDict[k])
            initRandomDefects(nodes, randomRate);
        }
        else {
            let initialNode = nodeDict[`${centerIndex},${centerIndex}`]
            initialNode.type = 'D';
            initialNode.prevType = 'D';
            initialNode.nextType = 'D';
        }
        let nodes = Object.keys(nodeDict).map(k => nodeDict[k])


        while (true) {

            if (running) {


                freqs.push(calculateFrequencies(nodes));
                render(nodes);
                calculateScores(nodes);
                findMaxNeigh(nodes);
                resetScore(nodes);

                timeStep.innerHTML = `Time Step: ${timeStepCounter + 1}`
                timeStepCounter++;
                //btnSave.click();

            }
            await sleep(timeToSleep);

        }
    }


    animate();
    ctx.stroke();


}

