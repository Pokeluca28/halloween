var canvas = /** @type {HTMLCanvasElement} */(null);
var ctx = /** @type {CanvasRenderingContext2D} */(null);

var time = 0;
var deltaTime = 0;
var timeSinceStart = 0;

var witch = null;
var enemies = [];
var enemiescount = 9;
var enemyShootRate = 0;
var enemyShootRateAux = 0;

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

    bullet: {
        img: null,
        path: "assets/Bala-Escopeta.png",
    },

    enemy: {
        img: null,
        path: "assets/Cazador de brujas.png",
    }


    
}

var witch = null;
var enemies = [];
var enemiescount = 1;


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
    audio = document.getElementById("audio_hit");
}

function Start() {
    time = Date.now();

    // initialize game logic
    witch = new Witch(canvas.width / 2, canvas.height - 100, 100, graphicAssets.witch.img);

    
    for (let i = 0; i < enemiescount; i++){
        const x = 50 * (i % 9 + 1);
        const y = 50 + Math.trunc(i / 9) * 60;
        const enemy = new Enemy(x, y, 100, graphicAssets.enemy.img);
        enemies.push(enemy);
    }

    Loop();
}

function Loop() {
    requestAnimationFrame(Loop);

    // compute delta time
    let now = Date.now();
    deltaTime = (now - time) / 1000;

    if(deltaTime > 1){
        time = now;
        return;
    }

    timeSinceStart += deltaTime;
    time = now;

    Update(deltaTime);
    Draw();
}

function Update(deltaTime) {
    witch.Update(deltaTime);

    enemies.forEach(enemy => enemy.Update(deltaTime));

    //enemy shoot
    enemyShootRate += deltaTime
    if (enemyShootRateAux >= enemyShootRate) {
        //random enemy shoot
        const radioEnemy = enemies[Math.trunc(Math.random() * enemies.length)];
        randomEnemy?.Shot();
        
        enemyShootRateAux = 0;
    }
    
    //Colisiones
    //1: whitch bullets ->> enemies
    for (let i = 0; 1 < witch.brooms.length; i++){
        const broom = witch.brooms[i];
        for (let j = 0; j < enemies.length; j++){
            const enemies = enemies[j];
            if (PointInsideCircle2(broom.x, broom.y, enemy.x, enemy.y, enemy.boundingradiusSqr)){
                alert("colision!");

                witch.brooms.splice(i, 1);
                i--;
                enemies.splice(j, 1);
                j--;
            }
            
        }
        if (bullet.y > canvas.height + 10) {
            this.bullets.splice(i, 1);
            i--;
        }
    }

    for (let j = 0; j < enemy.bullet.length; j++){
        const bullet = enemy.bullets[j];
        if (PointInsideCircle2(bullet.x, bullety, witch.x, witch.y, witch.boundingradiusSqr)){
            const dx = px - cx,
                  dy = py - cy;
            const d2 = (dx * dx) + (dy * dy);
        }
    }
    
}

function Draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(graphicAssets.background.img, 0 , 0, canvas.width, canvas.height);

    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(canvas.width / 2, Math.cos(timeSinceStart * 10) * 100 + canvas.height / 2, 100, 0, Math.PI * 2);
    ctx.fill();

    witch.Draw();

    enemies.forEach(enemy => enemy.Draw());

    // deltaTime
    ctx.fillStyle = "black";
    ctx.font = "normal 12px Comic Sans MS";
    ctx.textBaseline = "top";
    ctx.fillText(timeSinceStart.toFixed(2), 10, 10);
    ctx.fillText(`fps: ${(1 / deltaTime).toFixed(2)}`, 10, 26);
    ctx.fillText(`dt: ${deltaTime.toFixed(4)}`, 10, 42);
}

function PointInsideCircle(px, py, cx, cy, cr) {
    const dx = px - cx,
          dy = py - cy;
    const d2 = Math.sqrt(dx * dx) + (dy * dy);

    return d2 <= cr;

}

// -----------Algo --------------------

function PointInsideCircle2(px, py, cx, cy, cr2) {
    const dx = px - cx,
          dy = py - cy;
    const d2 = (dx * dx) + (dy * dy);

    return d2 <= cr2;
    
}
    
window.onload = Init;