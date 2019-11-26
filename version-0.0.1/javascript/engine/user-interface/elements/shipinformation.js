class ShipInformation {
    constructor() {
        this.type = "shipinformation";
        this.active = false;

        this.width = 500;
        this.height = 100;
    }

    display() {
        if (this.active) {
            push();
            translate(vessel.pos.x+this.width/2, vessel.pos.y-this.height);
            fill(50, 100);
            rectMode(CENTER);
            rect(0, 0, this.width, this.height);

            textSize(24);
            textAlign(CENTER);
            fill(200, 0, 0);
            text("Exact Position: "+Math.floor(vessel.pos.x)+", "+Math.floor(vessel.pos.y)+"\nDistance to mothership: "+Math.floor(vessel.pos.dist(player.pos))+" (Max: "+Math.floor(vessel.maxDistanceToMother)+")\nVel Mult: "+(vessel.velMult).toFixed(2), 0, 0, this.width, this.height);

            pop();
        }
    }
}