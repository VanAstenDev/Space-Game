class FPSCounter {
    constructor() {
        this.message = Math.floor(frameRate());

        this.type = "fpscounter";

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
        textSize(30);
        fill(255, 0, 0);
        noStroke();
        text(this.message+" frames (Avg: "+avgfps+")", -250, 0, 400, 200);

        let ac = chunkLoader.getActive();
        textSize(30);
        text("Active Chunks: "+ac, -250, 35, 400, 300);

        textSize(30);
        text("Dimensions: "+chunkLoader.totalWidth+"x"+chunkLoader.totalHeight, -250, 65, 400, 300);

        pop();
    }
}