class Planet {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.name = core.getPlanetName();

        // this.r = random() * 250;
        // this.r = map(random(), 0, 1, 150, 300);
        this.r = 190;

        this.buffer = this.r / 6;

        this.triggerCD = 200;
        this.cd = 0;

        this.triggerDistance = 100;
        this.triggered = 1;
        this.cooldown = 500;
        this.current = 0;

        this.texture = textureHandler.getPlanetTexture();
        this.type = planetHandler.getType();
    }

    loop() {
        this.update();
        this.render();
    }

    update() {
        this.cd--;
        this.current++;
        if (this.current >= this.cooldown) {
            this.current = 0;
            this.triggered = 0;
        }
        //check vessel
        if (player.pos.dist(this.pos) <= this.triggerDistance) {
            if (this.type == "gas_planet") {
                player.fuel += 0.01;
                if (player.fuel >= player.maxFuel) {
                    player.fuel = player.maxFuel;
                }
            }
            if (this.type == "guild_planet") {
                if (!this.triggered) {
                    //TODO: GIVE RANDOMLY GENERATED QUEST 
                }
            }
        }

        //check cursor
        if (cursor.check(this.pos, this.r/2)) {
            let b = new Banner("Planet Type: "+this.type, 10, true);
            ui.addElement(b);
        }
    }

    render() {
        push();
        translate(this.pos.x, this.pos.y);


        if (core.options['debug']) {
            fill(255, 100);
            noStroke();
            ellipse(0, 0, this.r);
        } else if (this.texture != undefined) {
            imageMode(CENTER);
            image(this.texture, 0, 0);
        }



        //emissive ring
        if (core.options['debug']) {
            // fill(255, 255, 255, 100);
            // noStroke();
            noFill();
            stroke(0, 0, 255, 255);
            ellipse(0, 0, this.r + this.buffer);
        }
        pop();
    }
}