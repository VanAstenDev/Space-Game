class Cam {
    constructor(x, y, zoom) {
        this.x = x;
        this.y = y;
        this.zoom = zoom;

        this.focusPoint = {
            x: 0,
            y: 0
        };
        this.playerFocussed = true;

        this.dZoom = this.zoom;
        this.zoomSteps = 0.05;

        this.timer = 0;
    }

    update() {
        if (this.playerFocussed) {
            if (player.isVessel) {
                this.dZoom = 2;

                this.focusPoint.x = vessel.pos.x;
                this.focusPoint.y = vessel.pos.y;
            }
            if (!player.isVessel) {
                this.dZoom = 1;

                this.focusPoint.x = player.pos.x;
                this.focusPoint.y = player.pos.y;
            }
        }

        this.x = (-this.focusPoint.x) + width / 2;
        this.y = (-this.focusPoint.y) + height / 2;

        if (this.zoom < this.dZoom) {
            this.zoom += this.zoomSteps;
        }
        if (this.zoom > this.dZoom) {
            this.zoom -= this.zoomSteps;
        }
    }
}