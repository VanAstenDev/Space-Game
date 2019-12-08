const cam = new Cam(0, 0, 1);
const ui = new UIHandler();
const core = new Core();

let scifiFont, bitFont, bitFont2; // fonts

let chunkLoader; //chunk loader

let cursor; //cursor

let itemContainer; //items are stored this.addItem, createItem, getItem

let player; //player class
let vessel; //exploration vessel class

let enemies = []; //enemies 

let gameStarted = 0; //check for main menu

let questHandler; //quest loader
let textureHandler; //texture handler

let planetHandler; //planet handler

let soundtrack; //audio file

let radar; //radar class

function preload() { // load fonts
    scifiFont = loadFont("javascript/assets/fonts/ethnofont.ttf");
    bitFont = loadFont("javascript/assets/fonts/8bit.ttf");
    bitFont2 = loadFont("javascript/assets/fonts/8bit2.ttf");
}

function loadUI() {
    radar.active = true;

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

    let playerInfo = new PlayerInfo();
    ui.addElement(playerInfo);
}

function setup() {
    createCanvas(innerWidth, innerHeight);
    textFont(bitFont2); //set font to this font
    itemContainer = new ItemContainer();

    cursor = new Cursor();

    let mainMenu = new MainMenu();
    ui.addElement(mainMenu);

    planetHandler = new PlanetHandler();

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
    // let randomChunk = Math.floor(Math.random() * chunkLoader.chunks.length);
    let randomChunk = chunkLoader.getChunk(chunks / 2, chunks / 2);
    let randomPoint = chunkLoader.chunks[randomChunk].getRandomPoint();

    player = new Player(randomPoint.x, randomPoint.y);
    vessel = new Vessel(player.pos.x, player.pos.y);

    //initialize ALL items

    //add traders guild
    let tg = new Guild("Traders Guild");
    tg.addQuestGenerator(() => {
        //intro dialogue
        let d = new DialogueBox("You", "Trade Master", textureHandler.getPlayer(), textureHandler.getAlien(5));
        d.addLine(new VoiceLine("right", "You've accepted a trade mission!", core.options['defaultDialogueDelay']));
        d.addLine(new VoiceLine("right", "You will travel to a planet where you will pickup some materials.", core.options['defaultDialogueDelay']));
        d.addLine(new VoiceLine("right", "You will then deliver these materials to a different planet", core.options['defaultDialogueDelay']));
        d.addLine(new VoiceLine("right", "Good luck!", core.options['defaultDialogueDelay']));

        //add quest when dialogue ends
        d.addOnFinished(() => {
            let planet1 = chunkLoader.getPlanet();
            //travel to planet 1
            let ob = new Objective(1, "Travel to " + planet1.name);
            let quest = new LocationQuest("Trade Mission: Part One", ob, planet1.pos);
            quest.addOnFinished(() => {
                //dialogue
                let d = new DialogueBox("You", "Trade Master", textureHandler.getPlayer(), textureHandler.getAlien(5));
                d.addLine(new VoiceLine("right", "Good job, now travel to the delivery planet", core.options['defaultDialogueDelay']));

                d.addOnFinished(() => {
                    let planet2 = chunkLoader.getPlanet();
                    //travel to planet 2
                    let ob = new Objective(1, "Travel to "+planet2.name);
                    let quest = new LocationQuest("Trade Mission: Part Two", ob, planet2.pos);
                    quest.addOnFinished(()=>{
                        //dialoge
                        let d = new DialogueBox("You", "Trade Master", textureHandler.getPlayer(), textureHandler.getAlien(5));
                        d.addLine(new VoiceLine("right", "Well done, adventurer! Here is your payment.", core.options['defaultDialogueDelay']));
                        d.addOnFinished(()=>{
                            player.money += 10;
                        })
                        ui.addElement(d);
                    })
                    questHandler.setQuest(quest);
                })
                ui.addElement(d);
            })
            questHandler.setQuest(quest);
        })
        ui.addElement(d);
    })
    player.guild = tg;

    radar = new Radar(0.1); //init class
    radar.active = false;

    let alphaNotification = new PText(core.buildOptions['gameName'] + " | Build " + core.buildOptions['version'] + " (" + core.buildOptions['important'] + ") Controls: C", 0, 0);
    ui.addElement(alphaNotification);
}

function windowResized() {
    resizeCanvas(innerWidth, innerHeight);
}

let bullets = [];

function draw() {
    cam.update();
    cam.timer++;

    // if (cam.timer >= core.options['tempDelay']) {
    //     chunkLoader.unloadAll();
    //     cam.timer = 0;
    // }

    soundtrack.check();

    frameRate(31); //to limit speed

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
        gameStarted = 0;
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
    radar.generate();
    radar.display();
    ui.display();
    questHandler.loop();
}

function secondaryLoop() {
    soundtrack.check();
}

function mousePressed() {
    if (gameStarted) {
        ui.updateButtons(mouseX, mouseY);
    } else {
        soundtrack.allowed = true;
        ui.disableMainMenu();
        loadUI();
        gameStarted = 1;
    }
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
            ui.getFPS().active = false;
        } else {
            core.options['debug'] = true;
            ui.getFPS().active = true;
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

    if (keyCode == "80") {
        if (ui.getPlayerInfo().active) {
            ui.getPlayerInfo().active = false;
        } else {
            ui.getPlayerInfo().active = true;
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