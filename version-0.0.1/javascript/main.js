const cam = new Cam(0, 0, 1);
const ui = new UIHandler();
const core = new Core();

let chunkLoader; //chunk loader

let bg; //background

//Import textures

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

    soundtrack = new SoundObject("javascript/assets/sounds/maintheme.mp3");

    //load vessel textures
    for (let i = 0; i < core.vessels.length; i++) {
        textureHandler.addTexture(loadImage("javascript/assets/ship_textures/" + core.vessels[i] + ".png"), "vessel");
    }

    //load mother textures
    for (let i = 0; i < core.mothers.length; i++) {
        textureHandler.addTexture(loadImage("javascript/assets/ship_textures/" + core.mothers[i] + ".png"), "mother");
    }

    textureHandler.getPlanetTextures();

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

    let alphaNotification = new PText(core.buildOptions['gameName']+" | Build "+core.buildOptions['version']+" ("+core.buildOptions['important']+") Controls: i", 0, 0);
    ui.addElement(alphaNotification);

    let fpscounter = new FPSCounter();
    ui.addElement(fpscounter);

    let dashboard = new Dashboard();
    ui.addElement(dashboard);

    let controls = new ControlsUI();
    ui.addElement(controls);

    //add random location quest
    let randomPos = chunkLoader.chunks[Math.floor(Math.random() * chunkLoader.chunks.length)].getRandomPoint();
    let ob = new Objective(1, "Go to " + Math.floor(randomPos.x) + ", " + Math.floor(randomPos.y));
    let quest = new LocationQuest("Pathfinder", ob, randomPos);
    questHandler.addQuest(quest);

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

    // bg.drawBackground();
    if (player.isVessel) {
        player.loop();
        vessel.loop();
    } else {
        vessel.loop();
        player.loop();
    }
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

    questHandler.loop();
}

function mousePressed() {
    soundtrack.allowed = true;
    ui.updateButtons(mouseX, mouseY);
}

function keyPressed() {
    if (keyCode == "69") {
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

    if (keyCode == "85") {
        if (core.options['debug'] == true) {
            core.options['debug'] = false;
        } else {
            core.options['debug'] = true;
        }

    }

    if (keyCode == "86") {
        vessel.texture = textureHandler.getVessel();
    }
    if (keyCode == "77") {
        player.texture = textureHandler.getMother();
    }

    if (keyCode == "73") {
        if (ui.getInventory().active == true) {
            ui.getInventory().active = false;
        } else {
            ui.getInventory().active = true;
        }
    }
}