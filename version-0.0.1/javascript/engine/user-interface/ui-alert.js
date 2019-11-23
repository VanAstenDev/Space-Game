class UIAlert {
    constructor(title, message) {
        this.title = title;
        this.message = message;

        this.maxLifespan = 200;
        this.lifespan = this.maxLifespan;
        this.alpha = 255;
    }

    display() {
        this.alpha = map(this.lifespan, 0, this.maxLifespan, 200, 255);

        push();
        translate(-cam.x + 100, (-cam.y + height) - 300);
        
        fill(50, this.alpha);
        stroke(255, 0, 0, this.alpha);
        strokeWeight(3);
        rect(0, 0, 200, 200);
        fill(255, this.alpha);
        stroke(255, this.alpha);
        strokeWeight(1);
        textSize(24);
        textAlign(CENTER, TOP);
        fill(30, this.alpha);
        rect(0,0,200,40);
        fill(255, this.alpha);
        noStroke();
        text(this.title, 0, 0, 200, 200);
    
        fill(255, this.alpha);
        textSize(18);
        textAlign(CENTER, CENTER);
        text(this.message, 0, 0, 200, 200);
        pop();
    }
}