const cam = new Cam(0, 0, 1);
const ui = new UIHandler();

let bg;

let player;
let vessel;

function setup() {
    createCanvas(innerWidth, innerHeight);
    player = new Player(width/2, height/2);
    vessel = new Vessel(player.pos.x, player.pos.y);

    bg = new Background();
    bg.generateBackground(200);

    let alert = new UIAlert("Test", "This is a test message.");
    ui.addElement(alert);
}

function windowResized() {
    resizeCanvas(innerWidth, innerHeight);
}

function draw() {
    cam.update();
    translate(cam.x, cam.y);
    background(50);
    bg.drawBackground();

    player.loop();
    vessel.loop();

    ui.display();

}

function keyPressed() {
    if (keyCode == ENTER) {
        if (!player.isVessel) {
            player.isVessel = true;
            let a = new UIAlert("Vessel Change", "You have changed to the exploration vessel!");
            ui.addElement(a);
        } else {
            if (vessel.pos.dist(player.pos) < player.pickUpDistance) {
                player.isVessel = false;
                let a = new UIAlert("Vessel Change", "You have changed to the Mothership!");
                ui.addElement(a);
            }
        }
    }
}