class Lootdrop {
    constructor() {
        this.lootdropImg = loadImage('assets/lootdrop.png');
        this.openAudio = createAudio('assets/lootdropSound.mp3')        
        this.openAudio.volume(0.6);
        this.soundFinish = false;
        this.audioDone = false;
        this.realX = Math.floor(random(windowWidth/2+100, windowWidth+100)) + map.position;
        this.x = this.realX;
        this.y = -windowHeight*0.05;
        this.velocityX = 0;
        this.velocityY = 0;
        this.weight = 0.15;
        this.whoCollected = false;
		this.windSpeedChange = 0;
        this.desiredWindSpeedChange = 0;
        this.width = windowWidth*0.1;
        this.height = this.width;
        this.hitboxWidth = this.width/4;
        this.hitboxHeight = this.height/4;
        this.hitboxX = this.x - this.hitboxWidth/2 - 2;
        this.hitboxY = this.y - this.hitboxHeight/2 + 20;
        this.middleHitboxX = this.hitboxX + this.hitboxWidth/2;
        this.middleHitboxY = this.hitboxY + this.hitboxHeight/2;
        this.hotFireItemTime = 1;
        this.propellerItemTime = 1;
        this.hotFireTimerLength = 20;
        this.propellerTimerLength = 10;
        this.multiplyColector = 0;
        this.createPackaging = true;
        this.hotFireTimerStartTime = Date.now();
        this.propellerTimerStartTime = Date.now(); 
        if(random(1, 30) > 2) {
            if (startMenu.degreeOfDifficulty >= 1) {         
                this.randomItem = Math.floor(random(1, 6));
            } else {
                this.randomItem = Math.floor(random(1, 5));
            }
        } else {
            this.randomItem = 6;
        }
        
    }
    draw() {
        if (this.whoCollected == false) {
            image(this.lootdropImg, this.x - this.lootdropImg.width/4/2, this.y - this.lootdropImg.height/4/2, this.lootdropImg.width/4, this.lootdropImg.height/4);
            if (judge.hitbox == true) { //Hitbox
                stroke(0);
                strokeWeight(1);
                noFill();
                rect(this.hitboxX, this.hitboxY, this.hitboxWidth, this.hitboxHeight);
                ellipse(this.middleHitboxX, this.middleHitboxY, 5);
                line(this.x, this.y + this.lootdropImg.width/4/2.2, this.x, windowHeight - map.floorHeight[Math.floor(this.realX)].y);
            }
            this.hotFireTimerStartTime = Date.now();
            this.propellerTimerStartTime = Date.now();
            this.soundStartTime = Date.now();
        } else if(this.createPackaging == true) {
            lootdropOpen.push(new LootdropOpen(this.realX, this.y));
            this.createPackaging = false;
        }
    }
    collidesWith(x, y, width, height) {
        let distanceToThingX = Math.abs(x - this.middleHitboxX);
        let distanceToThingY = Math.abs(y - this.middleHitboxY);
        if (distanceToThingX < this.hitboxWidth/2 + width/2 &&
            distanceToThingY < this.hitboxHeight/2 + height/2){
            return true;
        } else{
            return false;
        }
    }
    giveItem() {
        if(this.soundFinish == true) {
            switch(this.randomItem) {
                case 1:
                case 2: 
                    this.itemHotFire();
                    break;
                case 3: 
                case 4:
                    this.itemPropeller();
                    break;
                case 5:
                    this.itemHole();
                    break;
                case 6:
                    this.itemAlfredSkin();
                }
        } else {            
            if (this.audioDone == false) {
                if(startMenu.playSound == true) {                
                    this.openAudio.play();
                }
                this.audioDone = true;
            }
            if (Math.floor((Date.now() - this.soundStartTime) / 1000) > 0.4) {
                this.soundFinish = true;
            }
        }        
    }
    itemHotFire() {
        if(this.hotFireItemTime > 0) {
            switch(this.giveItemTo) {
                case 1: 
                    balloonOne.hotFire = true;
                    balloonOne.firePower = 0.0055;
                    break;
                case 2: 
                    balloonTwo.hotFire = true;
                    balloonTwo.firePower = 0.0055;
                    break;
            }
            let passedSeconds = Math.floor((Date.now() - this.hotFireTimerStartTime) / 1000);
            this.hotFireItemTime = this.hotFireTimerLength - passedSeconds;
        } else{
            switch(this.giveItemTo) {
                case 1: 
                    balloonOne.hotFire = false;
                    balloonOne.firePower = 0.003;
                    break;
                case 2: 
                    balloonTwo.hotFire = false;
                    balloonTwo.firePower = 0.003;
                    break;
            }
            this.finish = true;
        }
    }
    itemHole() {        
        switch(this.giveItemTo) {
            case 1: 
                balloonOne.weight += 0.7;
                break;
            case 2: 
                balloonTwo.weight += 0.7;
                break;
        }
    this.finish = true;
    }
    itemPropeller() {
        if(this.propellerItemTime > 0) {
            switch(this.giveItemTo) {
                case 1: 
                    balloonOne.propeller = true;
                    balloonOne.propellerSpeed = 1.2;
                    break;
                case 2: 
                    balloonTwo.propeller = true;
                    balloonTwo.propellerSpeed = 1.2;
                    break;
            }
            let passedSeconds = Math.floor((Date.now() - this.propellerTimerStartTime) / 1000);
            this.propellerItemTime = this.propellerTimerLength - passedSeconds;
        } else{
            switch(this.giveItemTo) {
                case 1: 
                    balloonOne.propeller = false;
                    balloonOne.propellerSpeed = 0;
                    break;
                case 2: 
                    balloonTwo.propeller = false;
                    balloonTwo.propellerSpeed = 0;
                    break;
            }            
            this.finish = true;
        }
    }
    itemAlfredSkin() {
        switch(this.giveItemTo) {
            case 1: 
                balloonOne.balloonBackImg = loadImage('./assets/balloonAlfredBack.png');
                balloonOne.balloonFrontImg = loadImage('./assets/balloonAlfredFront.png');           
                break;
            case 2: 
                balloonTwo.balloonBackImg = loadImage('./assets/balloonAlfredBack.png');
                balloonTwo.balloonFrontImg = loadImage('./assets/balloonAlfredFront.png');
                break;
        }
    this.finish = true;
    }
    update() {
        if (this.y < windowHeight-map.floorHeight[Math.floor(this.realX)].y-this.lootdropImg.width/4/2.2) {
            this.velocityX = map.windX/1.3 + this.windSpeedChange;
            this.realX += this.velocityX;
            
            this.velocityY += this.weight;
            this.velocityY /= map.drag + 1;
            this.y += this.velocityY;            
        }
        this.x = this.realX - map.position;
        //Test ob im Wind
        this.desiredWindSpeedChange = 0;
        for (var i = 0; i < wind.length; i++) {
            if (wind[i].collidesWith(this.x, this.y, this.width/2, this.height/2) == true) {
                this.desiredWindSpeedChange += wind[i].windSpeed;
            }
        }
        if (this.desiredWindSpeedChange > this.windSpeedChange) {
            this.windSpeedChange += 0.1;
        } else if (this.desiredWindSpeedChange < this.windSpeedChange) {				
            this.windSpeedChange -= 0.1;
        }
        if (this.whoCollected != false) {
            if(this.multiplyColector == 1) {
                this.giveItemTo = this.whoCollected;
            }
            this.giveItem();
        }
        this.hitboxX = this.x - this.hitboxWidth/2 - 2;
        this.hitboxY = this.y - this.hitboxHeight/2 + 20;
        this.middleHitboxX = this.hitboxX + this.hitboxWidth/2;
        this.middleHitboxY = this.hitboxY + this.hitboxHeight/2;
    }
}