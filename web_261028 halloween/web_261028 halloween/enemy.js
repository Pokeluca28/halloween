class Enemy {
    constructor(x, y, life, img) {
        this.x = x;
        this.y = y;
        this.rotation = 0;
        this.life = life;
        this.img = img;
        this.speed = 200;


        this.firerate = 0.5;
        this.firerateAux = this.firerate;

        this.boundingcollision = 20;
        this.boundingradiusSqr = this.boundingcollision * this.boundingradius;


        this.bullets = [];

        this.timeTopShoot = 5 + (Math.random() * 5);
    }

    Update(deltaTime) {
        this.rotation = Math.cos(timeSinceStart * 4) * 0.2;

        // movement
        if(this.goingright){
            this.x += this.speed * deltaTime
            if(this.x >= canvas.width){
                this.goingright = false
            }
            
        }
        else{
            this.x -= this.speed * deltaTime;
            if(this.x <= 0){
                this.goingright = true;
            }
        }

        this.timeTopShoot -= deltaTime;
        if (this.timeTopShoot <= 0.0)
            this.Shot()


        // this.firerateAux += deltaTime;
        // if(Keys["Space"] && this.firerateAux >= this.firerate) {

        //     const broom = {
        //         img: graphicAssets.broom.img,
        //         x: this.x, 
        //         y: this.y,
        //         speed: 400,
        //         Update: function(deltaTime){
        //             this.y -= this.speed * deltaTime;
        //         },
        //         Draw: function(){
        //             ctx.save();

        //             ctx.translate(this.x, this.y);
        //             ctx.scale(3, 3);

        //             ctx.drawImage(this.img, -this.img.width / 2, -this.img.height / 2);

        //             ctx.restore();
        //         }
        //     }
        //     this.bullets.push(broom);
            this.firerateAux = 0;

             for(let i = 0; i < this.bullets.length; i++){
                 const broom = this.bullets[i];
                 broom.update(deltaTime);
                 if (broom.y < -10){
                    this.bullets.splice(i,1);
                 }
             }
        

        // update the brooms
        this.bullets.forEach(broom => {
            broom.Update(deltaTime);
            
        });
    }
    

    Draw() {
        ctx.save();

        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.scale(2, 2);

        ctx.drawImage(this.img, -this.img.width / 2, -this.img.height / 2);

        ctx.restore();

        //dibuhar el radio
        ctx.beginPath();
        ctx.fillStyle(rgba (255, 255, 255, 255));
        ctx.arc(this.x, this.y, this.boundingradius, 0, Math.PI * 2)
        ctx.fill();


        // draw the brooms
        this.bullets.forEach(broom => {
            broom.Draw();
        });
    }

    Shot() {

    }
}