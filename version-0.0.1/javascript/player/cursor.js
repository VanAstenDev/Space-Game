class Cursor {
    constructor() {
        this.pos = createVector(mouseX, mouseY);
    }

    loop() {
        this.update();
        this.display();
    }

    update() {
        this.pos.x = mouseX;
        this.pos.y = mouseY;
    }

    display() {
        push();
        //draw target
        // fill(0,255,0);
        noFill();
        stroke(0, 255, 0);
        strokeWeight(3);
        ellipse(-cam.x + mouseX, -cam.y + mouseY, 25);

        pop();
    }

    check(pos, r) {
        let v = createVector(this.pos.x - cam.x, this.pos.y - cam.y);
        if (pos.dist(v) <= r) {
            return true;
        }
    }
}