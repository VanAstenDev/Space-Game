class PlanetHandler {
    constructor() {
        this.types = ["gas_planet", "guild_planet"]
    }

    getType() {
        return this.types[Math.floor(Math.random() * this.types.length)];
    }
}