class Radar {
    constructor() {

        this.width = 200;
        this.height = 200;

        this.gw = this.width / (chunkLoader.totalWidth/chunkLoader.chunkWidth);
        this.gh = this.height / (chunkLoader.totalHeight/chunkLoader.chunkHeight);
    }

    generate() {
        this.v = {
            x: map(vessel.pos.x, 0, chunkLoader.totalWidth, 0, this.width),
            y: map(vessel.pos.y, 0, chunkLoader.totalHeight, 0, this.height)
        }

        this.m = {
            x: map(player.pos.x, 0, chunkLoader.totalWidth, 0, this.width),
            y: map(player.pos.y, 0, chunkLoader.totalHeight, 0, this.height)
        }
    }

    getVector(vector) {
        return createVector(map(vector.x, 0, chunkLoader.totalWidth, 0, this.width), map(vector.y, 0, chunkLoader.totalHeight, 0, this.height));
    }

    drawPoint(vector) {
        push();
        translate(-cam.x, (-cam.y+height)-this.height);
        fill(255);
        ellipse(vector.x, vector.y, 10);
        pop();
    }

    drawEnemy(vector) {
        push();
        translate(-cam.x, (-cam.y+height)-this.height);
        fill(255, 0, 0, 200);
        ellipse(vector.x, vector.y, 10);
        pop();
    }

    display() {
        push();
        translate(-cam.x,(-cam.y+height)-this.height);
        //draw grid
        // for (let r = 0; r < chunkLoader.rows; r++) {
        //     for (let c = 0; c < chunkLoader.columns; c++) {
        //         fill(255);
        //         rect(r * this.gw, c * this.gh, this.gw, this.gh);
        //     }
        // }

        //draw pos's
        fill(50);
        stroke(255, 100);
        rect(0, 0, this.width, this.height);
        fill(0,255,0);
        ellipse(this.m.x, this.m.y, 20);
        fill(255, 0, 0);
        ellipse(this.v.x, this.v.y, 10);
        pop();

    }
}