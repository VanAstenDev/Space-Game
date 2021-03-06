class TextureHandler {
    constructor() {
        this.textures = [];
        this.vesselTextures = [];
        this.motherTextures = [];
        this.planetTextures = [];
        this.enemyTextures = [];
        this.backdrops = [];
        this.characters = [];
        this.team = [];

        this.motherIndex = -1;
        this.vesselIndex = -1;
    }

    addTexture(texture, type) {
        if (type == "planet") {
            this.planetTextures.push(texture);
        }
        if (type == "other") {
            this.textures.push(texture);
        }
        if (type == "mother") {
            this.motherTextures.push(texture);
        }
        if (type == "vessel") {
            this.vesselTextures.push(texture);
        }
        if (type == "enemy") {
            this.enemyTextures.push(texture);
        }
        if (type == "backdrop") {
            this.backdrops.push(texture);
        }
        if (type == "character") {
            this.characters.push(texture);
        }
        if (type == "player") {
            this.player = texture;
        }
        if (type == "team") {
            this.team.push(texture);
        }
    }

    getPlayer() {
        return this.player;
    }

    getPlanetTextures() {
        let ptexts = core.planets;
        for (let i = 0; i < ptexts.length; i++) {
            let ptext = loadImage("javascript/assets/textures/" + ptexts[i] + ".png");
            this.addTexture(ptext, "planet");
        }
    }

    getBackdropTextures() {
        let ptexts = core.backdrops;
        for (let i = 0; i < ptexts.length; i++) {
            let ptext = loadImage("javascript/assets/backdrops/" + ptexts[i] + ".png");
            this.addTexture(ptext, "backdrop");
        }
    }

    getAlien(n) {
        if (n != undefined) {
            return this.characters[n];
        } else {
            return this.characters[Math.floor(Math.random() * this.characters.length)];
        }
    }

    getPlanetTexture(n) {
        if (n != undefined) {
            return this.planetTextures[n];
        } else {
            return this.planetTextures[Math.floor((Math.random() * this.planetTextures.length))];
        }
    }

    getVessel() {
        this.vesselIndex++;
        if (this.vesselIndex > this.vesselTextures.length - 1) {
            this.vesselIndex = 0;
        }
        return this.vesselTextures[this.vesselIndex];
    }

    getEnemy() {
        return this.enemyTextures[Math.floor(Math.random() * this.enemyTextures.length)];
    }

    getMother() {
        this.motherIndex++;
        if (this.motherIndex > this.motherTextures.length - 1) {
            this.motherIndex = 0;
        }
        return this.motherTextures[this.motherIndex];
    }

    getBackdrop() {
        // return this.backdrops[Math.floor(Math.random()*this.backdrops.length)];
        let normal = [this.backdrops[3], this.backdrops[4], this.backdrops[6]];
        let nebula = [this.backdrops[0], this.backdrops[1], this.backdrops[2], this.backdrops[5]];

        let r = Math.random();
        if (r < 0.1) {
            return nebula[Math.floor(Math.random() * nebula.length)];
        } else {
            return normal[Math.floor(Math.random() * normal.length)];
        }
    }
}