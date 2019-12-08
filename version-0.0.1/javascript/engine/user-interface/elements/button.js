class Button {
    constructor(x, y, text, identifier) {
        this.x = x;
        this.y = y;
        this.text = text;
        this.identifier = identifier;

        this.type = "button";

        this.width = 120;
        this.height = 30;

        this.color = core.uiOptions['mainColor'];

        this.active = false;
    }

    check(x, y) {
        this.active = false;

        if (x > this.x && x < this.x + this.width) {
            if (y > this.y && y < this.y + this.height) {
                return true;
            }
        }
    }

    display() {
        push();
        noStroke();
        translate(-cam.x + this.x, -cam.y + this.y);
        fill(this.color.r, this.color.g, this.color.b);
        rect(0,0,120,30);

        //text
        fill(255);
        textSize(26);
        textAlign(CENTER);
        text(this.text, 0,0,120,300);
        pop();
    }
}