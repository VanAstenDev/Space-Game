class Core {
    constructor() {
        this.options = {
            "debug": false,
            "chunks": 25,
            "chunkWidth": 1000,
            "chunkHeight": 1000
        }

        this.chunkOptions = {
            "stars": true,
            "amount": 7
        }

        this.playerOptions = {
            "maxSpeed": 10,
            "shootingAllowed": false
        }

        this.planets = ["Planet1", "Planet2", "Planet3", "Planet4", "Planet5", "Planet6", "Planet7", "Planet8", "Planet9", "Planet10", "Planet11"];
        this.mothers = ["mothership", "mothership2", "mothership3"];
        this.vessels = ["vessel", "vessel2"];
    }


}