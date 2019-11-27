class DialogueBox {
    constructor(leftSpeaker, rightSpeaker, leftTexture, rightTexture) {
        this.right = rightSpeaker;
        this.left = leftSpeaker;

        this.rightTexture = rightTexture;
        this.leftTexture = leftTexture;

        


        this.lines = []; //from voiceline object
        this.currentLine = 0;
        this.timer = 0;

        this.width = 1200;
        this.height = 230;

        this.type = "dialoguebox";

        this.die = false;
    }

    addLine(voiceline) {
        this.lines.push(voiceline);
    }

    loop() {
        this.update();
        this.display();


    }

    update() {
        this.timer++;
        if (!this.die) {
            if (this.timer >= this.lines[this.currentLine].delay) {
                this.currentLine++;
                this.timer = 0;

            }
        }
    }

    display() {
        // this.leftTexture.resize(200,200);
        // this.rightTexture.resize(200,200);
        //display
        if (this.currentLine > this.lines.length - 1) {
            this.die = true;
            return;
        }
        push();
        translate((-cam.x + width / 2) - this.width / 2, -cam.y + height - (this.height + 20));

        //main window
        fill(50);
        rect(0, 0, this.width, this.height);

        //character icon left
        fill(100);
        noStroke();
        if (this.lines[this.currentLine].position == "left") {
            fill(0,255,0);
            stroke(0,255,0);
            strokeWeight(3);
        }
        rect(0, 0, 200, 200);
        push();
        scale(-1, 1);
        image(this.leftTexture, -200, 0, 200, 200);
        pop();

        //character name left
        fill(255);
        noStroke();
        textSize(26);
        textAlign(CENTER);
        text(this.left, 0, 200, 200, 300);

        //character icon right
        fill(100);
        noStroke();
        if (this.lines[this.currentLine].position == "right") {
            fill(0,255,0);
            stroke(0,255,0);
            strokeWeight(3);
        }
        rect(this.width - 200, 0, 200, 200);
        image(this.rightTexture, this.width-200, 0, 200, 200);

        //character name right
        fill(255);
        noStroke();
        textSize(26);
        textAlign(CENTER);
        text(this.right, this.width - 200, 200, 200, 300);

        //text
        textSize(38);
        textAlign(CENTER);
        noStroke();
        textFont(bitFont2);
        text(this.lines[this.currentLine].text, 250, 50, this.width - 450, 250);

        pop();
    }

}