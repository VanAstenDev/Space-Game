class Core {
    constructor() {
        this.options = {
            "debug": false,
            "chunks": 100,
            "chunkWidth": 1000,
            "chunkHeight": 1000,
            "tempDelay": 300
        }

        this.buildOptions = {
            "version": "0.2.1",
            "important": "Better radar, items, inventory (i)",
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

        this.planetNames = ["Unknown"];

        this.planets = ["Planet1", "Planet2", "Planet3", "Planet4", "Planet5", "Planet6", "Planet7", "Planet8", "Planet9", "Planet10", "Planet11", "Planet12", "Planet13"];
        this.mothers = ["mothership", "mothership2", "mothership3"];
        this.vessels = ["vessel", "vessel2", "vessel3", "vessel4", "vessel5", "vessel6", "vessel7", "vessel8", "vessel9", "vessel10"];
        this.enemyVessels = ["vessel4"];
        this.alienCharacters = ["alien", "alien2", "alien3", "alien4", "alien5", "alien6", "alien7", "alien8", "alien10"];
        this.player = "player";

        this.backdrops = ["backdrop4", "backdrop5", "backdrop6", "backdrop7", "backdrop8", "backdrop9", "backdrop10"];
    }

    getPlanetName() {
        return this.planetNames[Math.floor(Math.random()*this.planetNames.length)];
    }

    getAngleBetweenVectors(vector1, vector2) {
        return Math.atan2(vector1.y - vector2.y, vector1.x - vector2.x);
    }
}