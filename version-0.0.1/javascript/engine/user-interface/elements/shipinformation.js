class ShipInformation {
    constructor() {
        this.type = "shipinformation";
        this.active = false;

        this.width = 500;
        this.height = 150;

        this.color = core.uiOptions['mainColor'];
        this.accentColor = core.uiOptions['accentColor'];
    }

    display() {
        if (this.active) {
            push();
            translate(vessel.pos.x+this.width/2, vessel.pos.y-this.height);
            fill(this.accentColor.r, this.accentColor.g, this.accentColor.b);

            rectMode(CENTER);
            rect(0, 0, this.width, 50);

            fill(255);
            textSize(20);
            textAlign(CENTER);
            text("Ship Information", 0, 0, this.width, 50);

            fill(this.color.r, this.color.g, this.color.b);
            rectMode(CENTER);
            rect(0, 50, this.width, this.height-50);

            textSize(24);
            textAlign(CENTER);
            fill(255);
            text("Exact Position: "+Math.floor(vessel.pos.x)+", "+Math.floor(vessel.pos.y)+"\nVessel Fuel: "+(vessel.fuel).toFixed(2)+"/"+vessel.maxFuel+"\nMothership Fuel: "+(player.fuel).toFixed(2)+"/"+player.maxFuel, 0, 50, this.width, this.height-50);

            pop();
        }
    }
}