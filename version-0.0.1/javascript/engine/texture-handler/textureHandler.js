class TextureHandler {
    constructor() {
        this.textures = [];
        this.vesselTextures = [];
        this.motherTextures = [];
        this.planetTextures = [];
        this.enemyTextures = [];
        this.backdrops = [];

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

    getPlanetTexture() {
        let t = this.planetTextures[Math.floor((Math.random() * this.planetTextures.length))];
        if (t != undefined) {
            return t;
        }
    }

    getVessel() {
        this.vesselIndex++;
        if (this.vesselIndex > this.vesselTextures.length-1) {
            this.vesselIndex = 0;
        }
        return this.vesselTextures[this.vesselIndex];
    }

    getEnemy() {
        return this.enemyTextures[Math.floor(Math.random()*this.enemyTextures.length)];
    }

    getMother() {
        this.motherIndex++;
        if (this.motherIndex > this.motherTextures.length-1) {
            this.motherIndex = 0;
        }
        return this.motherTextures[this.motherIndex];
    }

    getBackdrop() {
        return this.backdrops[Math.floor(Math.random()*this.backdrops.length)];
    }
}