class Vessel {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.acc = createVector(0, 0);
        this.vel = createVector(0, 0);

        this.chunk = 0;

        this.angle = 0;
        this.turnSpeed = 0.05;

        this.maxSpeed = 4;
        this.friction = 0.95;

        this.w = 10;
        this.h = 20;

        this.dw = this.w;
        this.dh = this.h;

        this.mass = 5;
    }

    loop() {
        this.update();
        this.display();
    }

    applyForce(vector) {
        let f = vector.div(this.mass);
        this.acc.add(f);
    }

    update() {

        //camera zoom
        // this.dw = this.w * cam.zoom;
        // this.dh = this.h * cam.zoom;

        //movement
        if (player.isVessel) {
            if (keyIsDown(87)) {
                let dir = p5.Vector.fromAngle(this.angle);
                dir.mult(this.maxSpeed);
                this.applyForce(dir);
            }
    
            if (keyIsDown(65)) {
                this.angle -= this.turnSpeed;
            }
            if (keyIsDown(68)) {
                this.angle += this.turnSpeed;
            }
        } else {
            this.pos = player.pos.copy();
            this.angle = player.angle;
        }
        

        //general physics
        this.vel.add(this.acc);
        this.vel.limit(this.maxSpeed);
        this.pos.add(this.vel);
        this.acc.mult(0);
        this.vel.mult(this.friction);

        //constrain to borders
        // this.pos.x = constrain(this.pos.x, 0, width);
        // this.pos.y = constrain(this.pos.y, 0, height);
        this.pos.x = constrain(this.pos.x, chunkLoader.x, chunkLoader.totalWidth);
        this.pos.y = constrain(this.pos.y, chunkLoader.y, chunkLoader.totalHeight);
    }

    display() {
        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.angle);

        noStroke();
        fill(255, 150);

        beginShape();

        vertex(-this.dh/2, -this.dw/2);
        vertex(-this.dh/2, this.dw/2);
        vertex(this.dh/2, 0);

        endShape(CLOSE);

        pop();
    }
}