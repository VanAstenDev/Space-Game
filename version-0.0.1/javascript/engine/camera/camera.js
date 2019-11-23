class Cam {
    constructor(x, y, zoom) {
        this.x = x;
        this.y = y;
        this.zoom = zoom;

        this.dZoom = this.zoom;
        this.zoomSteps = 0.05;
    }
    
    update() {
        if (player.isVessel) {
            this.dZoom = 2;

            this.x = (-vessel.pos.x) + width/2;
            this.y = (-vessel.pos.y) + height/2;
        }
        if (!player.isVessel) {
            this.dZoom = 1;
        }

        if (this.zoom < this.dZoom) {
            this.zoom += this.zoomSteps;
        }
        if (this.zoom > this.dZoom) {
            this.zoom -= this.zoomSteps;
        }
    }
}