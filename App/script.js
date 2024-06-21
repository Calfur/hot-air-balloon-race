var tree = [];
var wind = [];
var lootdrop = [];
var lootdropOpen = [];
var airplane = [];
var gameStart = false;

function setup() {
    createCanvas(windowWidth, windowHeight);    
    Menu();
}
function Menu() {
    startMenu = new Startmenu();
}
function startGame() {
    for (var i = lootdrop.length-1; i >= 0; i--) {
        lootdrop.splice(i, 1);
    }
    for (var i = lootdropOpen.length-1; i >= 0; i--) {
        lootdropOpen.splice(i, 1);
    }
    for (var i = wind.length-1; i >= 0; i--) {
        wind.splice(i, 1);
    }
    for (var i = tree.length-1; i >= 0; i--) {
        tree.splice(i, 1);
    }
    for (var i = airplane.length-1; i >= 0; i--) {
        airplane.splice(i, 1);
    }
    map = new Map();
    judge = new Judge();
    balloonOne = new Balloon(1);
    balloonTwo = new Balloon(2);
}
function draw() {
    if (gameStart == true) { //Game wird geladen            
        map.draw();   
        map.update();
        balloonOne.draw();
        balloonOne.update();
        balloonTwo.draw();
        balloonTwo.update();
        judge.draw();
        judge.update();
    } else { //Startmenu wird geladen
        startMenu.draw();
        startMenu.update();
    }
}
function windowResized() { //beim Zoomen automatisch ausgeführt
    resizeCanvas(windowWidth, windowHeight);
    startMenu.windowResize(); //skaliert die Knöpfe im Startmenu neu
}