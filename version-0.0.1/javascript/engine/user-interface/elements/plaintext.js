class PText {
    constructor(message, x, y) {
        this.message = message;
        this.x = x;
        this.y = y;
    }

    display() {
        push();
        translate(-cam.x + this.x, -cam.y - this.y);
        textSize(14);
        fill(150);
        noStroke();
        text(this.message, 0, 0, 400, 50);
        pop();
    }
}