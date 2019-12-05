const cam = new Cam(0, 0, 1);
const ui = new UIHandler();
const core = new Core();

let scifiFont, bitFont, bitFont2; // fonts

let chunkLoader; //chunk loader

let cursor;

let itemContainer; //items are stored this.addItem, createItem, getItem

let player; //player class
let vessel; //exploration vessel class

let enemies = []; //enemies 

let questHandler; //quest loader
let textureHandler; //texture handler

let soundtrack; //audio file

let radar; //radar class

function preload() { // load fonts
    scifiFont = loadFont("javascript/assets/fonts/ethnofont.ttf");
    bitFont = loadFont("javascript/assets/fonts/8bit.ttf");
    bitFont2 = loadFont("javascript/assets/fonts/8bit2.ttf");
}

function setup() {
    createCanvas(innerWidth, innerHeight);
    textFont(bitFont2); //set font to this font

    itemContainer = new ItemContainer();

    cursor = new Cursor();

    textureHandler = new TextureHandler(); //init class
    soundtrack = new SoundObject("javascript/assets/sounds/maintheme.mp3"); //init class

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
        textureHandler.addTexture(loadImage("javascript/assets/alienCharacters/" + core.alienCharacters[i] + ".png"), "character");
    }

    //load player texture (CHARACTER ICON)
    textureHandler.addTexture(loadImage("javascript/assets/characters/" + core.player + ".png"), "player");

    textureHandler.getPlanetTextures();
    textureHandler.getBackdropTextures();

    let chunks = core.options['chunks'];
    chunkLoader = new ChunkLoader(core.options['chunkWidth'], core.options['chunkHeight'], chunks, chunks); //init class
    chunkLoader.generate(); //generate chunks
    chunkLoader.findNeighbors(); //find which chunks are neighbors of each other

    questHandler = new QuestHandler(); //init class

    //initialize player at random location
    let randomChunk = Math.floor(Math.random() * chunkLoader.chunks.length);
    let randomPoint = chunkLoader.chunks[randomChunk].getRandomPoint();

    player = new Player(randomPoint.x, randomPoint.y);
    vessel = new Vessel(player.pos.x, player.pos.y);

    radar = new Radar(0.1); //init class

    let alphaNotification = new PText(core.buildOptions['gameName'] + " | Build " + core.buildOptions['version'] + " (" + core.buildOptions['important'] + ") Controls: C", 0, 0);
    ui.addElement(alphaNotification);

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

    let inventoryui = new InventoryUI();
    ui.addElement(inventoryui);

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

    //add items
    itemContainer.createItem("special_home_teleport", "Mothership Warp Crystal");
    itemContainer.getItem("special_home_teleport").addUse(()=>{
        vessel.pos = player.pos.copy();
    })
    let itemStack = new ItemStack(itemContainer.getItem("special_home_teleport"), 10);
    player.inventory.addItemStack(itemStack);
}

function windowResized() {
    resizeCanvas(innerWidth, innerHeight);
}

let bullets = [];

function draw() {
    cam.update();
    cam.timer++; 

    if (cam.timer >= core.options['tempDelay']) {
        chunkLoader.unloadAll();
        cam.timer = 0;
    }

    soundtrack.check();

    

    frameRate(35); //to limit speed

    translate(cam.x, cam.y);
    background(0);
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

    cursor.loop();

    // fill(255);
    // line(player.pos.x, player.pos.y, -cam.x+mouseX, -cam.y+mouseY);

    


    radar.generate();

    radar.display();

    ui.display();


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

    if (keyCode == "67") {
        if (ui.getControls().active) {
            ui.getControls().active = false;
        } else {
            ui.getControls().active = true;
        }
    }

    if (keyCode == "73") {
        if (ui.getInventory().active) {
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