class MainMenu {
    constructor() {
        this.type = "mainmenu";
    }

    display() {
        push();
        translate(-cam.x, -cam.y);
        stroke(core.uiOptions['accentColor'].r, core.uiOptions['accentColor'].g, core.uiOptions['accentColor'].b)

        //main window
        fill(30);
        rect(0, 0, innerWidth, innerHeight);

        //title
        fill(235);
        noStroke();
        textSize(84);
        textAlign(CENTER, CENTER);
        text(core.buildOptions['gameName'], 0, 0, innerWidth, 200);

        //subtitle
        textSize(40);
        textAlign(CENTER, CENTER);
        text("Click anywhere to start!", 0, 0, innerWidth, innerHeight);

        pop();
    }
}