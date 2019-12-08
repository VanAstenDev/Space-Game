class Guild {
    constructor(name) {
        this.name = name;
    }

    addQuestGenerator(func) {
        this.questGenerator = func;
    }

    getQuest() {
        this.questGenerator();
    }
}