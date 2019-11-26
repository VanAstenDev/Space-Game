class Enemy {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.acc = createVector(0, 0);
        this.vel = createVector(0, 0);

        this.chunk = 0;

        this.angle = Math.random() * TWO_PI;
        this.turnSpeed = 0.05;
        this.maxSpeed = 15;
        this.friction = 0.95;
        this.w = 20;
        this.h = 40;
        this.mass = 50;

        this.pnOffset = Math.random();

        this.hitbox = 25;

        this.dmgCD = 5;
        this.timer = 0;

        this.shootingCooldown = 40;
        this.shootingTimer = this.shootingCooldown;

        this.alpha = 255;

        this.texture = textureHandler.getEnemy();

        this.health = 100;

    }

    takeDamage(dmg) {
        if (this.timer >= this.dmgCD) {
            this.timer = 0;
            this.health -= dmg;
            if (this.health <= 0) {
                this.dead = true;
            }
        }
    }

    loop() {
        this.update();
        this.display();
    }

    applyForce(vector) {
        let f = vector.div(this.mass);
        this.acc.add(f);
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

    update() {
        this.timer++;
        this.shootingTimer++;

        if (chunkLoader.getChunk(this.chunk)) {

            this.alpha = map(this.health, 0, 200, 150, 255);

            //angle to player
            this.angle = Math.atan2(vessel.pos.y - this.pos.y, vessel.pos.x - this.pos.x);

            //movement
            if (this.pos.dist(vessel.pos) > 500) {
                //move forward
                let dir = p5.Vector.fromAngle(this.angle);
                dir.mult(this.maxSpeed);
                this.applyForce(dir);
            }

            //shoot
            if (this.pos.dist(vessel.pos) < 600) {
                this.shoot();
            }

            //random movement
            // this.pnOffset += 0.01;
            // let r = noise(this.pnOffset);

            // if (r < 0.25) {
            //     this.angle -= this.turnSpeed;
            // } else if (r < 0.5) {
            //     this.angle += this.turnSpeed;
            // } else if (r < 0.75) {
            //     let dir = p5.Vector.fromAngle(this.angle);
            //     dir.mult(this.maxSpeed);
            //     this.applyForce(dir);
            // }

            //check if bullet hit
            for (let i = 0; i < bullets.length; i++) {
                if (bullets[i].pos.dist(this.pos) < this.hitbox) {
                    this.takeDamage(bullets[i].dmg);
                    let a = new UIAlert("Hit enemy!", "You hit an enemy.");
                    ui.addElement(a);
                }
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
    }

    display() {
        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.angle);
        imageMode(CENTER);
        // tint(255, this.alpha);
        image(this.texture, 0, 0, (this.w * (2)), (this.h * (1)));

        // noStroke();
        // fill(255, 150);

        // beginShape();

        // vertex(-this.dh/2, -this.dw/2);
        // vertex(-this.dh, 0);

        // vertex(-this.dh/2, this.dw/2);
        // vertex(this.dh/2, 0);

        // endShape(CLOSE);

        if (core.options['debug']) {
            fill(255, 0, 0, 50);
            ellipse(0, 0, this.hitbox * 2);
        }

        pop();

        radar.drawEnemy(radar.getVector(this.pos));

    }
}