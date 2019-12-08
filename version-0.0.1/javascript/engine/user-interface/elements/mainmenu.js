class MainMenu {
    constructor() {
        this.type = "mainmenu";
    }

    display() {
        push();
        translate(-cam.x, -cam.y);

        //main window
        fill(30);
        rect(0, 0, innerWidth, innerHeight);

        //title
        fill(235);
        noStroke();
        textSize(84);
        textAlign(CENTER, CENTER);
        text("Space Exploration Game", 0, 0, innerWidth, 200);

        //subtitle
        textSize(40);
        textAlign(CENTER, CENTER);
        text("Click anywhere to start!", 0, 0, innerWidth, innerHeight);

        pop();
    }
}