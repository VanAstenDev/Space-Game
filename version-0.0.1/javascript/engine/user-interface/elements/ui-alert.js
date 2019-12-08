class UIAlert {
    constructor(title, message) {
        this.title = title;
        this.message = message;

        this.type = "uialert";

        this.color = core.uiOptions['mainColor'];
        this.accentColor = core.uiOptions['accentColor'];

        this.maxLifespan = 50;
        this.lifespan = this.maxLifespan;
        this.alpha = 255;
    }

    display() {
        this.alpha = map(this.lifespan, 0, this.maxLifespan, 200, 255);

        push();
        noStroke();
        translate(-cam.x + 100, (-cam.y + height) - 300);
        
        fill(this.accentColor.r, this.accentColor.g, this.accentColor.b, this.alpha);
        rect(0, 0, 200, 200);
        fill(255, this.alpha);
        textSize(24);
        textAlign(CENTER, CENTER);
        fill(this.color.r, this.color.g, this.color.b, this.alpha);
        rect(0,0,200,40);
        fill(255, this.alpha);
        text(this.title, 0, 0, 200, 40);
    
        fill(255, this.alpha);
        textSize(18);
        textAlign(CENTER, CENTER);
        text(this.message, 0, 0, 200, 200);
        pop();
    }
}