class Planet {
    constructor(x, y) {
        this.pos = createVector(x, y);

        this.r = random() * 250;

        this.buffer = this.r/5;
    }

    loop() {
        this.update();
        this.render();
    }

    update() {
        //check vessel
        if (vessel.pos.dist(this.pos) < this.r - this.buffer) {
            //PLANET UI POPS UP HERE!
            let a = new UIAlert("Planet", "You entered a planet.");
            ui.addElement(a);
        }
    }

    render() {
        push();
        translate(this.pos.x, this.pos.y);
        fill(255);
        noStroke();
        ellipse(0, 0, this.r);

        //emissive ring
        fill(0,0,255,100);
        noStroke();
        ellipse(0, 0, this.r + this.buffer);
        pop();
    }
}