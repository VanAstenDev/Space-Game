class SmokeParticle {
    constructor(x, y, size) {
        this.pos = createVector(x, y);
        this.size = size;
        this.lifespan = 255;
    }

    display() {
        push();
        // translate(cam.x + this.pos.x, cam.y + this.pos.y);
        translate(this.pos.x -cam.x, this.pos.y -cam.y);

        rect(0,0, 100, 100);

        fill(180, 50);
        noStroke();
        ellipse(0, 0, this.size);

        pop();
    }
}