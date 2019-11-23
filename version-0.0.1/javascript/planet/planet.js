class Planet {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    loop() {
        this.update();
        this.render();
    }

    update() {

    }

    render() {
        push();
        translate(-cam.x, -cam.y);
        fill(255);
        noStroke();
        // FINISH THIS
    }
}