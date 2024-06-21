class Wind {
    constructor() {
        this.stroke = new Array();
        this.gap = 30;
        this.realX = windowWidth + this.gap + map.position;;
        this.x = this.realX;        
        this.strokeLength = 20;
        this.transparent = 255;
        this.strokeGap = 30; //abstand zwischen Strichen Waagrecht
        this.lineColumnGap = 15; //abstand Zeilen
        //Grösse bestimmen
        this.hitboxHeight = Math.floor(random(60, 191));
        this.rowNumber = Math.floor(this.hitboxHeight/this.lineColumnGap); //anz Zeilen
        this.lineColumnGap = this.hitboxHeight / this.rowNumber; //neu, schön verteilt generieren
        this.hitboxWidth = Math.floor(random(350, 801));
        this.columnNumber = Math.floor(this.hitboxWidth/(this.strokeLength+this.strokeGap)); //anz Spalten
        this.strokeGap = (this.hitboxWidth - this.strokeLength*this.columnNumber)/this.columnNumber;
        this.totalNumberLines = this.columnNumber * this.rowNumber;
        //Y bestimmen
        this.influenceRandomY = Math.floor(random(1, 7));
        switch (this.influenceRandomY) {
            case 1:
            case 2:
            case 3:
                this.y = Math.floor(random(100, (windowHeight - map.floorHeight[Math.floor(this.realX)].y - this.hitboxHeight)/3));
                break;   
            case 4:
            case 5:
                this.y = Math.floor(random((windowHeight - map.floorHeight[Math.floor(this.realX)].y - this.hitboxHeight)/3, (windowHeight - map.floorHeight[Math.floor(this.realX)].y - this.hitboxHeight)/3*2));
                break; 
            case 6:
                this.y = Math.floor(random((windowHeight - map.floorHeight[Math.floor(this.realX)].y - this.hitboxHeight)/3*2, windowHeight - map.floorHeight[Math.floor(this.realX)].y - this.hitboxHeight));                
                break;
        }
        //Koordinaten von der Mitte generieren
        this.middleX = this.x + this.hitboxWidth/2; 
        this.middleY = this.y + this.hitboxHeight/2;
        //stroke Arrays befüllen
        this.xStart = 0;
        this.yStart = this.y + this.lineColumnGap/2 - 3;
        for (var i = 0; i < this.totalNumberLines; i++) {
            if (i % this.columnNumber == 0 && i > 0) {
                this.xStart = 0;
                this.yStart += this.lineColumnGap;                
            }
            this.stroke[i] = { 
                x: Math.floor(random(this.xStart, this.xStart + this.strokeGap - 1)),
                y: Math.floor(random(this.yStart, this.yStart + 5)),
                size: this.strokeLength
            }
            this.xStart += this.strokeLength + this.strokeGap;
        }
        //Windgeschwindigkeit bestimmen
        this.influenceWindSpeed = Math.floor(random(1, 11));
        switch (this.influenceWindSpeed) {
            case 1:        
            case 2:
            case 3:
                this.windSpeed = startMenu.windBackground;
                this.color = 255;
                break;
            case 4:
            case 5:
                this.windSpeed = startMenu.windBackground*2;
                this.color = 255;
                break;
            case 6:
                this.windSpeed = startMenu.windBackground*3.5;
                this.color = 255;
                break;   //1-6 positiv
            case 7:
            case 8:
                this.windSpeed = -startMenu.windBackground*1.5;
                this.color = 100;
                break;
            case 9:   
                this.windSpeed = -startMenu.windBackground*2.5;
                this.color = 100;
                break;  //7-9 negativ
            case 10:
                this.windSpeed = -startMenu.windBackground;
                this.color = 100;              
                break; //10 negativ - Flaute
        }
    }
    collidesWith(x, y, width, height) {
        /*coole Hitboxanimation
        strokeWeight(1);
        stroke(0);
        line(x, y, this.middleX, this.middleY);*/
        let distanceToThingX = Math.abs(x - this.middleX);
        let distanceToThingY = Math.abs(y - this.middleY);
        if (distanceToThingX < (this.hitboxWidth + width)/2 &&
            distanceToThingY < (this.hitboxHeight + height)/2){
            return true;
        } else{
            return false;
        }
       
    }
    draw() {
        strokeWeight(3);
        for (var i = 0; i < this.stroke.length; i++) {
            if (this.stroke[i].x < this.stroke[i].size + 30) {
                this.transparent = 255/30 * (this.stroke[i].x - this.stroke[i].size);
            }  else if (this.stroke[i].x > this.hitboxWidth - this.stroke[i].size - 30) {
                this.transparent = 255/30 * (this.hitboxWidth - this.stroke[i].x - 30);
            }  else {                
                this.transparent = 255;
            }
            stroke(this.color, this.color, this.color, this.transparent);
            line(
                this.stroke[i].x + this.x,
                this.stroke[i].y,
                this.stroke[i].x + this.stroke[i].size + this.x,
                this.stroke[i].y
                );
            if (this.stroke[i].x > this.hitboxWidth - this.stroke[i].size) {
                this.stroke[i].x = 0;
            } else if (this.stroke[i].x < 0) {
                this.stroke[i].x = this.hitboxWidth - this.stroke[i].size;
            } else {                
                this.stroke[i].x += (this.windSpeed + startMenu.windBackground)/2;
            }
        }
        if (judge.hitbox == true) { //hitbox      
        stroke(0);
        strokeWeight(1);
        noFill();
        rect(this.middleX - this.hitboxWidth/2, this.middleY - this.hitboxHeight/2, this.hitboxWidth, this.hitboxHeight);
        }
    }
    update()  {
        this.x = this.realX - map.position;
        this.middleX = this.x + this.hitboxWidth/2; 
        this.middleY = this.y + this.hitboxHeight/2;
    }
}