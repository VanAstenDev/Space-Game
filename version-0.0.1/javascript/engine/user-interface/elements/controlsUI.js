class ControlsUI {
    constructor() {
        this.width = 500;
        this.height = 500;

        this.type = "controls";

        this.color = core.uiOptions['mainColor'];
        this.accentColor = core.uiOptions['accentColor'];

        this.active = false;
    }

    display() {
        if (this.active) {
            push();
            translate(-cam.x + (width / 2 - this.width / 2), -cam.y + (height / 2 - this.height / 2));
            fill(this.accentColor.r, this.accentColor.g, this.accentColor.b);
            stroke(core.uiOptions['accentColor'].r, core.uiOptions['accentColor'].g, core.uiOptions['accentColor'].b);
            //title
            rect(0, 0, this.width, 50);
            textAlign(CENTER, CENTER);
            textSize(34);
            fill(255);
            text("Controls", 0, 0, this.width, 50);

            fill(this.color.r, this.color.g, this.color.b);
            rect(0, 50, this.width, this.height - 50);
            textSize(26);
            fill(255);
            textAlign(CENTER, TOP);
            text("Accelerate: W\nTurn Left: A\nTurn Right: D\nExit/Enter Mothership: E\nToggle Debug: U\nChange Vessel Texture: V\nChange Mothership Texture: M\nOpen Distance UI: O\nOpen Inventory: I\nPlayer Information: P", 0, 50, this.width, this.height - 50);
            pop();
        }
    }
}