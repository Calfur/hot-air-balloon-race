class Judge {
    constructor() {
        this.hitbox = false; //Hitboxen von allem einschalten
        this.hitboxChanged = false;
        this.countdownStart = false;
        this.countdownLength = 3;
        this.gameTimer = -this.countdownLength;
        this.gameDuration = 120;
        this.raceStart = false;
        this.raceEnd = false;
        this.raceEndStartTime = false;
        this.timeUpToNewStart = 3;
        this.gameClock;
        this.timeIsOver = false;
        this.goSound = createAudio('./assets/goSound.mp3');
        this.soundDone = false;
        this.threSound = createAudio('./assets/thre.mp3');
        this.twoSound = createAudio('./assets/two.mp3');
        this.oneSound = createAudio('./assets/one.mp3');
        this.goSound.volume(0.7);
        this.threSound.volume(0.7);
        this.twoSound.volume(0.7);	
        this.oneSound.volume(0.7);
    }
    draw() {
        if (balloonOne.x < -50) {
            this.andTheWinnerIsBlue();
        } 
        if (balloonTwo.x < -50) {
            this.andTheWinnerIsRed();
        } 
    }
    andTheWinnerIsRed() {
        textAlign(CENTER, CENTER);
        textSize(50);
        strokeWeight(0);
        fill(0, 0, 0);
        this.raceEnd = true;
        text("Der rote Ballon hat gewonnen!", width/2, height/2 - map.startFloorHeight);
    }
    andTheWinnerIsBlue() {
        textAlign(CENTER, CENTER);
        textSize(50);
        strokeWeight(0);
        fill(0, 0, 0);
        this.raceEnd = true;
        text("Der blaue Ballon hat gewonnen!", width/2, height/2 - map.startFloorHeight);
    }
    andTheWinnerIsNobody() {
        textAlign(CENTER, CENTER);
        textSize(50);
        strokeWeight(0);
        fill(0, 0, 0);
        this.raceEnd = true;
        text("Unentschieden!", width/2, height/2 - map.startFloorHeight);
    }
    runGameTimer() {
        textAlign(CENTER, CENTER);
        textSize(100);
        strokeWeight(0);
        fill(0, 0, 0);
        if (!this.countdownStart) {
        } 
        else {
            let passedSeconds = Math.floor((Date.now() - this.countdownStart) / 1000); //Volle Sekunden seit Countdownstart
            this.gameTimer = -this.countdownLength + passedSeconds;
            this.gameClock = this.gameDuration - this.gameTimer;
            if (this.gameTimer == -3) {
                text("3", width/2, height/2 - map.startFloorHeight);
                if(this.soundDone == false){
                    if (startMenu.playSound == true) {
                        this.threSound.play() //Audio startet
                    }
                    this.soundDone += 1;
                }
            } else if (this.gameTimer == -2) {
                text("2", width/2, height/2 - map.startFloorHeight);
                if(this.soundDone == 1){
                    if (startMenu.playSound == true) {
                        this.twoSound.play() //Audio startet
                    }
                    this.soundDone += 1;
                }
            } else if (this.gameTimer == -1) {
                text("1", width/2, height/2 - map.startFloorHeight);
                if(this.soundDone == 2){
                    if (startMenu.playSound == true) {
                        this.oneSound.play() //Audio startet
                    }
                    this.soundDone += 1;
                }
            } else if (this.gameTimer == 0) {
                text("go!", width/2, height/2 - map.startFloorHeight);
                if(this.soundDone == 3){
                    if (startMenu.playSound == true) {
                        this.goSound.play() //Audio startet
                    }
                    this.soundDone += 1;
                }
            } else if (this.gameTimer > 0 && !this.raceEnd) {
                textSize(50);
                text(this.gameClock, 50, 30);
            }
        }
        if (this.gameTimer == 0 && !this.raceStart){
            balloonOne.weight = -0.7;
            balloonTwo.weight = -0.8;
            this.raceStart = true;
        }
        if (this.raceStart == true && this.gameClock < 1 && this.raceEnd == false) {
            this.raceEnd = true;
            this.timeIsOver = true;
        }
        if (this.timeIsOver == true) {
            textAlign(CENTER, CENTER);
            textSize(50);
            strokeWeight(0);
            fill(0, 0, 0);
            if (balloonOne.x < balloonTwo.x) {
                text("Die Zeit ist abgelaufen, der blaue Ballon hat gewonnen!", width/4, height/2 - map.startFloorHeight, windowWidth/2);
            }
            else if (balloonOne.x > balloonTwo.x) {
                text("Die Zeit ist abgelaufen, der rote Ballon hat gewonnen!", width/4, height/2 - map.startFloorHeight, windowWidth/2);
            }
            else {
                text("Die Zeit ist abgelaufen, unentschieden!", width/4, height/2 - map.startFloorHeight, windowWidth/2);
            }            
        }
    }       
    update() {
        //Hitbox ein und ausschalten mit ALT + H
        if (keyIsDown(18) && keyIsDown(72)){
            if (this.hitbox == false && this.hitboxChanged == false) {                
                this.hitbox = true;
            } else if(this.hitboxChanged == false){                               
                this.hitbox = false;
            }
            this.hitboxChanged = true;
        } else {
            this.hitboxChanged = false;
        }
        //Design von den Ballonen mit geheimer Tastenkombination ändern
        if (keyIsDown(18) && keyIsDown(81) && keyIsDown(49)) { //ALT, Q und 1 für den roten Ballon
            balloonOne.balloonBackImg = loadImage('./assets/balloonAlfredBack.png');
            balloonOne.balloonFrontImg = loadImage('./assets/balloonAlfredFront.png');          
        }  
        if (keyIsDown(18) && keyIsDown(81) && keyIsDown(50)) { //ALT, Q und 2 für den blauen Ballon
            balloonTwo.balloonBackImg = loadImage('./assets/balloonAlfredBack.png');
            balloonTwo.balloonFrontImg = loadImage('./assets/balloonAlfredFront.png');          
        }       
        if (balloonOne.weight <= -0.3 &&
            balloonTwo.weight <= -0.3) {
            if (this.countdownStart == false) {
                this.countdownStart = Date.now();
                this.runCountdown = true;
            }
        }
        if (keyIsDown(27) || this.raceEnd == true && this.raceEndStartTime != false) { //esc um das Rennen zu beenden
            let passedSeconds = Math.floor((Date.now() - this.raceEndStartTime) / 1000);
            if (this.timeUpToNewStart < passedSeconds) {                               
                gameStart = false;
                startMenu.unMuteButton.hide();
                startMenu.muteButton.hide();
                Menu();
            }
        } else if (this.raceEnd == true && this.raceEndStartTime == false) {           
            this.raceEndStartTime = Date.now();
        }
        this.runGameTimer();      
    }
}