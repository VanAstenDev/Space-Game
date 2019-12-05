class Banner {
    constructor(text, lifespan, noAlphaDecay) {
        this.text = text;
        this.width = 650;
        this.height = 75;

        this.type = "banner";

        if (noAlphaDecay) {
            this.noAlphaDecay = true;
        }

        if (lifespan != undefined) {
            this.lifespan = lifespan;
        } else {
            this.lifespan = 100;
        }
    }

    display() {
        let alpha = map(this.lifespan, 0, 100, 0, 255);

        if (this.noAlphaDecay) {
            alpha = 255;
        }

        push();
        noStroke();
        translate(-cam.x + (width / 2 - this.width / 2), -cam.y + 50);
        //box
        fill(30, alpha);
        rect(0, 0, this.width, this.height);

        //text
        fill(255, alpha);
        textAlign(CENTER, CENTER);
        textSize(40);
        text(this.text, 0, 0, this.width, this.height);
        pop();
    }
}