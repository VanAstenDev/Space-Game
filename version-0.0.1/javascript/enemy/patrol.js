class Patrol {
    constructor(x, y, bigShips, smallShips) {
        this.big = bigShips;
        this.small = smallShips;

        this.bigShips = [];
        this.smallShips = [];

        this.angle = Math.random() * TWO_PI;

        this.pos = createVector(x, y);
        this.r = 150;
    }

    getRandomPos() {
        let x = (Math.random()*this.pos.x)-(this.r/2);
        let y = (Math.random()*this.pos.y)-(this.r/2);
        return createVector(x, y);
    }

    generate() {
        for (let i = 0; i < this.big; i++) {
            let pos = this.getRandomPos();
            let e = new Enemy(pos.x, pos.y, "big");
            this.bigShips.push(e);
        }
        for (let i = 0; i < this.small; i++) {
            let pos = this.getRandomPos();
            let e = new Enemy(pos.x, pos.y, "small");
            this.addShip(e);
        }
    }

    addShip(enemy) {
        if (enemy.type == "big") {
            this.bigShips.push(enemy);
        } else {
            this.smallShips.push(enemy);
        }
    }

    update() {
        for (let i = 0; i < this.bigShips.length; i++) {
            this.bigShips[i].orderAngle(this.angle);
            this.bigShips[i].loop();
        }
        for (let i = 0; i < this.smallShips.length; i++) {
            this.smallShips[i].orderAngle(this.angle);
            this.smallShips[i].loop();
        }
    }
}