class LootdropOpen {
    constructor(lootdropRealX, lootdropY) {
        this.balloonsRealX = lootdropRealX;
        this.balloonsX = this.balloonsRealX - map.position;
        this.balloonsY = lootdropY;
        console.log(this.balloonsX);

        this.chestRealX = lootdropRealX;
        this.chestX = this.balloonsRealX - map.position;
        this.chestY = lootdropY;

        this.finish = false;

        this.balloonsImg = loadImage('assets/lootdropBalloons.png');
        this.chestImg = loadImage('assets/chest.png');
    }
    draw() {
        image(this.balloonsImg, this.balloonsX - this.balloonsImg.width/4/2, this.balloonsY - this.balloonsImg.height/4/2, this.balloonsImg.width/4, this.balloonsImg.height/4);
        image(this.chestImg, this.chestX - this.chestImg.width/4/2, this.chestY - this.chestImg.height/4/2, this.chestImg.width/4, this.chestImg.height/4);
        if (judge.hitbox == true) {            
            strokeWeight(1);
            stroke(0);
            ellipse(this.chestX, this.chestY, 5);
        }
    }
    update() {
        this.balloonsY -= 1;
        this.balloonsX = this.balloonsRealX - map.position;
        this.chestX = this.chestRealX - map.position;
        if (this.chestY + this.chestImg.width/4/2.2 < windowHeight - map.floorHeight[Math.floor(this.chestRealX)].y) {            
            this.chestY += 5;
        } /*else {
            this.chestY = windowHeight - map.floorHeight[Math.floor(this.chestRealX)].y - this.chestImg.width/4/2.2;
        }*/
    }
}