class Core {
    constructor() {
        this.options = {
            "debug": false,
            "chunks": 100,
            "chunkWidth": 1000,
            "chunkHeight": 1000
        }

        this.buildOptions = {
            "version": "0.1.5",
            "important": "Enemies, Hitboxes, killquests",
            "gameName": "Space Exploration Game"
        }

        this.chunkOptions = {
            "stars": true,
            "amount": 7
        }

        this.playerOptions = {
            "maxSpeed": 15,
            "turnSpeed": 0.035, 
            "shootingAllowed": true
        }

        this.vesselOptions = {
            "maxSpeed": 10,
            "turnSpeed": 0.1
        }

        this.planetNames = [""];

        this.planets = ["Planet1", "Planet2", "Planet3", "Planet4", "Planet5", "Planet6", "Planet7", "Planet8", "Planet9", "Planet10", "Planet11", "Planet12", "Planet13"];
        this.mothers = ["mothership", "mothership2", "mothership3"];
        this.vessels = ["vessel", "vessel2", "vessel3", "vessel4", "vessel5"];
        this.enemyVessels = ["vessel4"];

        this.backdrops = ["backdrop"];
    }

    getPlanetName() {
        return this.planetNames[Math.floor(Math.random()*this.planetNames.length)];
    }


}