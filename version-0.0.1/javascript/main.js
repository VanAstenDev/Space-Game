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

    // add enemy
    // let ePos = chunkLoader.chunks[randomChunk].getRandomPoint();
    // let e = new Enemy(ePos.x, ePos.y);
    // e.addOnDead(()=>{
    //     let d = new DialogueBox("You", "WKY", textureHandler.getPlayer(), textureHandler.getAlien());
    //     d.addLine(new VoiceLine("right", "You got him good, captain!", core.options['defaultDialogueDelay']));
    //     ui.addElement(d);
    // })
    // enemies.push(e);

    //initialize ALL items

    //add traders guild (MAX)
    let tg = new Guild("Traders Union");
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
            ob.addDesc("Pick up the resources from the first planet.");
            let quest = new LocationQuest("Trade Mission: Part One", ob, planet1.pos);
            quest.addOnFinished(() => {
                //dialogue
                let d = new DialogueBox("You", "Trade Master", textureHandler.getPlayer(), textureHandler.getAlien(5));
                d.addLine(new VoiceLine("right", "Good job, now travel to the delivery planet", core.options['defaultDialogueDelay']));

                d.addOnFinished(() => {
                    let planet2 = chunkLoader.getPlanet();
                    //travel to planet 2
                    let ob = new Objective(1, "Travel to " + planet2.name);
                    ob.addDesc("Deliver the resources to the second planet.");
                    let quest = new LocationQuest("Trade Mission: Part Two", ob, planet2.pos);
                    quest.addOnFinished(() => {
                        //dialoge
                        let d = new DialogueBox("You", "Trade Master", textureHandler.getPlayer(), textureHandler.getAlien(5));
                        d.addLine(new VoiceLine("right", "Well done, adventurer! Here is your payment.", core.options['defaultDialogueDelay']));
                        d.addOnFinished(() => {
                            player.money += 100;
                            let u = new UIAlert("Money Received", "You've received 100 " + core.buildOptions['currencyName']);
                            ui.addElement(u);
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
    // player.guild = tg;

    //Red moon's guild (TIMO)
    let rmg = new Guild("Red Moon");
    rmg.addQuestGenerator(() => {
        let d = new DialogueBox(player.name, "the Count", textureHandler.getPlayer(), textureHandler.getAlien(6));
        d.addLine(new VoiceLine("right", "Greetings, traveller. Are you looking for a job?, there is a relic you can retrieve for us.", core.options['defaultDialogueDelay']));
        d.addLine(new VoiceLine("left", "Yes.", core.options['defaultDialogueDelay']))
        let names = ["First Moon Amulet Shard"]; //TODO: COOLE NAAMEN
        let name = names[Math.floor(Math.random() * names.length)];
        d.addLine(new VoiceLine("right", "There is an ancient relic, the " + name + ", We have located it.", core.options['defaultDialogueDelay']));
        d.addLine(new VoiceLine("right", "Would you retrieve it for us? We will reward you handsomely.", core.options['defaultDialogueDelay']));

        //set player quest data
        player.questData['relic_name'] = name;

        d.addOnFinished(() => {
            // let planet1 = player.questData['planet'];
            let planet1 = chunkLoader.getPlanet();

            let ob = new Objective(1, "Travel to " + planet1.name + " to retrieve the " + player.questData['relic_name']);
            ob.addDesc("Travel to " + planet1.name + " and retrieve the " + player.questData['relic_name'] + " for the Count.");
            let quest = new LocationQuest("Retrieval for the Count", ob, planet1.pos);
            quest.addOnFinished(() => {
                let ob = new Objective(1, "Bring the " + player.questData['relic_name'] + " back to the Count.");
                ob.addDesc("Bring the " + player.questData['relic_name'] + " back to the Count and his followers.");
                let quest = new LocationQuest("Turn in the " + player.questData['relic_name'], ob, player.questData['planet'].pos);
                quest.addOnFinished(() => {
                    let d = new DialogueBox(player.name, "the Count", textureHandler.getPlayer(), textureHandler.getAlien(6));
                    d.addLine(new VoiceLine("right", "Thank you, traveller! Now that the " + player.questData['relic_name'] + " is back in our power,", core.options['defaultDialogueDelay']));
                    d.addLine(new VoiceLine("right", "we are one step closer to completing the Amulet. This will not be forgotten.", core.options['defaultDialogueDelay']));
                    d.addOnFinished(() => {
                        player.money += 100;
                        let u = new UIAlert("Money Received", "You've received 100 " + core.buildOptions['currencyName']);
                        ui.addElement(u);
                    })
                    ui.addElement(d);
                })
                questHandler.setQuest(quest);
            })
            questHandler.setQuest(quest);
        })
        ui.addElement(d);
    });
    player.guild = rmg;

    //test item voor iedereen

    // let item = new Item("mothership_teleport", "Mothership Teleport");
    // item.addUse(()=>{
    //     vessel.pos = player.pos.copy();
    //     let u = new Banner("Teleported to mothership!");
    //     ui.addElement(u);
    // })
    // itemContainer.addItem(item);

    // let itemstack = new ItemStack(item, 5);

    // player.inventory.addItemStack(itemstack);

    //einde test item

    radar = new Radar(0.1); //init class
    radar.active = false;

    let alphaNotification = new PText(core.buildOptions['gameName'] + " | Build " + core.buildOptions['version'] + " (" + core.buildOptions['important'] + ") Controls: C", 0, 0);
    ui.addElement(alphaNotification);

    // //TUTORIAL QUEST
    // let name = "The Instructor";
    // let d = new DialogueBox(player.name, name, textureHandler.getPlayer(), textureHandler.getAlien(5));
    // //movement
    // d.addLine(new VoiceLine("right", "Welcome to Space Exploration Game! I am " + name + " and I am here to teach you the basics of space exploration.", core.options['defaultDialogueDelay']));
    // d.addLine(new VoiceLine("right", "Let's start with basic movement, press W to accelerate, A to turn left and D to turn your ship right", core.options['defaultDialogueDelay'] * 2));
    // //detaching
    // d.addLine(new VoiceLine("right", "Every mothership contains a smaller ship called the exploration vessel, you can enter your vessel by pressing E", core.options['defaultDialogueDelay']));
    // d.addLine(new VoiceLine("right", "To get back in your mothership just enter the green circle and press E again.", core.options['defaultDialogueDelay'] * 2));
    // //fuel
    // d.addLine(new VoiceLine("right", "Your ships lose fuel when you move, try opening the ship information panel by pressing O", core.options['defaultDialogueDelay'] * 2));
    // d.addLine(new VoiceLine("right", "Your exploration vessel refuels automatically when attached to the mothership.", core.options['defaultDialogueDelay']));
    // d.addLine(new VoiceLine("right", "To refuel your mothership you will have to interact with a gas planet, hover over planets to see their type.", core.options['defaultDialogueDelay'] * 2));
    // d.addLine(new VoiceLine("right", "Refueling costs " + core.gameOptions['fuelCost'] + " per unit of fuel.", core.options['defaultDialogueDelay']));
    // //money
    // d.addLine(new VoiceLine("right", "To earn money you can complete quests.", core.options['defaultDialogueDelay']));
    // //quest
    // d.addLine(new VoiceLine("right", "Currently you can only accept guild quests, these are quests that are randomly generated based on your guild.", core.options['defaultDialogueDelay']));
    // d.addLine(new VoiceLine("right", "To get a guild quest, go to any guild planet and interact with it.", core.options['defaultDialogueDelay']));
    // //guilds
    // d.addLine(new VoiceLine("right", "Currently you are in the red moon guild because that is the guild that is currently being implemented so far.", core.options['defaultDialogueDelay']));
    // d.addLine(new VoiceLine("right", "Have fun playing our game!", core.options['defaultDialogeDelay']));

    // d.addOnFinished(() => {
    //     player.inTutorial = false;
    // })

    player.inTutorial = false;

    // ui.addElement(d);

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

    for (let i = enemies.length - 1; i >= 0; i--) {
        if (enemies[i].dead) {
            enemies[i].onDead();
            enemies.splice(i, 1);
            // questHandler.trigger("Genocide");
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

    if (core.playerOptions['shootingAllowed'] && player.isVessel) {
        vessel.shoot();
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

    // if (core.playerOptions['shootingAllowed'] && player.isVessel) {
    //     if (keyCode == ENTER) {
    //         vessel.shoot();
    //     }
    // }

    if (keyCode == "16") { //shift
        //check if player is mothership
        if (!player.isVessel) {
            //toggle boosting
            if (player.boosting) {
                let u = new Banner("Disengaging Engine Boost");
                u.lifespan = 200;
                ui.addElement(u);
                player.boosting = false;
                player.fuelUsage = core.playerOptions['fuelUsage'];
            } else {
                let u = new Banner("Engaging Engine Boost");
                u.lifespan = 200;
                ui.addElement(u);
                player.boosting = true;
                player.fuelUsage = core.playerOptions['boostingFuelUsage'];
            }
        }
    }

    if (keyCode == "82") {
        if (radar.active) {
            radar.active = 0;
        } else {
            radar.active = 1;
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