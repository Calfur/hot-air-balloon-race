class Tree {
    constructor(x, forest) {
        if (forest == false) {
            this.influenceRandomTreeSize = Math.floor(random(1, 31)); //alle Bäume
            this.influenceRandomFir = 1;
        } else {
            this.influenceRandomTreeSize = Math.floor(random(6, 31)); //keine extremen Bäume
            this.influenceRandomFir = Math.floor(random(1, 5));
        }
        switch (this.influenceRandomFir) {
                case 1:
                    this.fir = false;
                    break;
                default:                    
                    this.fir = true;
                    break;
        }
        switch (this.influenceRandomTreeSize) {
            case 1:
                this.treeHeight = Math.floor(random(1.5*map.startFloorHeight, 2*map.startFloorHeight));
                this.treeSize = Math.floor(random(1*map.startFloorHeight, 1.4*map.startFloorHeight));
                this.trunkWidth = Math.floor(random(0.25*map.startFloorHeight, 0.3*map.startFloorHeight));
                break; //Riesen-Baum
            case 2:
            case 3:
            case 8:
            case 9:
            case 10:
            case 11:
                this.treeHeight = Math.floor(random(0.2*map.startFloorHeight, 0.4*map.startFloorHeight));
                this.treeSize = Math.floor(random(0.5*map.startFloorHeight, 0.7*map.startFloorHeight));
                this.trunkWidth = Math.floor(random(0.1*map.startFloorHeight, 0.2*map.startFloorHeight));
                break; //Busch-Baum
            case 4:
            case 5:
            case 6:
            case 7:
                this.treeHeight = Math.floor(random(map.startFloorHeight, 1.3*map.startFloorHeight));
                this.treeSize = Math.floor(random(0.6*map.startFloorHeight, 0.7*map.startFloorHeight));
                this.trunkWidth = Math.floor(random(0.1*map.startFloorHeight, 0.2*map.startFloorHeight));
                break; //hoher dünner Baum
            default:
                this.treeHeight = Math.floor(random(0.5*map.startFloorHeight, 0.6*map.startFloorHeight));
                this.treeSize = Math.floor(random(0.5*map.startFloorHeight, 0.7*map.startFloorHeight));
                this.trunkWidth = Math.floor(random(0.1*map.startFloorHeight, 0.2*map.startFloorHeight));
                break; //standard Baum            
        }
        this.greenColor = color(Math.floor(random(20, 60)), Math.floor(random(120, 160)), Math.floor(random(20, 60)));
        this.brownColor = color(Math.floor(random(80, 120)), Math.floor(random(65, 75)), Math.floor(random(45, 60)));
        this.realX = x;
        this.x = this.realX;
        this.y = height - map.floorHeight[Math.floor(this.realX)].y - this.treeHeight;
        this.hitboxX = this.x - this.treeSize/2;
        this.hitboxY = this.y - this.treeSize/2 - 40;
        this.hitboxWidth = this.treeSize;
        this.hitboxHeight = this.treeHeight + this.treeSize/2 - 10;
        this.middleY = this.hitboxY + this.hitboxHeight/2;
    }
    draw(){
        strokeWeight(0);
        //Stamm
        fill(this.brownColor);
        rect(this.x - this.trunkWidth/2, height - map.floorHeight[Math.floor(this.realX)].y - this.treeHeight,
            this.trunkWidth, this.treeHeight + 100)
		fill(this.greenColor);
        if (this.fir == true) { //Dreieck         
            triangle(this.x - this.treeSize/2, 
                     this.y + this.treeSize*0.7,
                     this.x + this.treeSize/2, 
                     this.y + this.treeSize*0.7,
                     this.x, 
                     this.y - this.treeSize*0.7);
        } else { //Kugel            
            ellipse(this.x, this.y, this.treeSize);
        }
        if (judge.hitbox == true) { //Hitbox       
        stroke(0);
        strokeWeight(1);
        noFill();
        rect(this.hitboxX, this.hitboxY, this.hitboxWidth, this.hitboxHeight);
        ellipse(this.x, this.middleY, 5);
        }        
    }
    collidesWith(x, y, width, height) {
        let distanceToThingX = Math.abs(x - this.x);
        let distanceToThingY = Math.abs(y - this.middleY);
        if (distanceToThingX < (this.hitboxWidth + width)/2 &&
            distanceToThingY < (this.hitboxHeight + height)/2){
            return true;
        } else{
            return false;
        }
    }
    update(){
        this.x = this.realX - map.position;
        this.hitboxX = this.x - this.treeSize/2;
        this.hitboxY = this.y - this.treeSize/2 + 10;
        this.middleY = this.hitboxY + this.hitboxHeight/2;        
    }
}