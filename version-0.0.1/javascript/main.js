const cam = new Cam(0, 0, 1);
let core;

let player;
let vessel;

function setup() {
    createCanvas(innerWidth, innerHeight);
    player = new Player(width/2, height/2);
    vessel = new Vessel(player.pos.x, player.pos.y);

    core = new Core();
    core.generateBackground(100);
}

function windowResized() {
    resizeCanvas(innerWidth, innerHeight);
}

function draw() {
    cam.update();
    translate(cam.x, cam.y);
    background(50);
    core.drawBackground();

    player.loop();
    vessel.loop();
}

function keyPressed() {
    if (keyCode == ENTER) {
        if (!player.isVessel) {
            player.isVessel = true;
        } else {
            if (vessel.pos.dist(player.pos) < player.pickUpDistance) {
                player.isVessel = false;
            }
        }
    }
}