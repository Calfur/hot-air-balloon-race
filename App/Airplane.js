class Airplane {
    constructor() {
        this.airplaneImg = loadImage('./assets/plane.png');
        this.signBorderImg = loadImage('./assets/warningSignBorder.png');
        this.exclamationMarkImg = loadImage('./assets/exclamationMark.png');
        this.planeAudio = createAudio('./assets/airPlaneSound.mp3');
        this.warnDistance = 3*windowWidth;
        this.realX = this.warnDistance + map.position;
        this.x = this.realX; //mittel-x position vom Flieger
        this.y = Math.floor(random(windowHeight/20, windowHeight/2));//mittel-y position vom Flieger
        this.velocity = 13;
        this.width = 508/2;
        this.height = 234/2;
        this.hitboxWidth = this.width*0.8;
        this.hitboxHeight = this.height/2;
        this.hitboxX = this.x - this.hitboxWidth/2; //Ecke x
        this.hitboxY = this.y - this.hitboxHeight/2; //Ecke y
        this.whoCrashed = false;
        this.warnsign = true;
        this.timeCounter = 0;
        this.planeAudio.volume(0.6);
        if (startMenu.playSound == true) {            
            this.planeAudio.play();
        }
        this.multiplyColector = 0;
    }
    draw() {
        if (this.warnsign == true) {
            if (this.timeCounter < 5+30*(1/this.warnDistance*(this.x-windowWidth))) {
                image(this.signBorderImg, windowWidth*0.9, this.y - this.height/2, windowWidth/20, windowWidth/20);
                this.timeCounter += 1;
            } else if(this.timeCounter < 5+60*(1/this.warnDistance*(this.x-windowWidth))) {
                this.timeCounter += 1;
            } else {
                this.timeCounter = 0;
            }
            image(this.exclamationMarkImg, windowWidth*0.9, this.y - this.height/2, windowWidth/20, windowWidth/20);
            if(this.x-windowWidth < 0) {
                this.warnsign = false;
            }
        }
        image(this.airplaneImg, this.x - this.width/2, this.y - this.height/2, this.width, this.height);
        //Hitbox
        if (judge.hitbox == true) {		
            stroke(0);
            strokeWeight(1);
            noFill();
            rect(this.hitboxX, this.hitboxY, this.hitboxWidth, this.hitboxHeight);
            ellipse(this.x, this.y, 5);
        }
    }
    collidesWith(x, y, width, height) {
        let distanceToThingX = Math.abs(x - this.x);
        let distanceToThingY = Math.abs(y - this.y);
        if (distanceToThingX < this.hitboxWidth/2 + width/2 &&
            distanceToThingY < this.hitboxHeight/2 + height/2){
            return true;
        } else{            
            return false;
        }
    }
    update() {
        if(judge.raceEnd == false) {
            this.realX -= this.velocity;
        }
        this.x = this.realX - map.position;
        this.hitboxX = this.x - this.hitboxWidth/2; //Ecke x
        this.hitboxY = this.y - this.hitboxHeight/2; //Ecke y
        if (this.whoCrashed != false) {
            if(this.multiplyColector == 1) {
                switch(this.whoCrashed) {
                case 1: balloonOne.explosion = true;
                    break;
                case 2: balloonTwo.explosion = true;
                    break;
                }
            } else if(this.multiplyColector == 2){
                balloonOne.explosion = true;
                balloonTwo.explosion = true;
            }            
        }
    }
}