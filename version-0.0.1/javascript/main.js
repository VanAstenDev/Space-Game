const cam = new Cam(0, 0, 1);
const ui = new UIHandler();
const core = new Core();

let scifiFont, bitFont, bitFont2;

let chunkLoader; //chunk loader

let bg; //background

//Import textures

let vesselTexture;
let motherTexture;

let player; //player
let vessel; //exploration vessel

let enemies = []; //enemies

let planet; //test planet

let questHandler; //quest loader

let textureHandler;

let soundtrack;

let radar;

function preload() {
    scifiFont = loadFont("javascript/assets/fonts/ethnofont.ttf");
    bitFont = loadFont("javascript/assets/fonts/8bit.ttf");
    bitFont2 = loadFont("javascript/assets/fonts/8bit2.ttf");
}

function setup() {
    createCanvas(innerWidth, innerHeight);

    textFont(bitFont2);

    textureHandler = new TextureHandler();

    soundtrack = new SoundObject("javascript/assets/sounds/maintheme.ogg");

    //load vessel textures
    for (let i = 0; i < core.vessels.length; i++) {
        textureHandler.addTexture(loadImage("javascript/assets/ship_textures/" + core.vessels[i] + ".png"), "vessel");
    }

    //load enemy textures
    for (let i = 0; i < core.enemyVessels.length; i++) {
        textureHandler.addTexture(loadImage("javascript/assets/ship_textures/" + core.enemyVessels[i] + ".png"), "enemy");
    }

    //load mother textures
    for (let i = 0; i < core.mothers.length; i++) {
        textureHandler.addTexture(loadImage("javascript/assets/ship_textures/" + core.mothers[i] + ".png"), "mother");
    }

    //load character textures
    for (let i = 0; i < core.alienCharacters.length; i++) {
        textureHandler.addTexture(loadImage("javascript/assets/alienCharacters/"+core.alienCharacters[i]+".png"), "character");
    }

    //load player texture
    textureHandler.addTexture(loadImage("javascript/assets/characters/"+core.player+".png"), "player");

    textureHandler.getPlanetTextures();
    textureHandler.getBackdropTextures();

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

    let randomChunk = Math.floor(Math.random() * chunkLoader.chunks.length);
    let randomPoint = chunkLoader.chunks[randomChunk].getRandomPoint();

    player = new Player(randomPoint.x, randomPoint.y);
    vessel = new Vessel(player.pos.x, player.pos.y);

    radar = new Radar(0.1);

    // randomPoint = chunkLoader.chunks[Math.floor(Math.random()*chunkLoader.chunks.length)].getRandomPoint();



    // let alert = new UIAlert("Test", "This is a test message.");
    // ui.addElement(alert);

    let alphaNotification = new PText(core.buildOptions['gameName'] + " | Build " + core.buildOptions['version'] + " (" + core.buildOptions['important'] + ") Controls: i", 0, 0);
    ui.addElement(alphaNotification);

    // let dialogue = new DialogueBox("left", "right");
    // dialogue.addLine(new VoiceLine("left", "Line 1 in dialogue", 50));
    // dialogue.addLine(new VoiceLine("right", "Line 2 in dialogue", 50));
    // dialogue.addLine(new VoiceLine("left", "Line 3 in dialogue", 50));
    // dialogue.addLine(new VoiceLine("right", "Line 4 in dialogue", 50));
    // dialogue.addLine(new VoiceLine("left", "Line 5 in dialogue", 50));
    // ui.addElement(dialogue);

    let dialogue = new DialogueBox("PLAYER", "ALIEN", textureHandler.getPlayer(), textureHandler.getAlien());
    dialogue.addLine(new VoiceLine("right", "This is a test dialogue situation.", 80));
    dialogue.addLine(new VoiceLine("left", "Oh is it?", 80));
    dialogue.addLine(new VoiceLine("right", "Yep, now go fly around aimlessly!", 80));
    dialogue.addLine(new VoiceLine("left", "Ok...", 80));
    ui.addElement(dialogue);

    let fpscounter = new FPSCounter();
    ui.addElement(fpscounter);

    let dashboard = new Dashboard();
    ui.addElement(dashboard);

    let controls = new ControlsUI();
    ui.addElement(controls);

    let shipinfo = new ShipInformation();
    ui.addElement(shipinfo);

    //add random location quest (with dialogue ending)
    let randomPos = chunkLoader.chunks[Math.floor(Math.random() * chunkLoader.chunks.length)].getRandomPoint();
    let ob = new Objective(1, "Go to " + Math.floor(randomPos.x) + ", " + Math.floor(randomPos.y));
    let quest = new LocationQuest("Pathfinder", ob, randomPos);

    let d = new DialogueBox("You", "Mister Man", textureHandler.getPlayer(), textureHandler.getAlien());
    d.addLine(new VoiceLine("right", "Ah, I see you have reached the location.", 60));
    d.addLine(new VoiceLine("right", "I am Mister Man, ruler of the WATERKWARTIER galaxy.", 60));
    d.addLine(new VoiceLine("right", "Will you help me by murdering innocent children?", 60));
    d.addLine(new VoiceLine("left", "Tuurlijk pik waar zijn ze?", 80));
    quest.addDialogue(d);
    
    questHandler.addQuest(quest);

    //kill 5 enemies quest
    // let quest = new TriggerQuest("Genocide", new Objective(5, "Kill 5 enemies."));
    // questHandler.addQuest(quest);

    //BANNER
    // let banner = new Banner("Test Banner!");
    // ui.addElement(banner);

    //ADDING A BUTTON
    // let button = new Button(width/2, height/2, "Click Me!", "1");
    // ui.addElement(button);
    // ui.buttons.push(button);
    // let rp = chunkLoader.chunks[vessel.chunk].getRandomPoint();

    // patrol = new Patrol(vessel.pos.x, vessel.pos.y, 2, 5);
    // patrol.generate();
}

function windowResized() {
    resizeCanvas(innerWidth, innerHeight);
}

let bullets = [];

let cd = 0;
let loopCooldown = 10;

function draw() {
    cam.update();

    frameRate(35);
    translate(cam.x, cam.y);
    background(10);
    chunkLoader.loop();

    // bg.drawBackground();
    for (let i = 0; i < enemies.length; i++) {
        enemies[i].loop();
    }

    for (let i = enemies.length - 1; i > 0; i--) {
        if (enemies[i].dead) {
            enemies.splice(i, 1);
            questHandler.trigger("Genocide");
        }
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



    if (vessel.dead) {
        let b = new Banner("YOU DIED!");
        ui.addElement(b);
    } else {
        if (player.isVessel) {
            player.loop();
            vessel.loop();
        } else {
            vessel.loop();
            player.loop();
        }
    }

    ui.display();

    cd++;
    if (cd > loopCooldown) {
        secondaryLoop();
        cd = 0;
    }
    radar.generate();

    radar.display();

    questHandler.loop();

}

function secondaryLoop() {
    soundtrack.check();
    chunkLoader.tempUpdate();
}

function mousePressed() {
    soundtrack.allowed = true;
    ui.updateButtons(mouseX, mouseY);
}

function keyPressed() {
    if (keyCode == "69") { // E
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

    if (core.playerOptions['shootingAllowed'] && player.isVessel) {
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

    if (keyCode == "79") {
        if (ui.getShipinfo().active == true) {
            ui.getShipinfo().active = false;
        } else {
            ui.getShipinfo().active = true;
        }
    } 
}