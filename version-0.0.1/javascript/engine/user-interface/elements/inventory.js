class Inventory {
    constructor() {
        this.width = 500;
        this.height = 500;

        this.type = "inventory";

        this.active = false;
    }

    display() {
        if (this.active) {
            push();
            translate(-cam.x + (width / 2 - this.width / 2), -cam.y + (height / 2 - this.height / 2));
            fill(50);
            //title
            rect(0, 0, this.width, 50);
            textAlign(CENTER, CENTER);
            textSize(32);
            fill(255);
            text("Inventory (i)", 0, 0, this.width, 50);

            fill(255, 200);
            rect(0, 50, this.width, this.height - 50);
            textSize(26);
            fill(50);
            textAlign(CENTER, TOP);
            text("Gold: 0\nRaw Metal: 0", 0, 50, this.width, this.height - 50);
            pop();
        }
    }
}