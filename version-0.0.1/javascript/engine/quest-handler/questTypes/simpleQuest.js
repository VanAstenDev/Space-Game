class SimpleQuest {
    constructor(name, objective, reward) {
        this.name = name;
        this.objective = objective;
        this.complete = false;

        this.active = true;

        this.dupeDist = 200;

        this.triggerPos = createVector(0, 0);
    }

    update() {
        if (this.active) {
            //check if quest is complete
            if (this.objective.check()) {
                this.complete = true;
                //add reward to player
                //show debug ui
                let a = new UIAlert("Quest Done", this.name);
                ui.addElement(a);
                return true;
            }
        }

    }

    trigger() {
        if (this.active) {
            //check if far enough away from last triggerpos
            if (vessel.pos.dist(this.triggerPos) < this.dupeDist) {
                return false;
            }

            this.objective.trigger();
            //create triggerpos
            this.triggerPos = vessel.pos.copy();
            //create alert
            let str = this.name+"\nCount: "+this.objective.current+"/"+this.objective.count;
            let a = new UIAlert("Quest Progress", str);
            ui.addElement(a);
        }
    }
}