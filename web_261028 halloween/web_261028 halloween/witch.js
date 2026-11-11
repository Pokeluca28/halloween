class Witch {
    constructor(x, y, life, img) {
        this.x = x;
        this.y = y;
        this.rotation = 0;
        this.life = life;
        this.img = img;
        this.speed = 200;

        this.firerate = 0.5;
        this.firerateAux = this.firerate;

        this.brooms = [];
    }

    Update(deltaTime) {
        this.rotation = Math.cos(timeSinceStart * 4) * 0.2;

        const move = {x:0, y:0}
        if(Keys["KeyA"])
            move.x -= 1;
        if(Keys["KeyD"])
            move.x += 1;

        this.x += move.x * this.speed * deltaTime;

        this.x = Math.min(this.x, canvas.width - 20);
        this.x = Math.max(this.x, 20);

        this.firerateAux += deltaTime;
        if(Keys["Space"] && this.firerateAux >= this.firerate) {

            this.Shoot(deltaTime);
        }

        // update the brooms
        this.brooms.forEach(broom => {
            broom.Update(deltaTime);
            
        });
    }
    

    Shoot(deltaTime) {
        const broom = {
            img: graphicAssets.broom.img,
            x: this.x,
            y: this.y,
            speed: 400,
            Update: function (deltaTime) {
                this.y -= this.speed * deltaTime;
            },
            Draw: function () {
                ctx.save();

                ctx.translate(this.x, this.y);
                ctx.scale(3, 3);

                ctx.drawImage(this.img, -this.img.width / 2, -this.img.height / 2);

                ctx.restore();
            }
        };
        this.brooms.push(broom);
        this.firerateAux = 0;

        this.brooms.push(broom);
        this.firerateAux = 0;

        for (let i = 0; i < this.brooms.length; i++) {
            const broom = this.brooms[i];
            broom.update(deltaTime);
            if (broom.y < -10) {
                this.brooms.splice(i, 1);
            }
        }
    }

    Draw() {
        ctx.save();

        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.scale(2, 2);

        ctx.drawImage(this.img, -this.img.width / 2, -this.img.height / 2);

        ctx.restore();


        // draw the brooms
        this.brooms.forEach(broom => {
            broom.Draw();
        });
    }

    Shot() {

    }
}