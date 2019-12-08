class Dashboard {
    constructor() {
        this.type = "dashboard";

        this.color = core.uiOptions['mainColor'];
        this.accentColor = core.uiOptions['accentColor'];
    }

    display() {
        push();
        noStroke();
        
        translate(-cam.x + (width - 320), -cam.y-40);

        //TITLE part
        fill(this.accentColor.r, this.accentColor.g, this.accentColor.b);
        rect(50, 50, 200, 50);

        textSize(30);
        fill(255);
        text("Dashboard", 50, 50, 200, 50);

        //MAIN information
        fill(this.color.r, this.color.g, this.color.b);
        rect(50, 100, 200, 60);

        textSize(26);
        fill(255);
        let v = "";
        if (player.isVessel) {
            v = "Exploration Vessel (HP: "+vessel.health+")";
        } else {
            v = "The Mothership (HP: "+vessel.health+")";
        }
        text(v, 50, 100, 200, 200);

        //coords
        fill(this.color.r, this.color.g, this.color.b);
        rect(50, 160, 200, 60);

        textAlign(CENTER);
        textSize(26);
        fill(255);
        let motherShipCoords = "[" + chunkLoader.chunks[player.chunk].r + ":" + chunkLoader.chunks[player.chunk].c + "]"
        let vesselCoords = "[" + chunkLoader.chunks[vessel.chunk].r + ":" + chunkLoader.chunks[vessel.chunk].c + "]";
        text("Mothership " + motherShipCoords, 25, 160, 250, 220);
        text("Vessel " + vesselCoords, 25, 185, 250, 220);

        //quest log
        fill(this.color.r, this.color.g, this.color.b);
        rect(50, 220, 200, 100);

        textSize(20);
        fill(255);
        let questName = player.quest.name;
        let questObjective = player.quest.objective.task+" ("+player.quest.objective.current+")";
        textAlign(CENTER);
        text("Quest: "+questName, 50, 220, 200, 40);
        text("Objective: "+questObjective, 50, 250, 200, 80);

        pop();
    }
}