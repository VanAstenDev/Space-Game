class Planet {
    constructor(x, y) {
        this.pos = createVector(x, y);

        // this.r = random() * 250;
        // this.r = map(random(), 0, 1, 150, 300);
        this.r = 190;

        this.buffer = this.r / 6;

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
    }

    render() {
        push();
        translate(this.pos.x, this.pos.y);


        if (core.options['debug']) {
            fill(255, 100);
            noStroke();
            ellipse(0, 0, this.r);
        } else {
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