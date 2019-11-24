class Planet {
    constructor(x, y) {
        this.pos = createVector(x, y);

        // this.r = random() * 250;
        this.r = map(random(), 0, 1, 150, 300);

        this.buffer = this.r / 3;

        this.triggerCD = 200;
        this.cd = 0;

        this.texture = textureHandler.getPlanetTexture();
    }

    loop() {
        this.update();
        this.render();
    }

    update() {
        this.cd--;
        //check vessel
        if (vessel.pos.dist(this.pos) < this.r / 1.2 - this.buffer) {
            //PLANET UI POPS UP HERE!
            // let a = new UIAlert("Planet", "You entered a planet.");
            // ui.addElement(a);

            //update "Explorer" quest
            if (this.cd <= 0) {
                questHandler.trigger("Explorer");
                this.cd = this.triggerCD;
            }
        }
    }

    render() {
        push();
        translate(this.pos.x, this.pos.y);
        // fill(255, 100);
        // noStroke();
        // ellipse(0, 0, this.r);

        imageMode(CENTER);
        image(this.texture, 0, 0, Math.floor(this.r*5), Math.floor(this.r*5));

        //emissive ring
        if (core.options['debug']) {
            fill(0, 0, 255, 100);
            noStroke();
            ellipse(0, 0, this.r + this.buffer);
        }
        pop();
    }
}