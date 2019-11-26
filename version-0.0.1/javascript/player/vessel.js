class Vessel {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.acc = createVector(0, 0);
        this.vel = createVector(0, 0);

        this.chunk = 0;

        this.angle = 0;
        this.turnSpeed = core.vesselOptions["turnSpeed"];

        this.maxSpeed = core.vesselOptions["maxSpeed"];
        this.friction = 0.95;

        this.shootingCooldown = 5;
        this.shootingTimer = this.shootingCooldown;

        this.w = 20;
        this.h = 40;

        this.hitbox = 25;

        this.health = 500;

        this.dw = this.w;
        this.dh = this.h;

        this.mass = 5;

        this.infoMenu = false;

        this.maxDistanceToMother = chunkLoader.totalWidth / 10;
        this.velMult = 1;

        this.texture = textureHandler.getVessel();
    }

    loop() {
        this.update();
        this.display();
    }

    applyForce(vector) {
        let f = vector.div(this.mass);
        this.acc.add(f);
    }

    takeDamage(dmg) {
        this.health -= dmg;
        if (this.health <= 0) {
            this.dead = true;
        }
    }

    update() {
        this.shootingTimer++;
        
        //camera zoom
        // this.dw = this.w * cam.zoom;
        // this.dh = this.h * cam.zoom;

        //check if bullet hit
        for (let i = 0; i < bullets.length; i++) {
            if (bullets[i].pos.dist(this.pos) < this.hitbox) {
                this.takeDamage(bullets[i].dmg);
            }
        }

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
        
        let d = Math.floor(vessel.pos.dist(player.pos));
        // if (d > 350) {
        //     this.velMult = 0.85;
        // }
        // if (d > 650) {
        //     this.velMult = 0.65;
        // }
        // if (d > 1000) {
        //     this.velMult = 0.35;
        // }
        this.velMult = map(d, 0, this.maxDistanceToMother, 1, 0.25);


        //general physics
        this.vel.add(this.acc);
        this.vel.limit(this.maxSpeed);
        this.vel.mult(this.velMult);
        this.pos.add(this.vel);
        this.acc.mult(0);
        this.vel.mult(this.friction);

        //constrain to borders
        // this.pos.x = constrain(this.pos.x, 0, width);
        // this.pos.y = constrain(this.pos.y, 0, height);
        this.pos.x = constrain(this.pos.x, chunkLoader.x, chunkLoader.totalWidth);
        this.pos.y = constrain(this.pos.y, chunkLoader.y, chunkLoader.totalHeight);
    }

    shoot() {
        if (this.shootingTimer > this.shootingCooldown) {
            let curPos = createVector(this.pos.x, this.pos.y);
            let dir = p5.Vector.fromAngle(this.angle);
            dir.mult(30);
            curPos.add(dir);
            let b = new Bullet(curPos.x, curPos.y, this.angle);
            bullets.push(b);
            this.shootingTimer = 0;
        }
    }

    display() {
        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.angle);
        imageMode(CENTER);
        image(this.texture, 0, 0, (this.w * (2)), (this.h * (1)));
        // image(this.texture, 0, 0);
        // noStroke();
        // fill(255, 150);

        // beginShape();

        // vertex(-this.dh/2, -this.dw/2);
        // vertex(-this.dh/2, this.dw/2);
        // vertex(this.dh/2, 0);

        // endShape(CLOSE);

        if (core.options['debug']) {
            fill(255, 0, 0, 50);
            ellipse(0, 0, this.hitbox*2);
        }

        pop();
    }
}