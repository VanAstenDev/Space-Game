class Bullet {
    constructor(x, y, angle) {
        this.pos = createVector(x, y);
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);

        this.angle = angle;

        this.maxSpeed = 15;
        this.lifespan = 500;
    }

    update() {
        let dir = p5.Vector.fromAngle(this.angle);
        dir.mult(this.maxSpeed);
        this.applyForce(dir);

        this.vel.add(this.acc);
        this.vel.limit(this.maxSpeed);
        this.pos.add(this.vel);

    }

    applyForce(vector) {
        this.acc.add(vector);
    }

    display() {
        push();
        translate(this.pos.x, this.pos.y);
        fill(255);
        noStroke();
        ellipse(0, 0, 10);
        pop();
    }
}