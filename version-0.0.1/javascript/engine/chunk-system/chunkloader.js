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
    }

    loop() {
        this.update();
        this.render();
    }

    generate() {
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.columns; c++) {
                let chunk = new Chunk(r, c, this.chunkWidth, this.chunkHeight);
                let randomPoint = chunk.getRandomPoint();
                planet = new Planet(randomPoint.x, randomPoint.y);
                chunk.planets.push(planet);
                chunk.generateBackground();
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

    update() {
        //get current chunk (vessel AND player)
        for (let i = 0; i < this.chunks.length; i++) {
            this.chunks[i].active = false;
        }

        for (let i = 0; i < this.chunks.length; i++) {
            if (player.pos.x > this.chunks[i].r * this.chunkWidth && player.pos.x < (this.chunks[i].r * this.chunkWidth) + this.chunkWidth) {
                if (player.pos.y > this.chunks[i].c * this.chunkHeight && player.pos.y < (this.chunks[i].c * this.chunkHeight) + this.chunkHeight) {
                    this.chunks[i].active = true;
                    player.chunk = i;
                    //set neighbors active
                    this.chunks[i].setNeighbors();
                }
            }

            if (vessel.pos.x > this.chunks[i].r * this.chunkWidth && vessel.pos.x < (this.chunks[i].r * this.chunkWidth) + this.chunkWidth) {
                if (vessel.pos.y > this.chunks[i].c * this.chunkHeight && vessel.pos.y < (this.chunks[i].c * this.chunkHeight) + this.chunkHeight) {
                    this.chunks[i].active = true;
                    vessel.chunk = i;
                    //set neighbors active
                    this.chunks[i].setNeighbors();
                }
            }
        }
    }

    render() {
        for (let i = 0; i < this.chunks.length; i++) {
            if (this.chunks[i].active) {
                this.chunks[i].loop();
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
    }
}