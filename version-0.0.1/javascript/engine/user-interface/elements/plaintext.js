class PText {
    constructor(message, x, y) {
        this.message = message;
        this.x = x;
        this.y = y;
    }

    display() {
        push();
        translate(-cam.x + this.x, -cam.y - this.y);

        fill(255);
        noStroke();
        rect(0, 0, 480, 20);

        textSize(20);
        fill(50);
        noStroke();
        text(this.message, 0, 0, 480, 100);
        pop();
    }
}