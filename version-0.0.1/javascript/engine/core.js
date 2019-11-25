class Core {
    constructor() {
        this.options = {
            "debug": false,
            "chunks": 25,
            "chunkWidth": 1000,
            "chunkHeight": 1000
        }

        this.buildOptions = {
            "version": "0.1.3",
            "important": "TextureHandler Improvements",
            "gameName": "Space Exploration Game"
        }

        this.chunkOptions = {
            "stars": true,
            "amount": 7
        }

        this.playerOptions = {
            "maxSpeed": 15,
            "turnSpeed": 0.05, 
            "shootingAllowed": false
        }

        this.vesselOptions = {
            "maxSpeed": 10,
            "turnSpeed": 0.1
        }

        this.planetNames = [""];

        this.planets = ["Planet1", "Planet2", "Planet3", "Planet4", "Planet5", "Planet6", "Planet7", "Planet8", "Planet9", "Planet10", "Planet11", "Planet12"];
        this.mothers = ["mothership", "mothership2", "mothership3"];
        this.vessels = ["vessel", "vessel2", "vessel3", "vessel4", "vessel5"];
    }

    getPlanetName() {
        return this.planetNames[Math.floor(Math.random()*this.planetNames.length)];
    }


}