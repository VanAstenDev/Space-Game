class LocationQuest {
    constructor(name, objective, location) {
        this.name = name;
        this.objective = objective;
        this.complete = false;

        this.type = "location";

        this.location = location;
        this.radius = 200;

        this.active = true;

        this.dupeDist = 200;

        this.triggerPos = [];
    }

    update() {
        if (this.active) {
            if (vessel.pos.dist(this.location) < this.radius) {
                this.trigger();
            }

            //check if quest is complete
            if (this.objective.check()) {
                this.complete = true;
                this.active = false;
                //add reward to player
                //show debug ui
                // let a = new UIAlert("Quest Done", this.name);
                // ui.addElement(a);
           
                //banner
                let b = new Banner("Quest Complete!");
                ui.addElement(b);

                return true;
            }
        }
    }

    trigger() {
        if (this.active) {
            //check if far enough away from last triggerpos
            for (let i = 0; i < this.triggerPos.length; i++) {
                if (vessel.pos.dist(this.triggerPos[i]) < this.dupeDist) {
                    return false;
                }
            }
            

            this.objective.trigger();
            //create triggerpos
            this.triggerPos.push(createVector(vessel.pos.x, vessel.pos.y));
            //create alert
            let str = this.name+"\nCount: "+this.objective.current+"/"+this.objective.count;
            let a = new UIAlert("Quest Progress", str);
            ui.addElement(a);
        }
    }
}