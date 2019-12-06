class ChunkLoader {
    constructor(chunkWidth, chunkHeight, rows, cols) {
        this.rows = rows;
        this.columns = cols;

        this.chunkWidth = chunkWidth;
        this.chunkHeight = chunkHeight;

        this.x = 0;
        this.y = 0;

        this.totalWidth = this.rows * this.chunkWidth;
        this.totalHeight = this.columns * this.chunkHeight;

        this.chunks = [];

        this.timer = 60;
        this.cooldown = 30;
    }

    loop() {
        this.update();
        this.render();

    }

    getChunk(index) {
        return this.chunks[index].active;
    }

    generate() {
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.columns; c++) {
                let chunk = new Chunk(r, c, this.chunkWidth, this.chunkHeight);
                let hasPlanet = Math.round(random());
                if (hasPlanet) {
                    for (let i = 0; i < chunk.maxPlanets; i++) {
                        let randomPoint = chunk.getRandomPoint();
                        let planet = new Planet(randomPoint.x, randomPoint.y);
                        chunk.planets.push(planet);
                    }
                }
                // chunk.generateBackground(core.chunkOptions['amount']);
                this.chunks.push(chunk);
            }
        }
    }

    getActive() {
        let count = 0;
        let total = 0;

        for (let i = 0; i < this.chunks.length; i++) {
            if (this.chunks[i].active) {
                count++;
            }
            total++;
        }

        return count + "/" + total;
    }

    findNeighbors() {
        for (let i = 0; i < this.chunks.length; i++) {
            //find neighbors
            this.chunks[i].neighbors.push(i - 1);
            this.chunks[i].neighbors.push(i + 1);

            //top
            this.chunks[i].neighbors.push(i - this.rows);
            this.chunks[i].neighbors.push((i - this.rows) - 1);
            this.chunks[i].neighbors.push((i - this.rows) + 1);

            //bottom
            this.chunks[i].neighbors.push(i + this.rows);
            this.chunks[i].neighbors.push((i + this.rows) - 1);
            this.chunks[i].neighbors.push((i + this.rows) + 1);
        }
    }

    tempUpdate() {
        for (let i = 0; i < this.chunks.length; i++) {
            this.chunks[i].active = false;
        }
    }

    unloadAll() {
        for (let i = 0; i < this.chunks.length; i++) {
            this.chunks[i].active = false;
        }
    }

    assignChunks() {
        // this.findNeighbors();
        //get current chunk (vessel AND player)
        for (let i = 0; i < this.chunks.length; i++) {
            // if (!this.chunks[i].active) {
                if (player.pos.x > this.chunks[i].r * this.chunkWidth && player.pos.x < (this.chunks[i].r * this.chunkWidth) + this.chunkWidth) {
                    if (player.pos.y > this.chunks[i].c * this.chunkHeight && player.pos.y < (this.chunks[i].c * this.chunkHeight) + this.chunkHeight) {
                        this.chunks[i].active = true;
                        player.chunk = i;
                        //set neighbors active
                        this.chunks[i].setNeighbors(true);
                    }
                }

                for (let j = 0; j < enemies.length; j++) {
                    if (enemies[j].pos.x > this.chunks[i].r * this.chunkWidth && enemies[j].pos.x < (this.chunks[i].r * this.chunkWidth) + this.chunkWidth) {
                        if (enemies[j].pos.y > this.chunks[i].c * this.chunkHeight && enemies[j].pos.y < (this.chunks[i].c * this.chunkHeight) + this.chunkHeight) {
                            enemies[j].chunk = i;
                        }
                    }
                }

                if (vessel.pos.x > this.chunks[i].r * this.chunkWidth && vessel.pos.x < (this.chunks[i].r * this.chunkWidth) + this.chunkWidth) {
                    if (vessel.pos.y > this.chunks[i].c * this.chunkHeight && vessel.pos.y < (this.chunks[i].c * this.chunkHeight) + this.chunkHeight) {
                        this.chunks[i].active = true;
                        vessel.chunk = i;
                        //set neighbors active
                        this.chunks[i].setNeighbors(true);
                    }
                }

            // } 

            // if (player.chunk != i && vessel.chunk != i) {
            //     this.chunks[i].active = false;
            // } else {
            //     this.chunks[i].active = true;
            // }
        }

        
    }

    update() {
        this.timer++;
        if (this.timer >= this.cooldown) {
            this.assignChunks();
            this.timer = 0;
        }
    }

    getChunk(r, c) {
        for (let i = 0; i < this.chunks.length; i++) {
            if (this.chunks[i].r == r && this.chunks[i].c == c) {
                // return this.chunks[i];
                return i;
            }
        }
    }

    render() {
        for (let i = 0; i < this.chunks.length; i++) {
            if (this.chunks[i].active) {
                this.chunks[i].loop();
                this.chunks[i].display();

            }
        }

        if (core.options['debug'] == true) {
            //render outline
            push();
            translate(0, 0);
            noFill();
            stroke(255, 0, 0);
            strokeWeight(3);
            rect(0, 0, this.rows * this.chunkWidth, this.columns * this.chunkHeight);
            pop();
        }
        for (let i = 0; i < this.chunks.length; i++) {
            if (this.chunks[i].active) {


                for (let j = 0; j < this.chunks[i].planets.length; j++) {
                    this.chunks[i].planets[j].render();
                }
            }
        }
    }
}