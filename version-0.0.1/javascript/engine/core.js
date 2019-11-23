class Core {
    constructor() {
        this.stars = [];
        this.starSize = 1;
        this.dStarSize = this.starSize;
    }

    generateBackground(n) {
        this.stars = [];
        for (let i = 0; i < n; i++) {
            let star = createVector(random()*width, random()*height);
            this.stars.push(star);
        }
    }

    drawBackground() {
        push();
        translate(0, 0);
        fill(0);
        noStroke();
        rect(0, 0, width, height);
        pop();
        this.dStarSize = this.starSize * cam.zoom;
        for (let i = 0; i < this.stars.length; i++) {
            push();
            translate(this.stars[i].x, this.stars[i].y);
            stroke(255);
            fill(255);
            ellipse(0, 0, this.dStarSize);
            pop();
        }
    }
}