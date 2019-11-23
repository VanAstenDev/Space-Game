class Chunk {
    constructor(r, c, w, h) {
        this.r = r;
        this.c = c;
        this.width = w;
        this.height = h;

        this.active = false;

        this.neighbors = [];
    }

    loop() {
        this.update();
        this.display();
    }

    update() {
        
    }

    setNeighbors() {
        for (let i = 0; i < this.neighbors.length; i++) {
            cl.chunks[this.neighbors[i]].active = true;
        }
    }

    display() {
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