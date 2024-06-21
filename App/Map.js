class Map {
    constructor() {        
        this.pressed = false;

        this.bioms = new Array();
        this.bioms[0] = {
            width: 1500,
            x: 0,
            type: 1
        }   
        this.biomHeight = windowHeight/30;
        this.biomHeightLevel = 4;//bodenebene zwischen 2 und 12
        this.startFloorHeight = Math.floor(this.biomHeight*this.biomHeightLevel); 
        this.floorHeight = new Array();
        this.floorHeight[0] = {                
            y: this.startFloorHeight
        }
        for (var i = this.floorHeight.length; i <= this.bioms[0].width; i ++) {
            this.floorHeight[i] = {
                y: this.floorHeight[i-1].y
            }
        }  
        this.windX = 0;
        this.windBreak = 0;
        this.drag = 0.2;//Luftwiderstand
        this.position = 0;
        this.startHillHeight = 100 + this.startFloorHeight/3;
        this.realStartHillX = -windowWidth/7;
        this.startHillX = this.realStartHillX;
        this.nextWindPosition = 800;     
        this.nextLootdropPosition = 3500;
        this.nextAirplanePosition = 5000;
        this.newestBiomEndX = this.bioms[0].width;
        this.preGenerate = 5000;
        this.matterhornBiomHeightLevel = 4;        
        this.matterhornGenerate = false;
        this.maxBiomRandom = 7;
        
        this.matterhornImg = loadImage('./assets/matterhorn.png');
        this.backgroundImg = loadImage('./assets/background.png');
    }
    draw() {
        //zeichne Himmel
        image(this.backgroundImg, 0, 0, windowWidth, windowHeight);
        for (var i = tree.length-1; i >= 0; i--) {                    
            tree[i].draw();
        }
        if (this.position < windowWidth) {
        //zeichne StartHügel
        strokeWeight(0);
        fill(20, 170, 0);
        ellipse(this.startHillX, windowHeight - this.startFloorHeight - this.startHillHeight + 1000, 2500, 2000);
        //zeichne StartBoden     
        fill(45, 150, 0);
        quad(-windowWidth/3 - this.position,
            windowHeight - this.startFloorHeight,
            windowWidth/3 - this.position,
            windowHeight - this.startFloorHeight,
            windowWidth/3 - this.position,
            windowHeight,
            -windowWidth/3 - this.position,
            windowHeight);
        }
        //zeichne Boden
        for (var i = this.bioms.length-1; i >= 0; i--) {
            if (this.bioms[i].type == 1) {
                strokeWeight(0);                     
                fill(45, 150, 0);
                quad(this.bioms[i].x - this.position, 
                    windowHeight - this.floorHeight[this.bioms[i].x].y,
                    this.bioms[i].x + this.bioms[i].width - this.position,
                    windowHeight - this.floorHeight[this.bioms[i].x + this.bioms[i].width].y,
                    this.bioms[i].x + this.bioms[i].width - this.position,
                    windowHeight,
                    this.bioms[i].x - this.position,
                    windowHeight);
                if  (this.bioms[i].x - this.position < -1500) {
                    this.bioms.splice(i, 1);
                } 
            } else if (this.bioms[i].type == 2) { 
                quad(this.bioms[i].x - this.position, //Matterhorn grüner Untergrund                    
                    windowHeight - this.floorHeight[this.bioms[i].x].y,
                    this.bioms[i].x + windowHeight/5 - this.position,
                    windowHeight - this.floorHeight[this.bioms[i].x].y,
                    this.bioms[i].x + windowHeight/5 - this.position,
                    windowHeight,
                    this.bioms[i].x - this.position, 
                    windowHeight);
                quad(this.bioms[i].x + windowHeight/5 - this.position,                    
                    windowHeight - this.floorHeight[this.bioms[i].x].y,
                    this.bioms[i].x + windowHeight/10*7 - this.position,
                    windowHeight - (this.matterhornBiomHeightLevel - 4)*this.biomHeight,
                    this.bioms[i].x + windowHeight/10*7 - this.position,
                    windowHeight,
                    this.bioms[i].x + windowHeight/5 - this.position, 
                    windowHeight);
                quad(this.bioms[i].x + windowHeight/10*7 - this.position,
                    windowHeight - (this.matterhornBiomHeightLevel - 4)*this.biomHeight,
                    this.bioms[i].x + windowHeight/10*12 - this.position,
                    windowHeight - this.floorHeight[this.bioms[i].x + Math.floor(windowHeight/10*12)].y,
                    this.bioms[i].x + windowHeight/10*12 - this.position,
                    windowHeight,
                    this.bioms[i].x + windowHeight/10*7 - this.position,
                    windowHeight);
                quad(this.bioms[i].x + windowHeight/10*12 - this.position,
                    windowHeight - this.floorHeight[this.bioms[i].x + Math.floor(windowHeight/10*12)].y,                    
                    this.bioms[i].x + this.bioms[i].width - this.position,
                    windowHeight - this.floorHeight[this.bioms[i].x + Math.floor(this.bioms[i].width)].y,                    
                    this.bioms[i].x + this.bioms[i].width - this.position,
                    windowHeight,
                    this.bioms[i].x + windowHeight/10*12 - this.position,
                    windowHeight);
                image(this.matterhornImg, //Matterhorn
                    this.bioms[i].imgX - this.position,
                    windowHeight - windowHeight/1.585 - this.matterhornBiomHeightLevel*this.biomHeight,
                    windowHeight,
                    windowHeight);         
            }
        }
    }
    update() {
        if (this.pressed == false) {
            if (keyIsDown(73)) { //i
                for(var i = this.floorHeight.length - 1; i >= 0; i--) {
                    console.log(this.floorHeight[i].y);
                }
                this.pressed = Date.now();
            }
        } else {
            if (Date.now() -300 > this.pressed) {                
                this.pressed = false;
            }
        }
        while (this.newestBiomEndX < this.position + windowWidth + this.preGenerate) {
            map.newBioms();
        }        
        this.position = (balloonOne.realX + balloonTwo.realX)/2 - windowWidth/3;
        this.startHillX = this.realStartHillX - this.position;
        this.position = this.position;
        this.windX = startMenu.windBackground - this.windBreak;
        this.windBreak = 0;
        if (judge.raceStart == true) {            
            startMenu.windBackground += 0.0005; //Windgeschwindigkeitszunahme nach Zeit
            //Neue Winde generieren
            if (this.position > this.nextWindPosition) {
                wind.push(new Wind());
                this.influenceRandomWindDistance = Math.floor(random(1, 4));
                switch (this.influenceRandomWindDistance) {
                    case 1:
                    case 2:
                        this.nextWindPosition += Math.floor(random(500, 1400));
                        break;
                    case 3:
                        this.nextWindPosition += Math.floor(random(1, 500));
                        break;
                }
            }
            for (var i = wind.length-1; i >= 0; i--) {
                wind[i].draw();
                wind[i].update();
                if  (wind[i].x + wind[i].hitboxWidth < -1500) {
                    wind.splice(i, 1);
                }            
            }
            //Neue Lootdrops generieren
            if (this.position > this.nextLootdropPosition) {
                lootdrop.push(new Lootdrop());
                switch (Math.floor(random(1, 11))) {
                    case 1:
                        this.nextLootdropPosition += Math.floor(random(1000, 1500));
                        break;
                    default:
                        this.nextLootdropPosition += Math.floor(random(4000, 6000));
                        break;
                }
            }
            //Neue Flugzeuge generieren
            if (startMenu.degreeOfDifficulty == 2)
            if (this.position > this.nextAirplanePosition) {
                airplane.push(new Airplane());
                switch (Math.floor(random(1, 11))) {
                    case 1:
                        this.nextAirplanePosition += Math.floor(random(200, 500));
                        break;
                    default:
                        this.nextAirplanePosition += Math.floor(random(8000, 13000));
                        break;
                }
            }
        }
        //Flugzeuge, Lootdrops, leere Lootdrops und Winde laden
        for (var i = lootdrop.length-1; i >= 0; i--) {
            lootdrop[i].update();
            lootdrop[i].draw();
            if  (lootdrop[i].finish == true) {
                lootdrop.splice(i, 1);
            }       
        }
        for (var i = lootdropOpen.length-1; i >= 0; i--) {
            lootdropOpen[i].update();
            lootdropOpen[i].draw();
            if (lootdropOpen[i].finish == true) {
                lootdropOpen.splice(i, 1);
            }       
        }
        for (var i = tree.length-1; i >= 0; i--) {
            tree[i].update();
            if (tree[i].x < -1500) {
                tree.splice(i, 1);
            }            
        }
        for (var i = airplane.length-1; i >= 0; i--) {
            airplane[i].draw();
            airplane[i].update();
            if (airplane[i].x < -1500) {
                airplane[i].planeAudio.stop();
                airplane.splice(i, 1);                
            }            
        }
    }
    newTrees(biomStartX, biomWidth) {
        let forest = false;
        if (random(1, 28) < 2) {            
            forest = true;
        }
        let anzTrees = Math.floor(random(0, biomWidth/180))
        if (forest == true) {
            anzTrees += Math.floor(biomWidth/50)
        }
        let randomValue = biomWidth/anzTrees - windowHeight/50;
        for (let i = 0; i < anzTrees; i++) {
            let x = biomStartX + Math.floor(random(biomWidth/anzTrees*i, biomWidth/anzTrees*i+randomValue));
            tree.push(new Tree(x, forest));
        }
    }
    newBioms() {
        if (this.matterhornGenerate == false && random(1, 9) < 2) {    
            this.maxBiomRandom = 7;
        } else {
            this.maxBiomRandom = 6;
        }
        if (this.biomHeightLevel > 2 && this.biomHeightLevel < 12) {
            this.randomBiom = Math.floor(random(1, this.maxBiomRandom));  
        } else if (this.biomHeightLevel <= 2) {
            this.randomBiom = Math.floor(random(1, 5));
        } else if (this.biomHeightLevel >= 12) {
            this.randomBiom = Math.floor(random(2, 6));
        }
        let startLength = this.floorHeight.length;
        switch (this.randomBiom) {            
            case 1:
                //aufwärts Biom
                this.bioms[this.bioms.length] = {
                    width: Math.floor(random(500, 1500)),
                    x: this.newestBiomEndX,
                    type: 1
                }
                for (var i = this.floorHeight.length; i < startLength + this.bioms[this.bioms.length-1].width; i ++) {
                    this.floorHeight[i] = {
                        y: this.floorHeight[i-1].y + this.biomHeight/this.bioms[this.bioms.length-1].width
                    }
                }
                this.newestBiomEndX += this.bioms[this.bioms.length - 1].width;    
                this.biomHeightLevel += 1;
                //Bäume generieren
                this.newTrees(this.bioms[this.bioms.length - 1].x, this.bioms[this.bioms.length - 1].width);
                break;
            case 2:
            case 3:
            case 4:
                //Flaches Biom                
                this.bioms[this.bioms.length] = {
                    width: Math.floor(random(500, 1500)),
                    x: this.newestBiomEndX,
                    type: 1
                }
                for (var i = this.floorHeight.length; i < startLength + this.bioms[this.bioms.length-1].width; i ++) {
                    this.floorHeight[i] = {
                        y: this.floorHeight[i-1].y
                    }
                }
                this.newestBiomEndX += this.bioms[this.bioms.length - 1].width;
                //Bäume generieren
                this.newTrees(this.bioms[this.bioms.length - 1].x, this.bioms[this.bioms.length - 1].width);
                break;            
            case 5:
                //abwärts Biom
                this.bioms[this.bioms.length] = {
                    width: Math.floor(random(500, 1500)),
                    x: this.newestBiomEndX,
                    type: 1
                }
                for (var i = this.floorHeight.length; i < startLength + this.bioms[this.bioms.length-1].width; i ++) {
                    this.floorHeight[i] = {
                        y: this.floorHeight[i-1].y-this.biomHeight/this.bioms[this.bioms.length-1].width
                    }
                }
                this.newestBiomEndX += this.bioms[this.bioms.length - 1].width;;  
                this.biomHeightLevel -= 1;
                //Bäume generieren
                this.newTrees(this.bioms[this.bioms.length - 1].x, this.bioms[this.bioms.length - 1].width);
                break;
            case 6:       
                //Matterhorn Biom
                this.bioms[this.bioms.length] = {
                    width: Math.floor(windowHeight + windowHeight/2),
                    x: this.newestBiomEndX,
                    type: 2,
                    imgX: this.newestBiomEndX + windowHeight/10*2
                }
                for (var i = this.floorHeight.length; i < startLength + this.bioms[this.bioms.length-1].width - windowHeight/10*13; i ++) {
                    this.floorHeight[i] = {
                        y: this.floorHeight[i-1].y
                    }
                }
                startLength = this.floorHeight.length;
                for (var i = this.floorHeight.length; i < startLength + this.bioms[this.bioms.length-1].width - windowHeight/10*3; i ++) {
                    let nextFloorHeight = this.floorHeight[i-1].y;
                    if (i - startLength < windowHeight*0.074) {
                        //gerade
                    } else if (i - startLength <= windowHeight*0.146) {
                        nextFloorHeight -= 0.13;
                    } else if (i - startLength <= windowHeight*0.323) {
                        nextFloorHeight += 1.05;
                    } else if (i - startLength <= windowHeight*0.446) {
                        nextFloorHeight += 1.85;
                    } else if (i - startLength <= windowHeight*0.62) {
                        nextFloorHeight -= 1.03;
                    } else if (i - startLength <= windowHeight*0.94) {                
                        nextFloorHeight -= 0.7;
                    } else if (i - startLength <= windowHeight) {                
                        nextFloorHeight += 0.3;
                    }
                    this.floorHeight[i] = {
                        y: nextFloorHeight
                    }
                }        
                for (var i = this.floorHeight.length; i < startLength + this.bioms[this.bioms.length-1].width; i ++) {
                    this.floorHeight[i] = {
                        y: this.floorHeight[i-1].y
                    }
                }              
                this.newestBiomEndX += this.bioms[this.bioms.length-1].width - 1;                   
                this.matterhornBiomHeightLevel = this.biomHeightLevel;               
                this.biomHeightLevel += 1;
                this.matterhornGenerate = true;
                break;
        }
    }
}