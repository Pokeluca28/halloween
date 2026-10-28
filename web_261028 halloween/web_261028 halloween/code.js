var canvas = /** @type {HTMLCanvasElement} */(null);
var ctx = /** @type {CanvasRenderingContext2D} */(null);

var time = 0;
var deltaTime = 0;
var timeSinceStart = 0;

var Keys =  {};

var graphicAssets = {
    witch: {
        img: null,
        path: "./assets/Player_La_Bruga_Piruga.png"
    },
    
    background: {
        img: null,
        path: "assets/Fondo.png",
    },

    broom: {
        img: null,
        path: "assets/broom.png",
    },
    
}

var witch = null;

function LoadImages(onloaded) {
    let imagesToLoad = 0;

    const onload = function () {
        --imagesToLoad;
        if (imagesToLoad === 0) {
            onloaded();
        }
    }

    for (let asset in graphicAssets) {
        imagesToLoad++;

        const img = graphicAssets[asset].img = new Image;
        img.src = graphicAssets[asset].path;
        img.onload = onload;
    }
}

function Init() {
    canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");

    ctx.imageSmoothingEnabled = false;

    // initialize input
    document.onkeydown = (evt) => {
        Keys[evt.code] = true;
    }

    document.onkeyup = (evt) => {
        Keys[evt.code] = false;
    }

    LoadImages(Start);
}

function Start() {
    time = Date.now();

    // initialize game logic
    witch = new Witch(canvas.width / 2, canvas.height - 100, 100, graphicAssets.witch.img);

    Loop();
}

function Loop() {
    requestAnimationFrame(Loop);

    // compute delta time
    let now = Date.now();
    deltaTime = (now - time) / 1000;
    timeSinceStart += deltaTime;
    time = now;

    Update(deltaTime);
    Draw();
}

function Update(deltaTime) {
    witch.Update(deltaTime);
}

function Draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(graphicAssets.background.img, 0 , 0, canvas.width, canvas.height);

    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(canvas.width / 2, Math.cos(timeSinceStart * 10) * 100 + canvas.height / 2, 100, 0, Math.PI * 2);
    ctx.fill();

    witch.Draw();

    // deltaTime
    ctx.fillStyle = "black";
    ctx.font = "normal 12px Comic Sans MS";
    ctx.textBaseline = "top";
    ctx.fillText(timeSinceStart.toFixed(2), 10, 10);
    ctx.fillText(`fps: ${(1 / deltaTime).toFixed(2)}`, 10, 26);
    ctx.fillText(`dt: ${deltaTime.toFixed(4)}`, 10, 42);
}

window.onload = Init;