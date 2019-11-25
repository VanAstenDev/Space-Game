class QuestHandler {
    constructor() {
        this.quests = [];
    }

    loop() {
        this.update();
        this.renderPos();
    }

    trigger(name) {
        //find quest
        for (let i = 0; i < this.quests.length; i++) {
            if (this.quests[i].name == name) {
                //found quest
                this.quests[i].trigger();
                return true;
            }

            console.error("Couldn't find quest '" + name + "'");
        }
    }

    addQuest(quest) {
        this.quests.push(quest);
    }

    update() {
        for (let i = 0; i < this.quests.length; i++) {
            if (core.options['debug']) {
                // console.log(this.quests[i]);
            }

            this.quests[i].update();
            player.quest = this.quests[i];

            if (this.quests[i].complete) {
                // this.quests.splice(i, 1);
                let nq = new PlaceHolderQuest("No Quest", "You currently don't have a quest.");
                player.quest = nq;
                this.quests[i].active = false;
            }

            if (this.quests[i].type == "location" && this.quests[i].active) {
                radar.drawPoint(radar.getVector(this.quests[i].location));
                push();
                translate(this.quests[i].location.x, this.quests[i].location.y);
                fill(255, 255, 0);
                ellipse(0, 0, 50);
                pop();
            }
        }
    }

    renderPos() {
        if (core.options['debug']) {
            for (let i = 0; i < this.quests.length; i++) {
                if (this.quests[i].triggerPos != undefined) {
                    for (let j = 0; j < this.quests[i].triggerPos.length; j++) {
                        push();
                        translate(this.quests[i].triggerPos[j].x, this.quests[i].triggerPos[j].y);
                        fill(100, 100, 0, 100);
                        ellipse(0, 0, this.quests[i].dupeDist * 2);
                        pop();
                    }
                }
            }
        }
    }
}