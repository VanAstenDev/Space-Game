const cam = new Cam(0, 0, 1);
const ui = new UIHandler();
const core = new Core();

let cl; //chunk loader

let bg; //background

let player; //player
let vessel; //exploration vessel

let planet; //test planet

let qh; //quest loader

function setup() {
    createCanvas(innerWidth, innerHeight);

    cl = new ChunkLoader(1000, 1000, 20, 20);
    cl.generate();
    cl.findNeighbors();

    qh = new QuestHandler();

    //visit 3 planets quest
    let ob = new Objective(3, "Visit three planets.");
    let quest = new SimpleQuest("Explorer", ob);
    qh.addQuest(quest);

    bg = new Background();
    bg.generateBackground(200);

    let randomPoint = cl.chunks[Math.floor(Math.random() * cl.chunks.length)].getRandomPoint();

    player = new Player(randomPoint.x, randomPoint.y);
    vessel = new Vessel(player.pos.x, player.pos.y);

    // randomPoint = cl.chunks[Math.floor(Math.random()*cl.chunks.length)].getRandomPoint();



    // let alert = new UIAlert("Test", "This is a test message.");
    // ui.addElement(alert);

    let alphaNotification = new PText("Space Exploration Game | Alpha Build 0.0.1", 0, 0);
    ui.addElement(alphaNotification);

    if (core.options['debug'] == true) {
        let fpscounter = new FPSCounter();
        ui.addElement(fpscounter);
    }

    let dashboard = new Dashboard();
    ui.addElement(dashboard);

    //BANNER
    // let banner = new Banner("Test Banner!");
    // ui.addElement(banner);

    //ADDING A BUTTON
    // let button = new Button(width/2, height/2, "Click Me!", "1");
    // ui.addElement(button);
    // ui.buttons.push(button);

}

function windowResized() {
    resizeCanvas(innerWidth, innerHeight);
}

function draw() {
    cam.update();
    translate(cam.x, cam.y);
    background(10);
    cl.loop();
    qh.loop();
    // bg.drawBackground();

    player.loop();
    vessel.loop();

    ui.display();
}

function mousePressed() {
    ui.updateButtons(mouseX, mouseY);
}

function keyPressed() {
    if (keyCode == ENTER) {
        if (!player.isVessel) {
            //player is mothership
            player.isVessel = true;
            let a = new UIAlert("Vessel Change", "You have changed to the exploration vessel!");
            ui.addElement(a);
        } else {
            //player is vessel
            if (vessel.pos.dist(player.pos) < player.pickUpDistance) {
                player.isVessel = false;
                let a = new UIAlert("Vessel Change", "You have changed to the Mothership!");
                ui.addElement(a);
            }

            for (let i = 0; i < cl.chunks[vessel.chunk].planets.length; i++) {
                cl.chunks[vessel.chunk].planets[i].update();
            }
        }
    }
}