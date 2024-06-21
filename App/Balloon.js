class Balloon {
	constructor(playerNumber) {
		this.playerNumber = playerNumber;
		this.width = 512/5;
		this.height = 540/5;
		this.weight = -0.10; //wird nach Start im Judge.js zurückgesetzt
		this.velocityX = 0;
		this.velocityY = 0;
		this.firePower = 0.003;
		this.crashed = false;
		this.isInAir = false;
		this.isFirstTimeInAir = false;
		this.minSpaceTop = 70;	
		this.heightBreak = 1;
		this.topHeightBreak = 0;
		this.breakX = 0;
		this.breakY = 0;
		this.treeBreak = 0;		
		this.treeSoundDone = false;
		this.releaseAirPower = 0.008;
		this.startCompensate = false;
		this.explosionSpeed = 2.8;
		this.explosionDone = false;
		this.explosion = false;
		this.explosionTime = 2; //Sekunden
		this.fireAnimation = false;
		this.releaseAirAnimation = false;
		this.windSpeedChange = 0;
		this.desiredWindSpeedChange = 0;
		this.realX = windowWidth/10;			
		this.hotFire = false;
		this.propeller = false;
		this.propellerWidth = 128/2;
		this.propellerHeight = 128/2;
		this.propellerAnimation = 1;
		this.releaseAirAnimationNr = 1;
		this.propellerSpeed = 0;
		this.x = this.realX;
		this.hitboxX = this.x - 38;
		this.hitboxY = this.y - 49;
		this.hitboxWidth = 73;
		this.hitboxHeight = 102;
		this.windHitboxX = this.x - 25;
		this.windHitboxY = this.y - 25;
		this.windHitboxWidth = 46;
		this.windHitboxHeight = 30;
		this.middleWindHitboxX = this.windHitboxX + this.windHitboxWidth/2;
		this.middleWindHitboxY = this.windHitboxY + this.windHitboxHeight/2;
		switch (this.playerNumber) {
			case 1:
				this.fireKey = 87; //Taste W
				this.releaseAirKey = 83; //Taste S
				this.balloonBackImg = loadImage('./assets/balloonOneBack.png');
				this.balloonFrontImg = loadImage('./assets/balloonOneFront.png');
				this.y = height - map.startFloorHeight - this.height/2;
				break;
			case 2:
				this.fireKey = 38; //Pfeil nach Oben
				this.releaseAirKey = 40; //Pfeil nach Unten
				this.balloonBackImg = loadImage('./assets/balloonTwoBack.png');
				this.balloonFrontImg = loadImage('./assets/balloonTwoFront.png');			
				this.y = height - map.startFloorHeight - map.startHillHeight - this.height/2;
				break;
		}
		this.balloonAir1Img = loadImage('./assets/airAnimation7.png');
		this.balloonAir2Img = loadImage('./assets/airAnimation8.png');
		this.balloonAir3Img = loadImage('./assets/airAnimation9.png');
		this.balloonFireImg = loadImage('./assets/fire.png');
		this.balloonValveImg = loadImage('./assets/valve.png');
		this.fireballImg = loadImage('./assets/feuerball.png');
		this.explosionAudio = createAudio('./assets/bomb.mp3');
		this.balloonHotFireImg = loadImage('./assets/hotFire.png');
		this.propeller1 = loadImage('./assets/propeller1.png');
		this.propeller2 = loadImage('./assets/propeller2.png');
		this.propeller3 = loadImage('./assets/propeller3.png');
		this.propeller4 = loadImage('./assets/propeller4.png');
		this.fireAudio = createAudio('./assets/fireSound.mp3');
		this.treeAudio = createAudio('./assets/treeSound.mp3');
		this.fireAudio.volume(0.05);		
		this.x += this.balloonBackImg.width/10;
	}
	heatUp() {
		this.fireAnimation = true;
		if (this.y > this.minSpaceTop-10) {
			this.weight -= this.firePower;			
		}
	}
	releaseAir() {
		this.releaseAirAnimation = true;
		if (this.isInAir == true ) {
			this.weight += this.releaseAirPower;
		}
	}
	draw() {
		if (this.explosion == false) { //keine Explosion
			image(this.balloonBackImg,
				this.x - this.width/2,
				this.y - this.height/2,
				this.width,
				this.height);
			if (this.fireAnimation == true) {
				if (startMenu.playSound == true) {
					this.fireAudio.play(); //Audio startet
				}
				if (this.hotFire == false){
					image(this.balloonFireImg,
						this.x - this.width/2,
						this.y - this.height/2,
						this.width,
						this.height);
				}
				else {
					image(this.balloonHotFireImg,
						this.x - this.width/2,
						this.y - this.height/2,
						this.width,
						this.height);
				}				
				this.fireAnimation = false;
			} else {
				this.fireAudio.stop();
			}
			if (this.propeller == true) {
				let roundedPropellerAnimation = Math.floor(this.propellerAnimation);
				switch (roundedPropellerAnimation) {
					case 1:
						image(this.propeller1,
							this.x - this.width/2.7 - this.propellerWidth,
							this.y - this.propellerHeight/2 - this.height/7,
							this.propellerWidth,
							this.propellerHeight);
						break;
					case 2:
						image(this.propeller2,
							this.x - this.width/2.7 - this.propellerWidth,
							this.y - this.propellerHeight/2 - this.height/7,
							this.propellerWidth,
							this.propellerHeight);
						break;
					case 3:
						image(this.propeller3,
							this.x - this.width/2.7 - this.propellerWidth,
							this.y - this.propellerHeight/2 - this.height/7,
							this.propellerWidth,
							this.propellerHeight);
						break;
					case 4:					
						image(this.propeller4,
							this.x - this.width/2.7 - this.propellerWidth,
							this.y - this.propellerHeight/2 - this.height/7,
							this.propellerWidth,
							this.propellerHeight);
						break;
				}
				this.propellerAnimation += 0.5;
				if (this.propellerAnimation >= 5) {					
					this.propellerAnimation = 1;
				}
			}
			image(this.balloonFrontImg, 
				this.x - this.width/2,
				this.y - this.height/2,
				this.width,
				this.height);

			if (this.releaseAirAnimation == true) {
				let roundedReleaseAirAnimationNr = Math.floor(this.releaseAirAnimationNr);
				switch (roundedReleaseAirAnimationNr) {
					case 1:
						image(this.balloonAir1Img,
							this.x - this.width/2,
							this.y - this.height/2,
							this.width,
							this.height);
						break;
					case 2:
						image(this.balloonAir2Img,
							this.x - this.width/2,
							this.y - this.height/2,
							this.width,
							this.height);
						break;
					case 3:
						image(this.balloonAir3Img,
							this.x - this.width/2,
							this.y - this.height/2,
							this.width,
							this.height);
						break;
				}
				this.releaseAirAnimationNr += 0.2;
				if (this.releaseAirAnimationNr >= 4) {					
					this.releaseAirAnimationNr = 1;
				}
				this.releaseAirAnimation = false;
			} else {
				image(this.balloonValveImg,
					this.x - this.width/2,
					this.y - this.height/2,
					this.width,
					this.height);
			}			
			if (this.treeBreak > 0 && this.treeSoundDone == false) {
				if (startMenu.playSound == true) {
					this.treeAudio.play();
				}
				this.treeSoundDone = true;
			} else if(this.treeBreak == 0) {
				this.treeSoundDone = false;
			}
			if (judge.hitbox == true) {		
        	stroke(0);
       		strokeWeight(1);
        	noFill();
			ellipse(this.x, this.y + this.height/2, 5); //Hit-Punkt Korb(Boden, Baum)
			ellipse(this.x, this.y, 5); //Punkt x, y
			rect(this.hitboxX, this.hitboxY, this.hitboxWidth, this.hitboxHeight) //Hitbox (Lootdrop)
			rect(this.windHitboxX, this.windHitboxY, this.windHitboxWidth, this.windHitboxHeight) //Hitbox (Wind)
			}
		}
		else { //Explosion
			switch (this.playerNumber) {
				case 1:
					if (balloonTwo.explosion == false) {						
						judge.andTheWinnerIsBlue();
					} else {
						judge.andTheWinnerIsNobody();
					}
					break;
				case 2:
					if (balloonOne.explosion == false) {						
						judge.andTheWinnerIsRed();
					} else {
						judge.andTheWinnerIsNobody();
					}
					break;
			}
			if (frameCount % 60 == 0 && this.explosionTime > 0) { 
				this.explosionTime --;
			}
			if (this.explosionTime == 0) {
			}
			else {
				image(this.fireballImg, 
					this.x - (this.width*1.5)/2,
					this.y - (this.height*1.5)/2 + 10,
					this.width*1.5,
					this.height*1.5);
			}
			if  (this.explosionDone == false) {
				if (startMenu.playSound == true) {
					this.explosionAudio.play();
				}
				this.explosionDone 	= true;
			}			
			judge.raceEnd = true;
		}
	}
	update() {
		if (judge.raceEnd == false) {
			this.heightBreak = 1-(1/height*this.y);
			if (judge.raceStart == false) {
				if (this.weight < -0.3) {
					this.weight = -0.3;
				}
			}
			if (keyIsDown(this.fireKey)) {	
				this.heatUp();
			}
			if (keyIsDown(this.releaseAirKey)) {
				this.releaseAir();
			}
			if (this.y < this.minSpaceTop) {
				this.topHeightBreak = 2-(2/this.minSpaceTop*this.y);
			}
			else {
				this.topHeightBreak = 0;
			}
			if (this.y + this.height/2 < windowHeight - map.floorHeight[Math.floor(this.realX)].y){
				this.isFirstTimeInAir = true;
				this.crashed = false;
			}
			if (this.isInAir == false){
				if (this.weight < -0.3 - this.heightBreak){
					this.isInAir = true;
					this.windSpeedChange /= 4;
				}
			}
			else {
				this.breakX = this.treeBreak;
				this.breakY = this.treeBreak + map.drag;
				this.velocityX = map.windX + this.windSpeedChange + this.propellerSpeed;
				this.velocityX /= this.breakX + 1;
				this.velocityY += this.weight + this.heightBreak + this.topHeightBreak;
				this.velocityY /= this.breakY + 1;
				this.weight += 0.0006; 				//verlorene Luft
				this.y += this.velocityY;
				this.realX += this.velocityX;
				this.treeBreak = 0;
			}
			if (this.isFirstTimeInAir == true) {
				if (this.y + this.height/2 > height-map.floorHeight[Math.floor(this.realX)].y && this.crashed == false){
					if (this.velocityY > this.explosionSpeed) {//harter Absturz, explosion
						this.explosion = true;
					}
					if (this.weight >  -this.heightBreak) {
						this.weight =  -this.heightBreak;
					}
					this.crashed = true;
					this.isInAir = false;
					this.velocityY = 0;
				}
			}
			if (this.startCompensate == false && this.realX > windowWidth/3) {
				this.startCompensate = true;
			}
			if (judge.raceStart == true && this.startCompensate == true) {
				this.x = this.realX - map.position;
			}
			else {
				this.x = this.realX;
				map.windBreak = 2;
			}
			//test ob im Baum
			for (var i = 0; i < tree.length; i++) {
				if (tree[i].collidesWith(this.x, this.y + this.height/2, 1, 1) == true) {
					this.treeBreak = 3;
				}
			}
			//test ob im Wind
			this.windHitboxX = this.x - 25;
			this.windHitboxY = this.y - 25;
			this.windHitboxWidth = 46;
			this.windHitboxHeight = 30;
			this.desiredWindSpeedChange = 0;
			this.middleWindHitboxX = this.windHitboxX + this.windHitboxWidth/2;
			this.middleWindHitboxY = this.windHitboxY + this.windHitboxHeight/2;
			for (var i = 0; i < wind.length; i++) {
				if (wind[i].collidesWith(this.middleWindHitboxX, this.middleWindHitboxY, this.windHitboxWidth, this.windHitboxHeight) == true) {
					this.desiredWindSpeedChange += wind[i].windSpeed;
				}
			}
			if (this.desiredWindSpeedChange > this.windSpeedChange) {
				this.windSpeedChange += 0.1;
			} else if (this.desiredWindSpeedChange < this.windSpeedChange) {				
				this.windSpeedChange -= 0.1;
			}
			//test ob im Lootdrop
			for (var i = 0; i < lootdrop.length; i++) {
				if (lootdrop[i].collidesWith(this.x, this.y, this.hitboxWidth, this.hitboxHeight) == true) {					
					lootdrop[i].whoCollected = this.playerNumber;
					lootdrop[i].multiplyColector += 1;
				}
			}
			//test ob im Flugzeug
			for (var i = 0; i < airplane.length; i++) {
				if (airplane[i].collidesWith(this.x, this.y, this.hitboxWidth, this.hitboxHeight) == true) {
					airplane[i].whoCrashed = this.playerNumber;
					airplane[i].multiplyColector += 1;
				}
			}
			this.hitboxX = this.x - 38;
			this.hitboxY = this.y - 49;
			this.hitboxWidth = 73;
			this.hitboxHeight = 102;
		}
	}
}