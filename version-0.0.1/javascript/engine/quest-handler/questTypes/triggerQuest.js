class TriggerQuest {
    constructor(name, objective) {
        this.name = name;
        this.objective = objective;
        this.active = true;
    }

    update() {
        if (this.active) {
            //check if quest is complete
            if (this.objective.check()) {
                this.complete = true;
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
            this.objective.trigger();
            //create alert
            let str = this.name+"\nCount: "+this.objective.current+"/"+this.objective.count;
            let a = new UIAlert("Quest Progress", str);
            ui.addElement(a);
        }
    }
}