class Core {
    constructor() {
        this.options = {
            "debug": false,
            "chunks": 100,
            "chunkWidth": 1000,
            "chunkHeight": 1000,
            "tempDelay": 300,
            "defaultDialogueDelay": 20,
            "maxLoadedChunks": 100
        }

        this.gameOptions = {
            'fuelCost': 0.1
        }

        this.uiOptions = {
            "mainColor": {
                "r": 25,
                "g": 30,
                "b": 40
            },
            "accentColor": {
                "r": 80,
                "g": 125,
                "b": 190
            }
        }

        this.buildOptions = {
            "version": "0.3.4",
            "important": "Red Moon Guild, Game name (finally)",
            "gameName": "2112",
            "currencyName": "Federation Gold"
        }

        this.chunkOptions = {
            "stars": true,
            "amount": 7
        }

        this.playerOptions = {
            "maxSpeed": 7.5,
            "boostSpeed": 60,
            "turnSpeed": 0.035,
            "shootingAllowed": true,
            'fuelUsage': 0.01,
            'boostingFuelUsage': 0.1,
            'refuelSpeed': 1
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