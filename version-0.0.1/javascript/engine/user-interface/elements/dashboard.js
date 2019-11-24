class Dashboard {
    constructor() {

    }

    display() {
        push();
        noStroke();
        
        translate(-cam.x + (width - 320), -cam.y-40);

        //TITLE part
        fill(50);
        rect(50, 50, 200, 50);

        textSize(40);
        fill(255);
        text("Dashboard", 50, 50, 200, 50);

        //MAIN information
        fill(200);
        rect(50, 100, 200, 60);

        textSize(24);
        fill(50);
        let v = "";
        if (player.isVessel) {
            v = "Exploration Vessel";
        } else {
            v = "The Mothership";
        }
        text(v, 50, 100, 200, 200);

        //coords
        fill(150);
        rect(50, 160, 200, 60);

        textAlign(CENTER);
        textSize(20);
        fill(20);
        let motherShipCoords = "[" + chunkLoader.chunks[player.chunk].r + ":" + chunkLoader.chunks[player.chunk].c + "]"
        let vesselCoords = "[" + chunkLoader.chunks[vessel.chunk].r + ":" + chunkLoader.chunks[vessel.chunk].c + "]";
        text("Mothership " + motherShipCoords, 50, 160, 250, 220);
        text("Vessel " + vesselCoords, 50, 185, 250, 220);

        //quest log
        fill(50);
        rect(50, 220, 200, 100);

        textSize(20);
        fill(150);
        let questName = player.quest.name;
        let questObjective = player.quest.objective.task+" ("+player.quest.objective.current+")";
        textAlign(CENTER);
        text("Quest: "+questName, 50, 220, 200, 40);
        text("Objective: "+questObjective, 50, 250, 200, 80);

        pop();
    }
}