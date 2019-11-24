class TextureHandler {
    constructor() {
        this.textures = [];
        this.planetTextures = [];
    }

    addTexture(texture, type) {
        if (type == "planet") {
            this.planetTextures.push(texture);
        }
        if (type == "other") {
            this.textures.push(texture);
        }
    }

    getPlanetTexture() {
        return this.planetTextures[Math.floor((Math.random()*this.planetTextures.length))];
    }

    getVessel() {
        return this.textures[0];
    }
}