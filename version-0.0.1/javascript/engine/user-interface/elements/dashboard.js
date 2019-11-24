class Dashboard {
    constructor() {

    }

    display() {
        push();
        translate(-cam.x + (width - 300), -cam.y);
        
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
        rect(50,160,200,200);

        textSize(20);
        fill(20);
        let motherShipCoords = "["+cl.chunks[player.chunk].r+":"+cl.chunks[player.chunk].c+"]"
        let vesselCoords = "["+cl.chunks[vessel.chunk].r+":"+cl.chunks[vessel.chunk].c+"]";
        text("Mothership "+motherShipCoords, 50, 160, 250, 200);
        text("Vessel "+vesselCoords, 50, 185, 250, 200);

        pop();
    }
}