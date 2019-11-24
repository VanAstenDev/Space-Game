class Chunk {
    constructor(r, c, w, h) {
        this.r = r;
        this.c = c;
        this.width = w;
        this.height = h;

        this.active = false;

        this.neighbors = [];

        this.planets = [];

        this.stars = [];
    }

    loop() {
        this.update();
        this.display();
    }

    update() {
        if (this.active) {
            for (let i = 0; i < this.planets.length; i++) {
                this.planets[i].loop();
                // chunk.generateBackground(100);
            }
        }
    }

    getRandomPoint() {
        let x = map(random(), 0, 1, this.r * this.width, (this.r * this.width) + this.width);
        let y = map(random(), 0, 1, this.c * this.height, (this.c * this.height) + this.height);

        return createVector(x, y);
    }

    setNeighbors() {
        for (let i = 0; i < this.neighbors.length; i++) {
            if (this.neighbors[i] >= 0 && this.neighbors[i] < (cl.chunks.length - 1)) {
                cl.chunks[this.neighbors[i]].active = true;
            }
        }
    }

    generateBackground(n) {
        if (core.chunkOptions['stars']) {
            for (let i = 0; i < n; i++) {
                let randomPoint = this.getRandomPoint();
                let star = createVector(randomPoint.x, randomPoint.y);
                this.stars.push(star);
            }
        }
    }

    drawBackground() {
        for (let i = 0; i < this.stars.length; i++) {
            push();
            translate(this.stars[i].x, this.stars[i].y);
            fill(255);
            noStroke();
            ellipse(0, 0, 2);
            pop();
        }
    }

    display() {
        this.drawBackground();
        if (core.options['debug'] == true) {
            push();
            translate(this.r * this.width, this.c * this.height);

            //background
            fill(0, 100);
            noStroke();
            rect(0, 0, this.width, this.height);

            noFill();
            stroke(255);
            strokeWeight(3);
            rect(0, 0, this.width, this.height);
            pop();
        }
    }
}