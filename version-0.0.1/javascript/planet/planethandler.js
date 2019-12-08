class PlanetHandler {
    constructor() {
        this.types = ["gas_planet", "none"]
    }

    getType() {
        return this.types[Math.floor(Math.random() * this.types.length)];
    }
}