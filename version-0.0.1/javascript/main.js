const cam = new Cam(0, 0, 1);
const ui = new UIHandler();
const core = new Core();

let chunkLoader; //chunk loader

let bg; //background

//Import textures
let planetTexture_1;
let planetTexture_2;
let planetTexture_3;
let planetTexture_4;
let planetTexture_5;
let planetTexture_6;

let vesselTexture;
let motherTexture;

let player; //player
let vessel; //exploration vessel

let planet; //test planet

let questHandler; //quest loader

let textureHandler;

let soundtrack;

let radar;


function setup() {
    createCanvas(innerWidth, innerHeight);

    textureHandler = new TextureHandler();

    soundtrack = new SoundObject("test.wav");

    planetTexture_1 = loadImage("javascript/assets/textures/Planet1.png");
    planetTexture_2 = loadImage("javascript/assets/textures/Planet2.png");
    planetTexture_3 = loadImage("javascript/assets/textures/Planet3.png");
    // planetTexture_4 = loadImage("javascript/assets/textures/Planet4.png");
    planetTexture_5 = loadImage("javascript/assets/textures/Planet5.png");
    planetTexture_6 = loadImage("javascript/assets/textures/Planet6.png");

    vesselTexture = loadImage("javascript/assets/ship_textures/vessel2.png");
    motherTexture = loadImage("javascript/assets/ship_textures/vessel.png");

    textureHandler.addTexture(planetTexture_1, "planet");
    textureHandler.addTexture(planetTexture_2, "planet");
    textureHandler.addTexture(planetTexture_3, "planet");
    // textureHandler.addTexture(planetTexture_4, "planet");
    textureHandler.addTexture(planetTexture_5, "planet");
    textureHandler.addTexture(planetTexture_6, "planet");

    textureHandler.addTexture(vesselTexture, "other");
    textureHandler.addTexture(motherTexture, "other");

    let chunks = core.options['chunks'];
    chunkLoader = new ChunkLoader(core.options['chunkWidth'], core.options['chunkHeight'], chunks, chunks);
    chunkLoader.generate();
    chunkLoader.findNeighbors();

    questHandler = new QuestHandler();

    //visit 0,0 quest
    // let ob = new Objective(1, "Visit the origin point.");
    // let quest = new LocationQuest("Traveler", ob, createVector(0, 0));
    // questHandler.addQuest(quest);

    //test quest
    // let ob = new Objective(1, "Trigger this in console.");
    // let quest = new TriggerQuest("Console", ob);
    // questHandler.addQuest(quest);

    bg = new Background();
    bg.generateBackground(200);

    let randomPoint = chunkLoader.chunks[Math.floor(Math.random() * chunkLoader.chunks.length)].getRandomPoint();

    player = new Player(randomPoint.x, randomPoint.y);
    vessel = new Vessel(player.pos.x, player.pos.y);

    radar = new Radar(0.1);

    // randomPoint = chunkLoader.chunks[Math.floor(Math.random()*chunkLoader.chunks.length)].getRandomPoint();



    // let alert = new UIAlert("Test", "This is a test message.");
    // ui.addElement(alert);

    let alphaNotification = new PText("Space Exploration Game | Alpha Build 0.0.7 (Textures)", 0, 0);
    ui.addElement(alphaNotification);

    if (core.options['debug'] == true) {
        let fpscounter = new FPSCounter();
        ui.addElement(fpscounter);
    }

    let dashboard = new Dashboard();
    ui.addElement(dashboard);

    let inventory = new Inventory();
    ui.addElement(inventory);

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

let bullets = [];

function draw() {
    frameRate(70);
    cam.update();
    soundtrack.check();
    translate(cam.x, cam.y);
    background(10);
    chunkLoader.loop();
    questHandler.loop();
    // bg.drawBackground();

    player.loop();
    vessel.loop();

    // console.log(bullets.length);

    for (let i = bullets.length - 1; i > 0; i--) {
        bullets[i].lifespan--;
        bullets[i].update();
        bullets[i].display();

        if (bullets[i].lifespan < 0) {
            bullets.splice(i, 1);
        }
    }

    ui.display();

    radar.generate();
    radar.display();
}

function mousePressed() {
    soundtrack.allowed = true;
    ui.updateButtons(mouseX, mouseY);
}

function keyPressed() {
    if (keyCode == "32") {
        if (!player.isVessel) {
            //player is mothership
            player.isVessel = true;
            vessel.vel = player.vel.copy();
            vessel.vel.mult(2.5);
            // let a = new UIAlert("Vessel Change", "You have changed to the exploration vessel!");
            let a = new Banner("Switched to Vessel controls");
            ui.addElement(a);

        } else {
            //player is vessel
            if (vessel.pos.dist(player.pos) < player.pickUpDistance) {
                player.isVessel = false;
                // let a = new UIAlert("Vessel Change", "You have changed to the Mothership!");
                let a = new Banner("Switched to Mothership controls");
                ui.addElement(a);

            }

            for (let i = 0; i < chunkLoader.chunks[vessel.chunk].planets.length; i++) {
                chunkLoader.chunks[vessel.chunk].planets[i].update();
            }
        }
    }

    if (core.playerOptions['shootingAllowed']) {
        if (keyCode == ENTER) {
            vessel.shoot();
        }
    }
    
    if (keyCode == "73") {
        if (ui.getInventory().active == true) {
            ui.getInventory().active = false;
        } else {
            ui.getInventory().active = true;
        }
    }
}