class QuestHandler {
    constructor() {
        this.quests = [];
    }

    trigger(name) {
        //find quest
        for (let i = 0; i < this.quests.length; i++) {
            if (this.quests[i].name == name) {
                //found quest
                this.quests[i].trigger();
                return true;
            }

            console.error("Couldn't find quest '"+name+"'");
        }
    }

    addQuest(quest) {
        this.quests.push(quest);
    }

    update() {
        for (let i = 0; i < this.quests.length; i++) {
            if (core.options['debug']) {
                console.log(this.quests[i]);
            }

            this.quests[i].update();

            if (this.quests[i].complete) {
                // this.quests.splice(i, 1);
                this.quests[i].active = false;
            }
        }
    }
}