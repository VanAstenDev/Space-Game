class Player {
    constructor(x, y) {
        this.isVessel = false;
        this.chunk = 0;

        this.name = "Player";

        this.guild = new Guild("No Guild");

        this.pos = createVector(x, y);
        this.acc = createVector(0, 0);
        this.vel = createVector(0, 0);

        this.angle = Math.random() * TWO_PI;

        this.turnSpeed = core.playerOptions['turnSpeed'];

        this.maxSpeed = core.playerOptions['maxSpeed'];
        this.autoPilotSpeed = 0;
        this.friction = 0.95;

        this.boostSpeed = core.playerOptions['boostSpeed'];
        this.boosting = false;

        this.ratio = 1.54;
        this.scale = 1;
        this.w = 65*this.scale;
        this.h = this.w * this.ratio;

        this.dw = this.w;
        this.dh = this.h;

        this.mass = 50;

        this.pickUpDistance = 100;

        this.texture = textureHandler.getMother();

        this.inventory = new Inventory();
        this.money = 25;

        this.fuel = 1000;
        this.maxFuel = 1000;
        this.fuelUsage = core.playerOptions['fuelUsage'];

        this.refuelSpeed = core.playerOptions['refuelSpeed'];

        this.inTutorial = true;

        this.quest = new PlaceHolderQuest("No quest", new Objective(1, "No quest available."), "No quest available.");
        this.questData = {

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

    update() {
        //camera zoom
        // this.dw = this.w * cam.zoom;
        // this.dh = this.h * cam.zoom;

        //movement
        if (!this.isVessel) {
            if (keyIsDown(87)) {
                if (this.fuel > 0) {
                    let dir = p5.Vector.fromAngle(this.angle);
                    dir.mult(this.boostSpeed);
                    this.applyForce(dir);
                    //take fuel
                    this.fuel -= this.fuelUsage;
                } else {
                    let u = new UIAlert("Out of fuel!", "Refuel at any gas station.");
                    ui.addElement(u);
                }
            }

            if (keyIsDown(65)) {
                this.angle -= this.turnSpeed;
                this.vel.mult(0.98);
            }
            if (keyIsDown(68)) {
                this.angle += this.turnSpeed;
                this.vel.mult(0.98);
            }
        } else {
            //autopilot
            let dir = createVector(vessel.pos.x - this.pos.x, vessel.pos.y - this.pos.y);
            dir.mult(5);
            dir.limit(this.autoPilotSpeed);
            this.applyForce(dir);
        }


        //general physics
        this.vel.add(this.acc);
        if (this.boosting) {
            this.vel.limit(this.boostSpeed);
        } else {
            this.vel.limit(this.maxSpeed);
        }
        this.pos.add(this.vel);
        this.acc.mult(0);
        this.vel.mult(this.friction);

        //constrain to borders
        // this.pos.x = constrain(this.pos.x, 0, width);
        // this.pos.y = constrain(this.pos.y, 0, height);
        this.pos.x = constrain(this.pos.x, chunkLoader.x, chunkLoader.totalWidth);
        this.pos.y = constrain(this.pos.y, chunkLoader.y, chunkLoader.totalHeight);

        //update itemstacks
        for (let i = 0; i < this.inventory.itemStacks.length; i++) {
            this.inventory.itemStacks[i].update();
        }
    }

    display() {
        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.angle);
        imageMode(CENTER);
        image(this.texture, 0, 0, (this.w * (2)), (this.h * (1)));

        // noStroke();
        // fill(255, 150);

        // beginShape();

        // vertex(-this.dh/2, -this.dw/2);
        // vertex(-this.dh, 0);

        // vertex(-this.dh/2, this.dw/2);
        // vertex(this.dh/2, 0);

        // endShape(CLOSE);

        if (this.isVessel) {
            noStroke();
            fill(0, 255, 0, 100);
            ellipse(0, 0, this.pickUpDistance * 2);
        }

        pop();
    }
}