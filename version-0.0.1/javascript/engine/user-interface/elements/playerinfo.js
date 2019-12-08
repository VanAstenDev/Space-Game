class PlayerInfo {
    constructor() {
        this.type = "playerinformation";

        this.active = false;

        this.width = 500;
        this.height = 500;

        this.color = core.uiOptions['mainColor'];
        this.accentColor = core.uiOptions['accentColor'];
    }

    display() {
        if (this.active) {
            push();
            translate(-cam.x + (width/2) - this.width/2, -cam.y + (height/2) - this.height/2);

            //title
            fill(this.accentColor.r, this.accentColor.g, this.accentColor.b);
            rect(0, 0, this.width, 50);
            fill(255);
            textSize(34);
            textAlign(CENTER, CENTER);
            text("Player Information", 0, 0, this.width, 50);

            //main body
            fill(this.color.r, this.color.g, this.color.b);
            rect(0, 50, this.width, this.height - 50);

            fill(255);
            textSize(26);
            textAlign(CENTER, TOP);
            text("Guild: "+player.guild.name+"\nQuest: "+player.quest.name+"\nObjective: "+player.quest.objective.task, 0, 50, this.width, this.height - 50);

            pop();
        }
    }
}