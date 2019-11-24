class FPSCounter {
    constructor() {
        this.message = Math.floor(frameRate());

        this.tfps = frameRate();
        this.tfreq = 1;
    }

    display() {
        this.tfps += frameRate();
        this.tfreq++;

        let avgfps = Math.floor(this.tfps/this.tfreq);

        this.message = Math.floor(frameRate());
        push();
        translate(-cam.x + (width-200), -cam.y + (height - 100));
        textSize(36);
        fill(255, 0, 0);
        noStroke();
        text(this.message+" frames (Avg: "+avgfps+")", -150, 0, 400, 200);

        let ac = cl.getActive();
        textSize(24);
        text("Active Chunks: "+ac, -150, 35, 300, 300);
        pop();
    }
}