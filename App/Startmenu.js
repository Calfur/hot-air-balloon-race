class Startmenu {
	constructor() {
        this.difficultyButton = new Array();          
        for (var i = 0; i < 3; i ++) { 
            this.difficultyButton[i] = { 
                x: windowWidth/7 -  this.difficultyButtonSize/2
            }              
        }
        this.showInfos = false;
        this.degreeOfDifficulty = 0;
        this.playSound = true;
        this.pressed = false;
        this.lightRotation = 0;
        
        this.backgroundImg = loadImage('./assets/background.png');
		this.balloonBackImg = loadImage('./assets/balloonOneBack.png');
        this.balloonValveImg = loadImage('./assets/valve.png');        
        this.startButtonImg = loadImage('./assets/startButton.png');
        this.startButtonLightImg = loadImage('./assets/startButtonLight.png');

        //Start Knopf zeichnen
        this.startButton = createImg('./assets/empty512.png');
        this.startButton.mousePressed(this.newGame);
        //Schwierigkeitsgrade-Knöpfe zeichnen
        this.easyButton = createImg('./assets/easyButton.png'); //degree of difficulty 0
        this.easyButton.mousePressed(function() {startMenu.difficulty(0)}) 

        this.middleButton = createImg('./assets/middleButton.png'); //degree of difficulty 1
        this.middleButton.mousePressed(function() {startMenu.difficulty(1)});

        this.hardButton = createImg('./assets/hardButton.png'); //degree of difficulty 2
        this.hardButton.mousePressed(function() {startMenu.difficulty(2)});
        //Infobutton zeichnen
        this.infoButton = createImg('./assets/infoButton.png');
        this.infoButton.mousePressed(this.infoButtonPressed);
        //Sound ein/aus knopf zeichnen
        this.unMuteButton = createImg('./assets/soundOFF.png')
        this.unMuteButton.mousePressed(this.unMuteSound);

        this.muteButton = createImg('./assets/soundON.png')
        this.muteButton.mousePressed(this.muteSound);
        this.unMuteButton.hide();

        this.windowResize();

        this.difficultyButton[0].title = 'Anfänger';  
        this.difficultyButton[0].text = '- langsame Windgeschwindigkeit\n- nur gute Geschenke';          
        this.difficultyButton[1].title = 'Hobbypilot';
        this.difficultyButton[1].text = '- mittlere Windgeschwindigkeit';
        this.difficultyButton[2].title = 'Profiflieger';
        this.difficultyButton[2].text = '- hohe Windgeschwindigkeit\n- Flugzeuge';
        this.infoText = 'Tastenbelegungen:\n- Feuern:                  W(rot) Pfeil rauf(blau)\n- Luft ablassen:        S(rot) Pfeil runter(blau)\n\n- Game starten:      Enter oder Leertaste\n- Spiel abbrechen: ESC\n- Sound Ein/Aus:      M\n- Hitboxen Ein/Aus: alt + H';
        
        //Variabeln auf standard (degreeOfDifficulty 0)        
        this.windBackground = 3;
    }    
    windowResize() {
        this.textBoxBackgrondX = windowWidth*0.65;
        this.textBoxBackgrondY = windowHeight*0.7;
        this.textBoxBackgrondWidth = windowWidth*0.30;
        this.textBoxBackgrondHeight = windowHeight*0.20;

        this.infoTextBoxBackgrondX = windowWidth*0.65;
        this.infoTextBoxBackgrondY = windowHeight*0.2;
        this.infoTextBoxBackgrondWidth = windowWidth*0.30;
        this.infoTextBoxBackgrondHeight = windowHeight*0.3;

        this.titleX = windowWidth*0.07;
        this.titleY = windowHeight*0.07;
        this.byRobinX = windowWidth*0.89;
        this.byRobinY = windowHeight*0.95;

        this.startButtonX = windowWidth*0.5;
        this.startButtonY = windowHeight*0.45;
        this.startButtonSize = windowWidth/7; 

        this.difficultyButtonSize = windowHeight/4.5;
        this.difficultyButton[0].x = windowWidth/5 -  this.difficultyButtonSize/2;
        this.difficultyButton[1].x = windowWidth/5 -  this.difficultyButtonSize/2;
        this.difficultyButton[2].x = windowWidth/5 -  this.difficultyButtonSize/2;
        this.difficultyButton[0].y = windowHeight*0.9/4*3 - this.difficultyButtonSize/2 + windowHeight*0.10;
        this.difficultyButton[1].y = windowHeight*0.9/2 - this.difficultyButtonSize/2 + windowHeight*0.10;   
        this.difficultyButton[2].y = windowHeight*0.9/4 - this.difficultyButtonSize/2 + windowHeight*0.10;

        this.startButton.position(this.startButtonX - this.startButtonSize/2,this.startButtonY - this.startButtonSize/2);
        this.startButton.size(this.startButtonSize, this.startButtonSize);

        this.easyButton.position(this.difficultyButton[0].x, this.difficultyButton[0].y);
        this.easyButton.size(this.difficultyButtonSize, this.difficultyButtonSize);
        this.middleButton.position(this.difficultyButton[1].x, this.difficultyButton[1].y);
        this.middleButton.size(this.difficultyButtonSize, this.difficultyButtonSize);
        this.hardButton.position(this.difficultyButton[2].x, this.difficultyButton[2].y);
        this.hardButton.size(this.difficultyButtonSize, this.difficultyButtonSize);
        
        this.infoButton.position(windowWidth*0.95 - windowWidth/60, windowHeight*0.05);
        this.infoButton.size(windowWidth/30, windowWidth/30);
        
        this.muteButton.position(windowWidth*0.05 - windowWidth/30, windowHeight*0.95 - windowHeight/60);
        this.muteButton.size(windowWidth/60, windowWidth/60);
        this.unMuteButton.position(windowWidth*0.05 - windowWidth/30, windowHeight*0.95 - windowHeight/60);
        this.unMuteButton.size(windowWidth/60, windowWidth/60);
        //Ballon Variabeln
        this.balloonWidth = windowHeight/5.2;
		this.balloonHeight = windowHeight/5.4;
        this.balloonX = this.difficultyButton[this.degreeOfDifficulty].x + this.balloonWidth/2;
        this.balloonY = this.difficultyButton[this.degreeOfDifficulty].y + this.balloonHeight/3;
    }
    draw() {
        //Hintergrund
        strokeWeight(0);
        image(this.backgroundImg, 0, 0, windowWidth, windowHeight);
        //Titel        
        fill(0, 0, 0);
        textSize(windowHeight/20);
        textAlign(LEFT, TOP);
        text('Heissluftballonrennen', this.titleX, this.titleY);
        //by Robin
        textSize(windowHeight/40);
        textAlign(LEFT, TOP);        
        textFont("Century Gothic");
        text('by Robin Nater', this.byRobinX, this.byRobinY);
        //Startbutton 
        image(this.startButtonImg, this.startButtonX - this.startButtonSize/2, this.startButtonY - this.startButtonSize/2,this.startButtonSize, this.startButtonSize);
        push();
            translate(this.startButtonX, this.startButtonY); //setzt Drehzentrum in die Mitte vom Startknopf
            rotate(radians(this.lightRotation)); //dreht Lichtpunktbild
            image(this.startButtonLightImg,  - this.startButtonSize/2, - this.startButtonSize/2, this.startButtonSize, this.startButtonSize);
        pop();
        //Ballon zeichnen
        image(this.balloonValveImg, this.balloonX - this.balloonWidth/2, this.balloonY - this.balloonWidth/2, this.balloonWidth, this.balloonHeight);
        image(this.balloonBackImg, this.balloonX - this.balloonWidth/2, this.balloonY - this.balloonWidth/2, this.balloonWidth, this.balloonHeight);
        //Textfeld zeichnen
        fill(255, 255, 255, 200);
        rect(this.textBoxBackgrondX - windowWidth*0.01, this.textBoxBackgrondY - windowWidth*0.01, this.textBoxBackgrondWidth + windowWidth*0.02, this.textBoxBackgrondHeight + windowWidth*0.02);
        textSize(windowHeight/30);
        fill(0, 0, 0);
        textAlign(LEFT, TOP);
        text(this.difficultyButton[this.degreeOfDifficulty].title, this.textBoxBackgrondX, this.textBoxBackgrondY, this.textBoxBackgrondWidth, this.textBoxBackgrondHeight);
        textSize(windowHeight/35);
        text(this.difficultyButton[this.degreeOfDifficulty].text, this.textBoxBackgrondX, this.textBoxBackgrondY + windowHeight*0.05, this.textBoxBackgrondWidth, this.textBoxBackgrondHeight);
        //Info Text
        if (this.showInfos == true) {
            textSize(windowHeight/40);
            fill(255, 255, 255, 200);
            rect(this.infoTextBoxBackgrondX - windowWidth*0.01, this.infoTextBoxBackgrondY - windowWidth*0.01, this.infoTextBoxBackgrondWidth + windowWidth*0.02, this.infoTextBoxBackgrondHeight + windowWidth*0.02);
            fill(0, 0, 0);            
            text(this.infoText, this.infoTextBoxBackgrondX, this.infoTextBoxBackgrondY, this.infoTextBoxBackgrondWidth, this.infoTextBoxBackgrondHeight);
        }       
    }
    muteSound() {
        startMenu.playSound = false;        
        startMenu.muteButton.hide();
        startMenu.unMuteButton.show();   
    }
    unMuteSound() {
        startMenu.playSound = true;
        startMenu.unMuteButton.hide();   
        startMenu.muteButton.show();
    }
    infoButtonPressed() {
        if (startMenu.showInfos == false) {            
            startMenu.showInfos = true;
        } else {
            startMenu.showInfos = false;
        }
    }
    newGame() {
        //Variabeln je nach Schwierigkeitsgrad setzten
        switch (startMenu.degreeOfDifficulty) {
            case 0:
                startMenu.windBackground = 3;
                break;
            case 1:
                startMenu.windBackground = 4;
                break;
            case 2:
                startMenu.windBackground = 5;
                break;
        }
        startGame();
        gameStart = true;
        startMenu.startButton.hide();
        startMenu.easyButton.hide();
        startMenu.middleButton.hide();
        startMenu.hardButton.hide();
        startMenu.infoButton.hide();
    }
    difficulty(degree){
        this.degreeOfDifficulty = degree;
    }
    update() {
        if (keyIsDown(13) || keyIsDown(32)) { //Leertaste oder Enter
            this.newGame();
        }
        this.lightRotation += 1.2;
        this.lightRotation *= 1.02; //macht Lichtpunkt unregelmässig
        if (this.lightRotation > 360) {
            this.lightRotation = 0;
        }
        if (this.pressed == false) { //verhindert gedrückt halten über mehrere Frames  
            if (keyIsDown(87) || keyIsDown(38)) { //w und PFeil nach oben
                if (this.degreeOfDifficulty < 2) {                
                    this.difficulty(this.degreeOfDifficulty + 1);
                    this.pressed = Date.now();
                }
            }
            if (keyIsDown(83) || keyIsDown(40)) { //s und Pfeil nach unten
                if (this.degreeOfDifficulty > 0) {        
                    this.difficulty(this.degreeOfDifficulty - 1);
                    this.pressed = Date.now();
                }
            }            
            if (keyIsDown(73)) { //i
                this.infoButtonPressed();
                this.pressed = Date.now();
            }
            if (keyIsDown(77)) { //m
                if (this.playSound == true){                    
                    this.muteSound();
                } else {                    
                    this.unMuteSound();
                }
                this.pressed = Date.now();
            }
        } else {
            if (Date.now() -300 > this.pressed) {                
                this.pressed = false;
            }
        }
        this.balloonY -= (this.balloonY - this.balloonHeight/3 - this.difficultyButton[this.degreeOfDifficulty].y)/30;
    }
}